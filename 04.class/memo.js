import sqlite3 from "sqlite3";

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
    this.#db = await Memo.newDb(dbName);
    await Memo.run(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT NOT NULL)",
    );
  };

  static fetchAll = async () => {
    const memoRecords = await Memo.all(
      this.#db,
      "SELECT * FROM memos order by title",
    );
    return memoRecords.map(
      (memoRecord) => new Memo(memoRecord.title, memoRecord.content),
    );
  };

  static findBy = async (key, value) => {
    const [memoRecord] = await Memo.all(
      Memo.#db,
      `SELECT * from memos where ${key}=? LIMIT 1`,
      [value],
    );

    return new Memo(memoRecord.title, memoRecord.content);
  };

  save = async () => {
    try {
      await Memo.run(
        Memo.#db,
        "INSERT INTO memos (title, content) VALUES (?, ?)",
        [this.#title, this.#content],
      );
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
      await Memo.run(
        Memo.#db,
        "DELETE FROM memos where title = ?",
        this.#title,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  };

  static newDb = (filename) =>
    new Promise((resolve, reject) => {
      const db = new sqlite3.Database(filename, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(db);
        }
      });
    });

  static run = (db, sql, params = []) =>
    new Promise((resolve, reject) => {
      db.run(sql, params, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });

  static all = (db, sql, params = []) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
}
