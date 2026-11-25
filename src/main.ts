import {
  AbstractInputSuggest,
  App,
  FuzzyMatch,
  FuzzySuggestModal,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  SettingDefinitionItem,
  TAbstractFile,
  TFile,
  TFolder,
  moment,
  normalizePath,
} from "obsidian";
import { parseFolderNames, render, toFileName } from "./template";
import { t } from "./i18n";

interface MeetingSettings {
  folderName: string;
  fileNameTemplate: string;
  templatePath: string;
  openInNewTab: boolean;
  recent: string[];
}

const DEFAULT_SETTINGS: MeetingSettings = {
  folderName: "meetings",
  fileNameTemplate: "{{date:YYYY-MM-DD}} - {{title}}",
  templatePath: "",
  openInNewTab: false,
  recent: [],
};

const MAX_RECENT = 15;

interface TemplaterPlugin {
  templater?: { overwrite_file_commands?: (file: TFile) => Promise<void> };
}

// obsidian re-exports moment as a namespace type; call it through a typed alias.
const now = (): { format(fmt: string): string } =>
  (moment as unknown as () => { format(fmt: string): string })();

export default class MeetingNotesPlugin extends Plugin {
  settings!: MeetingSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "new-meeting-note",
      name: t("cmdNew"),
      callback: () => this.startFlow(),
    });

    this.addRibbonIcon("calendar-plus", t("cmdNew"), () => this.startFlow());

    // Right-click a folder: create the meeting note in it (or in its meetings subfolder).
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof TFolder)) return;
        const target = this.isMeetingFolder(file) ? file : this.meetingChildOf(file);
        menu.addItem((item) =>
          item
            .setTitle(t("menuHere"))
            .setIcon("calendar-plus")
            .onClick(async () => {
              const folder = target ?? (await this.ensureMeetingFolder(file));
              if (folder) this.askTitle(folder);
            })
        );
      })
    );

    this.addSettingTab(new MeetingSettingTab(this.app, this));
  }

  async loadSettings() {
    const saved = (await this.loadData()) as Partial<MeetingSettings> | null;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, saved);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // ---------- folders ----------

  folderNames(): string[] {
    const names = parseFolderNames(this.settings.folderName);
    return names.length ? names : [DEFAULT_SETTINGS.folderName];
  }

  isMeetingFolder(f: TFolder): boolean {
    return this.folderNames().includes(f.name.toLowerCase());
  }

  meetingChildOf(parent: TFolder): TFolder | null {
    for (const c of parent.children) {
      if (c instanceof TFolder && this.isMeetingFolder(c)) return c;
    }
    return null;
  }

  meetingFolders(): TFolder[] {
    const recentIdx = new Map(this.settings.recent.map((p, i) => [p, i]));
    return this.app.vault
      .getAllLoadedFiles()
      .filter((f): f is TFolder => f instanceof TFolder && this.isMeetingFolder(f))
      .sort((a, b) => {
        const ra = recentIdx.get(a.path) ?? Infinity;
        const rb = recentIdx.get(b.path) ?? Infinity;
        if (ra !== rb) return ra - rb;
        return a.path.localeCompare(b.path);
      });
  }

  async ensureMeetingFolder(parent: TFolder): Promise<TFolder | null> {
    const existing = this.meetingChildOf(parent);
    if (existing) return existing;
    // Use the first configured name, keeping the user's capitalisation.
    const name = this.settings.folderName.split(",")[0].trim() || DEFAULT_SETTINGS.folderName;
    const path = normalizePath(parent.isRoot() ? name : `${parent.path}/${name}`);
    try {
      await this.app.vault.createFolder(path);
    } catch (e) {
      new Notice(t("noticeFolderFail", { path }));
      console.error(e);
      return null;
    }
    const created = this.app.vault.getAbstractFileByPath(path);
    return created instanceof TFolder ? created : null;
  }

  // ---------- flow ----------

  startFlow() {
    new MeetingFolderModal(this.app, this, (choice) => {
      if (choice === NEW_FOLDER) {
        new ParentFolderModal(this.app, (parent) => {
          void this.ensureMeetingFolder(parent).then((folder) => {
            if (folder) this.askTitle(folder);
          });
        }).open();
      } else {
        this.askTitle(choice);
      }
    }).open();
  }

  askTitle(folder: TFolder) {
    new TitleModal(this.app, this, folder, (title) => void this.createNote(folder, title)).open();
  }

  contextFor(folder: TFolder, title: string) {
    return {
      now: now(),
      vars: {
        title,
        folder: folder.path,
        parent: folder.parent && !folder.parent.isRoot() ? folder.parent.name : "",
      },
    };
  }

  previewFileName(folder: TFolder, title: string): string {
    return toFileName(render(this.settings.fileNameTemplate, this.contextFor(folder, title)));
  }

  async createNote(folder: TFolder, title: string) {
    const ctx = this.contextFor(folder, title);
    // Fall back to the date if the pattern renders to nothing usable.
    const base = toFileName(render(this.settings.fileNameTemplate, ctx)) || ctx.now.format("YYYY-MM-DD");
    const path = this.uniquePath(folder, base);

    let content = "";
    const tplFile = this.resolveTemplate();
    if (this.settings.templatePath.trim() && !tplFile) {
      new Notice(t("noticeTplMissing", { path: this.settings.templatePath }));
    }
    if (tplFile) content = render(await this.app.vault.read(tplFile), ctx);

    let file: TFile;
    try {
      file = await this.app.vault.create(path, content);
    } catch (e) {
      new Notice(t("noticeNoteFail", { path }));
      console.error(e);
      return;
    }

    await this.rememberFolder(folder);
    await this.app.workspace.getLeaf(this.settings.openInNewTab ? "tab" : false).openFile(file);

    if (content.includes("<%")) await this.runTemplater(file);
  }

  uniquePath(folder: TFolder, base: string): string {
    const dir = folder.isRoot() ? "" : `${folder.path}/`;
    let path = normalizePath(`${dir}${base}.md`);
    for (let i = 2; this.app.vault.getAbstractFileByPath(path); i++) {
      path = normalizePath(`${dir}${base} (${i}).md`);
    }
    return path;
  }

  resolveTemplate(): TFile | null {
    const raw = this.settings.templatePath.trim();
    if (!raw) return null;
    const p = normalizePath(raw);
    const direct: TAbstractFile | null =
      this.app.vault.getAbstractFileByPath(p) ?? this.app.vault.getAbstractFileByPath(`${p}.md`);
    if (direct instanceof TFile) return direct;
    return this.app.metadataCache.getFirstLinkpathDest(p, "");
  }

  async runTemplater(file: TFile) {
    // If the template uses Templater syntax, let Templater process the new file.
    // Templater is reached through Obsidian's (untyped) plugin registry.
    const registry = (this.app as unknown as { plugins?: { plugins?: Record<string, unknown> } }).plugins;
    const templater = (registry?.plugins?.["templater-obsidian"] as TemplaterPlugin | undefined)?.templater;
    if (!templater?.overwrite_file_commands) return;
    try {
      await templater.overwrite_file_commands(file);
    } catch (e) {
      console.error("Meeting Notes: Templater processing failed", e);
    }
  }

  async rememberFolder(folder: TFolder) {
    this.settings.recent = [folder.path, ...this.settings.recent.filter((p) => p !== folder.path)].slice(
      0,
      MAX_RECENT
    );
    await this.saveSettings();
  }
}

