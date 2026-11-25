// Minimal handlebars-style placeholder rendering.
//
//   {{title}}              meeting title as typed
//   {{date}}               today, YYYY-MM-DD
//   {{date:DD.MM.YYYY}}    today in any moment.js format
//   {{time}} / {{time:HH-mm}}
//   {{folder}}             path of the meeting folder
//   {{parent}}             name of the folder that contains the meeting folder (e.g. the project)
//
// Unknown placeholders are left untouched, so Templater / other syntax survives.

export interface Formatter {
  format(fmt: string): string;
}

export interface RenderContext {
  now: Formatter;
  vars: Record<string, string>;
}

const PLACEHOLDER = /\{\{\s*([A-Za-z_]+)\s*(?::([^}]*))?\}\}/g;

export function render(tpl: string, ctx: RenderContext): string {
  return tpl.replace(PLACEHOLDER, (whole, rawKey: string, rawFmt?: string) => {
    const key = rawKey.toLowerCase();
    const fmt = rawFmt?.trim();
    if (key === "date") return ctx.now.format(fmt || "YYYY-MM-DD");
    if (key === "time") return ctx.now.format(fmt || "HH:mm");
    if (Object.prototype.hasOwnProperty.call(ctx.vars, key)) return ctx.vars[key];
    return whole;
  });
}

// Characters that are invalid in file names or break Obsidian links.
const ILLEGAL = /[\\/:*?"<>|#^[\]]/g;

export function toFileName(raw: string): string {
  return raw
    .replace(ILLEGAL, " ")
    .replace(/\s+/g, " ")
    .trim()
    // "2026-11-25 - " when no title was given -> "2026-11-25"
    .replace(/[\s\-–—_.]+$/, "")
    .replace(/^[\s\-–—_.]+/, "");
}

export function parseFolderNames(setting: string): string[] {
  return setting
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}
