import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Load data
const dataPath = process.argv[2] || "src/data/sam.json";
const data = JSON.parse(readFileSync(join(root, dataPath), "utf-8"));

// Calculate derived values
const birthYear = new Date(data.personal.dateOfBirth).getFullYear();
const currentYear = new Date().getFullYear();

// Get initials - first 2 chars of lastName (e.g., "Anh Tu" -> "AN")
const initials = data.personal.lastName.substring(0, 2).toUpperCase();

// Flatten data for template
const templateData = {
  personal: {
    ...data.personal,
    initials,
  },
  contact: data.contact,
};

// Load template
const template = readFileSync(join(root, "index.template.html"), "utf-8");

// Replace placeholders
let html = template;

// Handle {{key.subkey}} patterns
html = html.replace(
  /\{\{(\w+)\.(\w+)(\s*\|\s*upper)?\}\}/g,
  (match, key, subkey, modifier) => {
    const value = templateData[key]?.[subkey] ?? match;
    if (modifier?.includes("upper")) {
      return String(value).toUpperCase();
    }
    return value;
  }
);

// Write output
writeFileSync(join(root, "index.html"), html);
console.log(`Generated index.html from ${dataPath}`);
