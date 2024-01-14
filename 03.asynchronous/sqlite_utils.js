import sqlite3 from "sqlite3";

export const newDb = (filename) => {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(filename);
    resolve(db);
  });
};

export const run = (db, sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });

export const all = (db, sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
