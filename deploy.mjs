// Copies the built plugin into a vault's plugin folder.
// Set the vault via the OBSIDIAN_VAULT environment variable, or put its path
// into a local `.vault` file (git-ignored).
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

const vault =
  process.env.OBSIDIAN_VAULT ?? (existsSync(".vault") ? readFileSync(".vault", "utf8").trim() : "");
if (!vault) {
  console.error("No vault configured. Set OBSIDIAN_VAULT or create a .vault file containing the vault path.");
  process.exit(1);
}

const { id } = JSON.parse(readFileSync("manifest.json", "utf8"));
const target = join(vault, ".obsidian", "plugins", id);

mkdirSync(target, { recursive: true });
for (const f of ["main.js", "manifest.json", "styles.css"]) copyFileSync(f, join(target, f));
console.log(`Deployed to ${target}`);
