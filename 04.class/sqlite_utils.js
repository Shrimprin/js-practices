import sqlite3 from "sqlite3";

export const newDb = (filename) =>
  new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filename, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });

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
