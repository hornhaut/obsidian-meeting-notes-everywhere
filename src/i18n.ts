import * as obsidian from "obsidian";

const en = {
  cmdNew: "New meeting note",
  menuHere: "New meeting note here",
  pickPlaceholder: "Which meeting folder?",
  instrSelect: "select",
  instrNext: "continue",
  instrCancel: "cancel",
  newFolderItem: "+ Create new meeting folder …",
  newFolderSearch: "Create new meeting folder",
  parentPlaceholder: "Where should the meeting folder be created?",
  titleHeading: "New meeting note",
  titlePlaceholder: "Title (optional), e.g. Kick-off",
  createButton: "Create",
  noticeFolderFail: "Could not create folder: {path}",
  noticeTplMissing: "Template not found: {path} – creating an empty note.",
  noticeNoteFail: "Could not create meeting note: {path}",
  setFolderName: "Meeting folder name",
  setFolderNameDesc:
    "Every folder with this name is suggested (case-insensitive). Separate several names with commas. The first name is used for new folders.",
  setFileName: "File name",
  placeholders: "Placeholders:",
  example: "Example:",
  exampleTitle: "Kick-off",
  setTemplate: "Template (optional)",
  setTemplateDesc:
    "Path to a note whose content goes into every new meeting note, e.g. templates/meeting.md. The same placeholders work here; Templater commands (<% %>) are run as well.",
  setNewTab: "Open in new tab",
};

type Strings = typeof en;

const de: Strings = {
  cmdNew: "Neue Meeting Note",
  menuHere: "Neue Meeting Note hier",
  pickPlaceholder: "In welchen Meeting-Ordner?",
  instrSelect: "auswählen",
  instrNext: "weiter",
  instrCancel: "abbrechen",
  newFolderItem: "+ Neuen Meeting-Ordner anlegen …",
  newFolderSearch: "Neuen Meeting-Ordner anlegen",
  parentPlaceholder: "In welchem Ordner soll der Meeting-Ordner angelegt werden?",
  titleHeading: "Neue Meeting Note",
  titlePlaceholder: "Titel (optional), z.B. Kick-Off",
  createButton: "Anlegen",
  noticeFolderFail: "Ordner konnte nicht angelegt werden: {path}",
  noticeTplMissing: "Vorlage nicht gefunden: {path} – Note wird leer angelegt.",
  noticeNoteFail: "Meeting Note konnte nicht angelegt werden: {path}",
  setFolderName: "Name der Meeting-Ordner",
  setFolderNameDesc:
    "Alle Ordner mit diesem Namen werden vorgeschlagen (Groß-/Kleinschreibung egal). Mehrere Namen mit Komma trennen. Der erste Name wird für neue Ordner verwendet.",
  setFileName: "Dateiname",
  placeholders: "Platzhalter:",
  example: "Beispiel:",
  exampleTitle: "Kick-Off",
  setTemplate: "Vorlage (optional)",
  setTemplateDesc:
    "Pfad zu einer Note, deren Inhalt in jede neue Meeting Note kommt, z.B. templates/meeting.md. Dieselben Platzhalter funktionieren auch hier; Templater-Befehle (<% %>) werden ebenfalls ausgeführt.",
  setNewTab: "In neuem Tab öffnen",
};

const fr: Strings = {
  cmdNew: "Nouvelle note de réunion",
  menuHere: "Nouvelle note de réunion ici",
  pickPlaceholder: "Dans quel dossier de réunions ?",
  instrSelect: "sélectionner",
  instrNext: "continuer",
  instrCancel: "annuler",
  newFolderItem: "+ Créer un nouveau dossier de réunions …",
  newFolderSearch: "Créer un nouveau dossier de réunions",
  parentPlaceholder: "Où créer le dossier de réunions ?",
  titleHeading: "Nouvelle note de réunion",
  titlePlaceholder: "Titre (facultatif), p. ex. Lancement",
  createButton: "Créer",
  noticeFolderFail: "Impossible de créer le dossier : {path}",
  noticeTplMissing: "Modèle introuvable : {path} – la note sera créée vide.",
  noticeNoteFail: "Impossible de créer la note de réunion : {path}",
  setFolderName: "Nom des dossiers de réunions",
  setFolderNameDesc:
    "Tous les dossiers portant ce nom sont proposés (sans tenir compte de la casse). Séparez plusieurs noms par des virgules. Le premier nom est utilisé pour les nouveaux dossiers.",
  setFileName: "Nom de fichier",
  placeholders: "Variables :",
  example: "Exemple :",
  exampleTitle: "Lancement",
  setTemplate: "Modèle (facultatif)",
  setTemplateDesc:
    "Chemin d'une note dont le contenu est inséré dans chaque nouvelle note de réunion, p. ex. templates/meeting.md. Les mêmes variables fonctionnent ici ; les commandes Templater (<% %>) sont également exécutées.",
  setNewTab: "Ouvrir dans un nouvel onglet",
};

