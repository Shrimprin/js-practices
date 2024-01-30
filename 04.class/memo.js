import { newDb, run, all } from "./sqlite_utils.js";

export class Memo {
  static db;

  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  static async initDb() {
    this.db = await newDb("memo.db");
    await run(
      this.db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL)",
    );
  }

  async save() {
    try {
      await run(Memo.db, "INSERT INTO memos (title, content) VALUES (?, ?)", [
        this.title,
        this.content,
      ]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