// ---------- modals ----------

const NEW_FOLDER = Symbol("new-folder");
type FolderChoice = TFolder | typeof NEW_FOLDER;

class MeetingFolderModal extends FuzzySuggestModal<FolderChoice> {
  constructor(app: App, private plugin: MeetingNotesPlugin, private onPick: (c: FolderChoice) => void) {
    super(app);
    this.setPlaceholder(t("pickPlaceholder"));
    this.setInstructions([
      { command: "↑↓", purpose: t("instrSelect") },
      { command: "↵", purpose: t("instrNext") },
      { command: "esc", purpose: t("instrCancel") },
    ]);
  }

  getItems(): FolderChoice[] {
    return this.plugin.meetingFolders();
  }

  getItemText(item: FolderChoice): string {
    return item === NEW_FOLDER ? t("newFolderSearch") : item.path;
  }

  getSuggestions(query: string): FuzzyMatch<FolderChoice>[] {
    const res = super.getSuggestions(query);
    // Always offer creating a new meeting folder at the end.
    res.push({ item: NEW_FOLDER, match: { score: -Infinity, matches: [] } });
    return res;
  }

  renderSuggestion(match: FuzzyMatch<FolderChoice>, el: HTMLElement) {
    const item = match.item;
    if (item === NEW_FOLDER) {
      el.createDiv({ text: t("newFolderItem"), cls: "mne-suggestion-new" });
      return;
    }
    const parent = item.parent && !item.parent.isRoot() ? item.parent.path : "/";
    el.createDiv({ text: parent });
    el.createDiv({ text: item.path, cls: "mne-suggestion-path" });
  }