const es: Strings = {
  cmdNew: "Nueva nota de reunión",
  menuHere: "Nueva nota de reunión aquí",
  pickPlaceholder: "¿En qué carpeta de reuniones?",
  instrSelect: "seleccionar",
  instrNext: "continuar",
  instrCancel: "cancelar",
  newFolderItem: "+ Crear nueva carpeta de reuniones …",
  newFolderSearch: "Crear nueva carpeta de reuniones",
  parentPlaceholder: "¿Dónde crear la carpeta de reuniones?",
  titleHeading: "Nueva nota de reunión",
  titlePlaceholder: "Título (opcional), p. ej. Kick-off",
  createButton: "Crear",
  noticeFolderFail: "No se pudo crear la carpeta: {path}",
  noticeTplMissing: "Plantilla no encontrada: {path} – se creará una nota vacía.",
  noticeNoteFail: "No se pudo crear la nota de reunión: {path}",
  setFolderName: "Nombre de las carpetas de reuniones",
  setFolderNameDesc:
    "Se sugieren todas las carpetas con este nombre (sin distinguir mayúsculas). Separa varios nombres con comas. El primer nombre se usa para carpetas nuevas.",
  setFileName: "Nombre de archivo",
  placeholders: "Variables:",
  example: "Ejemplo:",
  exampleTitle: "Kick-off",
  setTemplate: "Plantilla (opcional)",
  setTemplateDesc:
    "Ruta a una nota cuyo contenido se inserta en cada nueva nota de reunión, p. ej. templates/meeting.md. Las mismas variables funcionan aquí; los comandos de Templater (<% %>) también se ejecutan.",
  setNewTab: "Abrir en una pestaña nueva",
};

const it: Strings = {
  cmdNew: "Nuova nota di riunione",
  menuHere: "Nuova nota di riunione qui",
  pickPlaceholder: "In quale cartella delle riunioni?",
  instrSelect: "seleziona",
  instrNext: "continua",
  instrCancel: "annulla",
  newFolderItem: "+ Crea nuova cartella delle riunioni …",
  newFolderSearch: "Crea nuova cartella delle riunioni",
  parentPlaceholder: "Dove creare la cartella delle riunioni?",
  titleHeading: "Nuova nota di riunione",
  titlePlaceholder: "Titolo (facoltativo), es. Kick-off",
  createButton: "Crea",
  noticeFolderFail: "Impossibile creare la cartella: {path}",
  noticeTplMissing: "Modello non trovato: {path} – la nota verrà creata vuota.",
  noticeNoteFail: "Impossibile creare la nota di riunione: {path}",
  setFolderName: "Nome delle cartelle delle riunioni",
  setFolderNameDesc:
    "Vengono suggerite tutte le cartelle con questo nome (senza distinzione tra maiuscole e minuscole). Separa più nomi con virgole. Il primo nome viene usato per le nuove cartelle.",
  setFileName: "Nome del file",
  placeholders: "Segnaposto:",
  example: "Esempio:",
  exampleTitle: "Kick-off",
  setTemplate: "Modello (facoltativo)",
  setTemplateDesc:
    "Percorso di una nota il cui contenuto viene inserito in ogni nuova nota di riunione, es. templates/meeting.md. Gli stessi segnaposto funzionano anche qui; vengono eseguiti anche i comandi di Templater (<% %>).",
  setNewTab: "Apri in una nuova scheda",
};

