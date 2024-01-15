import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(20) UNIQUE NOT NULL)",
    () => {
      db.run(
        "INSERT INTO books (title) VALUES (?)",
        "JavaScript本格入門",
        function () {
          console.log(`ID:${this.lastID}`);
          db.run(
            "INSERT INTO books (title) VALUES (?)",
            "JavaScriptひらがなプログラミング",
            function () {
              console.log(`ID:${this.lastID}`);
              db.all("SELECT * FROM books", (_error, users) => {
                users.forEach((user) => {
                  console.log(user);
                });
                db.run("DROP TABLE books");
              });
            },
          );
        },
      );
    },
  );
});