  onChooseItem(item: FolderChoice) {
    this.onPick(item);
  }
}

class ParentFolderModal extends FuzzySuggestModal<TFolder> {
  constructor(app: App, private onPick: (f: TFolder) => void) {
    super(app);
    this.setPlaceholder(t("parentPlaceholder"));
  }

  getItems(): TFolder[] {
    return this.app.vault
      .getAllLoadedFiles()
      .filter((f): f is TFolder => f instanceof TFolder)
      .sort((a, b) => a.path.localeCompare(b.path));
  }

  getItemText(f: TFolder): string {
    return f.isRoot() ? "/" : f.path;
  }

  onChooseItem(f: TFolder) {
    this.onPick(f);
  }
}

class TitleModal extends Modal {
  constructor(
    app: App,
    private plugin: MeetingNotesPlugin,
    private folder: TFolder,
    private onSubmit: (title: string) => void
  ) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    this.titleEl.setText(t("titleHeading"));
    contentEl.createDiv({ text: this.folder.path, cls: "mne-suggestion-path" });

    const input = contentEl.createEl("input", {
      type: "text",
      cls: "mne-title-input",
      attr: { placeholder: t("titlePlaceholder") },
    });
    const preview = contentEl.createDiv({ cls: "mne-preview" });
    const update = () => (preview.textContent = `→ ${this.plugin.previewFileName(this.folder, input.value)}.md`);
    update();

    const submit = () => {
      this.close();
      this.onSubmit(input.value.trim());
    };
    input.addEventListener("input", update);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.isComposing) {
        e.preventDefault();
        submit();
      }
    });

    new Setting(contentEl).addButton((b) => b.setButtonText(t("createButton")).setCta().onClick(submit));
    window.setTimeout(() => input.focus(), 0);
  }

  onClose() {
    this.contentEl.empty();
  }
}

// Suggests markdown files while typing a path into a settings field.
class MarkdownFileSuggest extends AbstractInputSuggest<TFile> {
  constructor(app: App, inputEl: HTMLInputElement, private onPick: (path: string) => void) {
    super(app, inputEl);
  }

  getSuggestions(query: string): TFile[] {
    const q = query.toLowerCase().trim();
    return this.app.vault
      .getMarkdownFiles()
      .filter((f) => f.path.toLowerCase().includes(q))
      .sort((a, b) => a.path.localeCompare(b.path))
      .slice(0, 100);
  }

  renderSuggestion(file: TFile, el: HTMLElement) {
    el.setText(file.path);
  }

  selectSuggestion(file: TFile) {
    this.setValue(file.path);
    this.onPick(file.path);
    this.close();
  }
}

// ---------- settings ----------

type SettingKey = "folderName" | "fileNameTemplate" | "templatePath" | "openInNewTab";

class MeetingSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: MeetingNotesPlugin) {
    super(app, plugin);
  }

  // ----- Obsidian 1.13+: declarative settings (also indexed by the settings search) -----

  getSettingDefinitions(): SettingDefinitionItem<SettingKey>[] {
    return [
      {
        name: t("setFolderName"),
        desc: t("setFolderNameDesc"),
        control: { type: "text", key: "folderName", placeholder: DEFAULT_SETTINGS.folderName },
      },
      {
        name: t("setFileName"),
        desc: this.placeholderHelp(),
        // Rendered imperatively so the example updates while typing.
        render: (setting) => this.fileNameControl(setting),
      },
      {
        name: t("setTemplate"),
        desc: t("setTemplateDesc"),
        control: {
          type: "file",
          key: "templatePath",
          placeholder: "templates/meeting.md",
          filter: (f) => f.extension === "md",
        },
      },
      {
        name: t("setNewTab"),
        control: { type: "toggle", key: "openInNewTab" },
      },
    ];
  }

  getControlValue(key: string): unknown {
    return this.plugin.settings[key as SettingKey];
  }

  async setControlValue(key: string, value: unknown) {
    const s = this.plugin.settings;
    const str = typeof value === "string" ? value.trim() : "";
    if (key === "openInNewTab") s.openInNewTab = value === true;
    else if (key === "folderName") s.folderName = str || DEFAULT_SETTINGS.folderName;
    else if (key === "fileNameTemplate")
      s.fileNameTemplate = str || DEFAULT_SETTINGS.fileNameTemplate;
    else if (key === "templatePath") s.templatePath = str;
    await this.plugin.saveSettings();
  }

  // ----- Obsidian < 1.13: imperative fallback -----

  display() {
    const { containerEl } = this;
    containerEl.empty();
    const s = this.plugin.settings;

    new Setting(containerEl)
      .setName(t("setFolderName"))
      .setDesc(t("setFolderNameDesc"))
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.folderName)
          .setValue(s.folderName)
          .onChange((v) => this.setControlValue("folderName", v))
      );

    this.fileNameControl(new Setting(containerEl).setName(t("setFileName")).setDesc(this.placeholderHelp()));

    new Setting(containerEl)
      .setName(t("setTemplate"))
      .setDesc(t("setTemplateDesc"))
      .addSearch((search) => {
        search
          .setPlaceholder("templates/meeting.md")
          .setValue(s.templatePath)
          .onChange((v) => this.setControlValue("templatePath", v));
        new MarkdownFileSuggest(this.app, search.inputEl, (path) => void this.setControlValue("templatePath", path));
      });

    new Setting(containerEl)
      .setName(t("setNewTab"))
      .addToggle((toggle) =>
        toggle.setValue(s.openInNewTab).onChange((v) => this.setControlValue("openInNewTab", v))
      );
  }

  // ----- shared -----

  private fileNameControl(setting: Setting) {
    const example = setting.descEl.createDiv({ cls: "mne-preview" });
    const update = () => (example.textContent = `${t("example")} ${this.exampleFileName()}.md`);
    update();
    setting.addText((text) =>
      text
        .setPlaceholder(DEFAULT_SETTINGS.fileNameTemplate)
        .setValue(this.plugin.settings.fileNameTemplate)
        .onChange(async (v) => {
          await this.setControlValue("fileNameTemplate", v);
          update();
        })
    );
  }

  private placeholderHelp(): string {
    return `${t("placeholders")} {{title}}, {{date}}, {{date:DD.MM.YYYY}}, {{time}}, {{time:HH-mm}}, {{parent}}, {{folder}}.`;
  }

  private exampleFileName(): string {
    // Preview with a real meeting folder from the vault, if there is one.
    const sample = this.plugin.meetingFolders()[0];
    const ctx = sample
      ? this.plugin.contextFor(sample, t("exampleTitle"))
      : { now: now(), vars: { title: t("exampleTitle"), folder: "", parent: "" } };
    return toFileName(render(this.plugin.settings.fileNameTemplate, ctx));
  }
}