const pt: Strings = {
  cmdNew: "Nova nota de reunião",
  menuHere: "Nova nota de reunião aqui",
  pickPlaceholder: "Em qual pasta de reuniões?",
  instrSelect: "selecionar",
  instrNext: "continuar",
  instrCancel: "cancelar",
  newFolderItem: "+ Criar nova pasta de reuniões …",
  newFolderSearch: "Criar nova pasta de reuniões",
  parentPlaceholder: "Onde criar a pasta de reuniões?",
  titleHeading: "Nova nota de reunião",
  titlePlaceholder: "Título (opcional), ex.: Kick-off",
  createButton: "Criar",
  noticeFolderFail: "Não foi possível criar a pasta: {path}",
  noticeTplMissing: "Modelo não encontrado: {path} – a nota será criada vazia.",
  noticeNoteFail: "Não foi possível criar a nota de reunião: {path}",
  setFolderName: "Nome das pastas de reuniões",
  setFolderNameDesc:
    "Todas as pastas com este nome são sugeridas (sem diferenciar maiúsculas). Separe vários nomes com vírgulas. O primeiro nome é usado para novas pastas.",
  setFileName: "Nome do arquivo",
  placeholders: "Variáveis:",
  example: "Exemplo:",
  exampleTitle: "Kick-off",
  setTemplate: "Modelo (opcional)",
  setTemplateDesc:
    "Caminho de uma nota cujo conteúdo é inserido em cada nova nota de reunião, ex.: templates/meeting.md. As mesmas variáveis funcionam aqui; comandos do Templater (<% %>) também são executados.",
  setNewTab: "Abrir em nova aba",
};

const nl: Strings = {
  cmdNew: "Nieuwe vergadernotitie",
  menuHere: "Nieuwe vergadernotitie hier",
  pickPlaceholder: "In welke vergadermap?",
  instrSelect: "selecteren",
  instrNext: "verder",
  instrCancel: "annuleren",
  newFolderItem: "+ Nieuwe vergadermap aanmaken …",
  newFolderSearch: "Nieuwe vergadermap aanmaken",
  parentPlaceholder: "Waar moet de vergadermap worden aangemaakt?",
  titleHeading: "Nieuwe vergadernotitie",
  titlePlaceholder: "Titel (optioneel), bijv. Kick-off",
  createButton: "Aanmaken",
  noticeFolderFail: "Map kon niet worden aangemaakt: {path}",
  noticeTplMissing: "Sjabloon niet gevonden: {path} – notitie wordt leeg aangemaakt.",
  noticeNoteFail: "Vergadernotitie kon niet worden aangemaakt: {path}",
  setFolderName: "Naam van vergadermappen",
  setFolderNameDesc:
    "Alle mappen met deze naam worden voorgesteld (hoofdletterongevoelig). Scheid meerdere namen met komma's. De eerste naam wordt gebruikt voor nieuwe mappen.",
  setFileName: "Bestandsnaam",
  placeholders: "Variabelen:",
  example: "Voorbeeld:",
  exampleTitle: "Kick-off",
  setTemplate: "Sjabloon (optioneel)",
  setTemplateDesc:
    "Pad naar een notitie waarvan de inhoud in elke nieuwe vergadernotitie komt, bijv. templates/meeting.md. Dezelfde variabelen werken hier; Templater-opdrachten (<% %>) worden ook uitgevoerd.",
  setNewTab: "In nieuw tabblad openen",
};

const pl: Strings = {
  cmdNew: "Nowa notatka ze spotkania",
  menuHere: "Nowa notatka ze spotkania tutaj",
  pickPlaceholder: "W którym folderze spotkań?",
  instrSelect: "wybierz",
  instrNext: "dalej",
  instrCancel: "anuluj",
  newFolderItem: "+ Utwórz nowy folder spotkań …",
  newFolderSearch: "Utwórz nowy folder spotkań",
  parentPlaceholder: "Gdzie utworzyć folder spotkań?",
  titleHeading: "Nowa notatka ze spotkania",
  titlePlaceholder: "Tytuł (opcjonalnie), np. Kick-off",
  createButton: "Utwórz",
  noticeFolderFail: "Nie można utworzyć folderu: {path}",
  noticeTplMissing: "Nie znaleziono szablonu: {path} – notatka zostanie utworzona pusta.",
  noticeNoteFail: "Nie można utworzyć notatki ze spotkania: {path}",
  setFolderName: "Nazwa folderów spotkań",
  setFolderNameDesc:
    "Proponowane są wszystkie foldery o tej nazwie (bez względu na wielkość liter). Kilka nazw oddziel przecinkami. Pierwsza nazwa jest używana dla nowych folderów.",
  setFileName: "Nazwa pliku",
  placeholders: "Zmienne:",
  example: "Przykład:",
  exampleTitle: "Kick-off",
  setTemplate: "Szablon (opcjonalnie)",
  setTemplateDesc:
    "Ścieżka do notatki, której treść trafia do każdej nowej notatki ze spotkania, np. templates/meeting.md. Te same zmienne działają również tutaj; polecenia Templatera (<% %>) są także wykonywane.",
  setNewTab: "Otwórz w nowej karcie",
};

