import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", null, (error) => {
        if (error) {
          if (error instanceof Error && error.code === "SQLITE_CONSTRAINT")
            console.error(error.message);
        }
        db.get("SELECT * FROM non_exist_table", (error, result) => {
          if (error) {
            if (error instanceof Error && error.code === "SQLITE_ERROR")
              console.error(error.message);
          } else {
            console.log(result);
          }
          db.run("DROP TABLE books");
        });
      });
    },
  );
});
