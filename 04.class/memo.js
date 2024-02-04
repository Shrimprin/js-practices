import { newDb, run, all } from "./sqlite_utils.js";

export class Memo {
  static #db;
  #id;
  #title;
  #content;

  constructor(id, title, content) {
    this.#id = id;
    this.#title = title;
    this.#content = content;
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }

  static initDb = async () => {
    this.#db = await newDb("memo.db");
    await run(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT NOT NULL)",
    );
  };

  static fetchAll = async () => {
    const memoRecords = await all(this.#db, "SELECT * FROM memos");
    return memoRecords.map(
      (memoRecord) =>
        new Memo(memoRecord.id, memoRecord.title, memoRecord.content),
    );
  };

  static findBy = async (key, value, memos) => {
    if (!memos) memos = await this.fetchAll();
    return memos.find((memo) => memo[key] === value);
  };

  save = async () => {
    try {
      await run(Memo.#db, "INSERT INTO memos (title, content) VALUES (?, ?)", [
        this.#title,
        this.#content,
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  };

  destroy = async () => {
    try {
      await run(Memo.#db, "DELETE FROM memos where id = ?", this.id);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  };
}