const ru: Strings = {
  cmdNew: "Новая заметка о встрече",
  menuHere: "Новая заметка о встрече здесь",
  pickPlaceholder: "В какую папку встреч?",
  instrSelect: "выбрать",
  instrNext: "далее",
  instrCancel: "отмена",
  newFolderItem: "+ Создать новую папку встреч …",
  newFolderSearch: "Создать новую папку встреч",
  parentPlaceholder: "Где создать папку встреч?",
  titleHeading: "Новая заметка о встрече",
  titlePlaceholder: "Название (необязательно), напр. Kick-off",
  createButton: "Создать",
  noticeFolderFail: "Не удалось создать папку: {path}",
  noticeTplMissing: "Шаблон не найден: {path} – заметка будет создана пустой.",
  noticeNoteFail: "Не удалось создать заметку о встрече: {path}",
  setFolderName: "Имя папок встреч",
  setFolderNameDesc:
    "Предлагаются все папки с этим именем (без учёта регистра). Несколько имён разделяйте запятыми. Первое имя используется для новых папок.",
  setFileName: "Имя файла",
  placeholders: "Переменные:",
  example: "Пример:",
  exampleTitle: "Kick-off",
  setTemplate: "Шаблон (необязательно)",
  setTemplateDesc:
    "Путь к заметке, содержимое которой вставляется в каждую новую заметку о встрече, напр. templates/meeting.md. Здесь работают те же переменные; команды Templater (<% %>) тоже выполняются.",
  setNewTab: "Открывать в новой вкладке",
};

const uk: Strings = {
  cmdNew: "Нова нотатка зустрічі",
  menuHere: "Нова нотатка зустрічі тут",
  pickPlaceholder: "У яку папку зустрічей?",
  instrSelect: "вибрати",
  instrNext: "далі",
  instrCancel: "скасувати",
  newFolderItem: "+ Створити нову папку зустрічей …",
  newFolderSearch: "Створити нову папку зустрічей",
  parentPlaceholder: "Де створити папку зустрічей?",
  titleHeading: "Нова нотатка зустрічі",
  titlePlaceholder: "Назва (необов'язково), напр. Kick-off",
  createButton: "Створити",
  noticeFolderFail: "Не вдалося створити папку: {path}",
  noticeTplMissing: "Шаблон не знайдено: {path} – нотатку буде створено порожньою.",
  noticeNoteFail: "Не вдалося створити нотатку зустрічі: {path}",
  setFolderName: "Назва папок зустрічей",
  setFolderNameDesc:
    "Пропонуються всі папки з цією назвою (без урахування регістру). Кілька назв розділяйте комами. Перша назва використовується для нових папок.",
  setFileName: "Назва файлу",
  placeholders: "Змінні:",
  example: "Приклад:",
  exampleTitle: "Kick-off",
  setTemplate: "Шаблон (необов'язково)",
  setTemplateDesc:
    "Шлях до нотатки, вміст якої вставляється в кожну нову нотатку зустрічі, напр. templates/meeting.md. Тут працюють ті самі змінні; команди Templater (<% %>) також виконуються.",
  setNewTab: "Відкривати в новій вкладці",
};

