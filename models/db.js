import fs from "fs/promises";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default class FileAdapter {
  constructor(file) {
    this.file = file;
  }

  async read() {
    const result = await fs.readFile(join(__dirname, this.file), "utf-8");
    return JSON.parse(result);
  }

  async write(data) {
    await fs.writeFile(
      join(__dirname, this.file),
      JSON.stringify(data, null, 2)
    );
  }
}
