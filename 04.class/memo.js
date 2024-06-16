import { Database } from "./database.js";

export class Memo {
  static #db;
  #title;
  #content;

  constructor(title, content) {
    this.#title = title;
    this.#content = content;
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }

  static initDb = async (dbName) => {
    Memo.#db = await Database.build(dbName);
    await Memo.#db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT NOT NULL)",
    );
  };

  static fetchAll = async () => {
    const memoRecords = await Memo.#db.all(
      "SELECT * FROM memos order by title",
    );
    return memoRecords.map(
      (memoRecord) => new Memo(memoRecord.title, memoRecord.content),
    );
  };

  static findBy = async (key, value) => {
    const [memoRecord] = await Memo.#db.all(
      `SELECT * from memos where ${key}=? LIMIT 1`,
      [value],
    );

    return new Memo(memoRecord.title, memoRecord.content);
  };

  save = async () => {
    try {
      await Memo.#db.run("INSERT INTO memos (title, content) VALUES (?, ?)", [
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
      await Memo.#db.run("DELETE FROM memos where title = ?", this.#title);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  };
}