const tr: Strings = {
  cmdNew: "Yeni toplantı notu",
  menuHere: "Buraya yeni toplantı notu",
  pickPlaceholder: "Hangi toplantı klasörüne?",
  instrSelect: "seç",
  instrNext: "devam",
  instrCancel: "iptal",
  newFolderItem: "+ Yeni toplantı klasörü oluştur …",
  newFolderSearch: "Yeni toplantı klasörü oluştur",
  parentPlaceholder: "Toplantı klasörü nerede oluşturulsun?",
  titleHeading: "Yeni toplantı notu",
  titlePlaceholder: "Başlık (isteğe bağlı), ör. Kick-off",
  createButton: "Oluştur",
  noticeFolderFail: "Klasör oluşturulamadı: {path}",
  noticeTplMissing: "Şablon bulunamadı: {path} – not boş olarak oluşturulacak.",
  noticeNoteFail: "Toplantı notu oluşturulamadı: {path}",
  setFolderName: "Toplantı klasörlerinin adı",
  setFolderNameDesc:
    "Bu ada sahip tüm klasörler önerilir (büyük/küçük harf duyarsız). Birden fazla adı virgülle ayırın. Yeni klasörler için ilk ad kullanılır.",
  setFileName: "Dosya adı",
  placeholders: "Değişkenler:",
  example: "Örnek:",
  exampleTitle: "Kick-off",
  setTemplate: "Şablon (isteğe bağlı)",
  setTemplateDesc:
    "İçeriği her yeni toplantı notuna eklenen notun yolu, ör. templates/meeting.md. Aynı değişkenler burada da çalışır; Templater komutları (<% %>) da çalıştırılır.",
  setNewTab: "Yeni sekmede aç",
};

const ja: Strings = {
  cmdNew: "新しい会議ノート",
  menuHere: "ここに新しい会議ノート",
  pickPlaceholder: "どの会議フォルダに作成しますか？",
  instrSelect: "選択",
  instrNext: "次へ",
  instrCancel: "キャンセル",
  newFolderItem: "+ 新しい会議フォルダを作成 …",
  newFolderSearch: "新しい会議フォルダを作成",
  parentPlaceholder: "会議フォルダをどこに作成しますか？",
  titleHeading: "新しい会議ノート",
  titlePlaceholder: "タイトル（任意）例: キックオフ",
  createButton: "作成",
  noticeFolderFail: "フォルダを作成できませんでした: {path}",
  noticeTplMissing: "テンプレートが見つかりません: {path} – 空のノートを作成します。",
  noticeNoteFail: "会議ノートを作成できませんでした: {path}",
  setFolderName: "会議フォルダ名",
  setFolderNameDesc:
    "この名前のフォルダがすべて候補になります（大文字・小文字は区別しません）。複数の名前はカンマで区切ります。新しいフォルダには最初の名前が使われます。",
  setFileName: "ファイル名",
  placeholders: "プレースホルダー:",
  example: "例:",
  exampleTitle: "キックオフ",
  setTemplate: "テンプレート（任意）",
  setTemplateDesc:
    "新しい会議ノートに挿入される内容のノートのパス（例: templates/meeting.md）。同じプレースホルダーが使えます。Templater のコマンド（<% %>）も実行されます。",
  setNewTab: "新しいタブで開く",
};

const ko: Strings = {
  cmdNew: "새 회의 노트",
  menuHere: "여기에 새 회의 노트",
  pickPlaceholder: "어느 회의 폴더에 만들까요?",
  instrSelect: "선택",
  instrNext: "계속",
  instrCancel: "취소",
  newFolderItem: "+ 새 회의 폴더 만들기 …",
  newFolderSearch: "새 회의 폴더 만들기",
  parentPlaceholder: "회의 폴더를 어디에 만들까요?",
  titleHeading: "새 회의 노트",
  titlePlaceholder: "제목 (선택), 예: 킥오프",
  createButton: "만들기",
  noticeFolderFail: "폴더를 만들 수 없습니다: {path}",
  noticeTplMissing: "템플릿을 찾을 수 없습니다: {path} – 빈 노트를 만듭니다.",
  noticeNoteFail: "회의 노트를 만들 수 없습니다: {path}",
  setFolderName: "회의 폴더 이름",
  setFolderNameDesc:
    "이 이름을 가진 모든 폴더가 제안됩니다 (대소문자 구분 없음). 여러 이름은 쉼표로 구분하세요. 새 폴더에는 첫 번째 이름이 사용됩니다.",
  setFileName: "파일 이름",
  placeholders: "자리 표시자:",
  example: "예시:",
  exampleTitle: "킥오프",
  setTemplate: "템플릿 (선택)",
  setTemplateDesc:
    "새 회의 노트마다 내용이 삽입될 노트의 경로, 예: templates/meeting.md. 같은 자리 표시자를 여기서도 쓸 수 있으며 Templater 명령(<% %>)도 실행됩니다.",
  setNewTab: "새 탭에서 열기",
};

