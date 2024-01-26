import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", null, function (error) {
        if (
          error &&
          error instanceof Error &&
          error.code === "SQLITE_CONSTRAINT"
        ) {
          console.error(error.message);
        } else {
          console.log(`ID:${this.lastID}`);
        }
        db.all("SELECT * FROM nox_exist_table", (error, books) => {
          if (
            error &&
            error instanceof Error &&
            error.code === "SQLITE_ERROR"
          ) {
            console.error(error.message);
          } else {
            books.forEach((book) => {
              console.log(book);
            });
          }
          db.run("DROP TABLE books");
        });
      });
    },
  );
});
