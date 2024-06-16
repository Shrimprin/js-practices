import sqlite3 from "sqlite3";

export class Database {
  #db;
  constructor(db) {
    this.#db = db;
  }

  static build = async (dbName) => {
    const db = await Database.newDb(dbName);
    return new Database(db);
  };

  static newDb = async (dbName) =>
    new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbName, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(db);
        }
      });
    });

  run = (sql, params = []) =>
    new Promise((resolve, reject) => {
      this.#db.run(sql, params, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });

  all = (sql, params = []) =>
    new Promise((resolve, reject) => {
      this.#db.all(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
}