const zh: Strings = {
  cmdNew: "新建会议笔记",
  menuHere: "在此新建会议笔记",
  pickPlaceholder: "放到哪个会议文件夹？",
  instrSelect: "选择",
  instrNext: "继续",
  instrCancel: "取消",
  newFolderItem: "+ 新建会议文件夹 …",
  newFolderSearch: "新建会议文件夹",
  parentPlaceholder: "在哪里新建会议文件夹？",
  titleHeading: "新建会议笔记",
  titlePlaceholder: "标题（可选），例如：启动会",
  createButton: "创建",
  noticeFolderFail: "无法创建文件夹：{path}",
  noticeTplMissing: "未找到模板：{path} – 将创建空白笔记。",
  noticeNoteFail: "无法创建会议笔记：{path}",
  setFolderName: "会议文件夹名称",
  setFolderNameDesc: "所有具有此名称的文件夹都会被推荐（不区分大小写）。多个名称用逗号分隔。新文件夹使用第一个名称。",
  setFileName: "文件名",
  placeholders: "占位符：",
  example: "示例：",
  exampleTitle: "启动会",
  setTemplate: "模板（可选）",
  setTemplateDesc:
    "一篇笔记的路径，其内容会插入每篇新会议笔记，例如 templates/meeting.md。此处同样支持占位符；Templater 命令（<% %>）也会执行。",
  setNewTab: "在新标签页中打开",
};

const zhTW: Strings = {
  cmdNew: "新增會議筆記",
  menuHere: "在此新增會議筆記",
  pickPlaceholder: "要放到哪個會議資料夾？",
  instrSelect: "選擇",
  instrNext: "繼續",
  instrCancel: "取消",
  newFolderItem: "+ 新增會議資料夾 …",
  newFolderSearch: "新增會議資料夾",
  parentPlaceholder: "要在哪裡新增會議資料夾？",
  titleHeading: "新增會議筆記",
  titlePlaceholder: "標題（選填），例如：啟動會議",
  createButton: "建立",
  noticeFolderFail: "無法建立資料夾：{path}",
  noticeTplMissing: "找不到範本：{path} – 將建立空白筆記。",
  noticeNoteFail: "無法建立會議筆記：{path}",
  setFolderName: "會議資料夾名稱",
  setFolderNameDesc: "所有具有此名稱的資料夾都會被建議（不分大小寫）。多個名稱以逗號分隔。新資料夾會使用第一個名稱。",
  setFileName: "檔案名稱",
  placeholders: "預留位置：",
  example: "範例：",
  exampleTitle: "啟動會議",
  setTemplate: "範本（選填）",
  setTemplateDesc:
    "一篇筆記的路徑，其內容會插入每篇新的會議筆記，例如 templates/meeting.md。此處同樣支援預留位置；Templater 指令（<% %>）也會執行。",
  setNewTab: "在新分頁中開啟",
};

const LOCALES: Record<string, Strings> = { en, de, fr, es, it, pt, nl, pl, ru, uk, tr, ja, ko, zh, "zh-tw": zhTW };

function currentLanguage(): string {
  try {
    // getLanguage() exists since Obsidian 1.8.7; older versions keep the choice in localStorage.
    const fn = (obsidian as { getLanguage?: () => string }).getLanguage;
    return (fn ? fn() : window.localStorage.getItem("language")) || "en";
  } catch {
    return "en";
  }
}

export function pickLocale(lang: string): Strings {
  const l = lang.toLowerCase().replace("_", "-");
  return LOCALES[l] ?? LOCALES[l.split("-")[0]] ?? en;
}

let active: Strings | null = null;

export function t(key: keyof Strings, vars: Record<string, string> = {}): string {
  active ??= pickLocale(currentLanguage());
  return active[key].replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
}
