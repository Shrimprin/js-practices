import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(20) NOT NULL)",
    () => {
      db.run("INSERT INTO users (name) VALUES (?)", "Alice", () => {
        db.get(
          "SELECT id FROM users WHERE name=?",
          "Alice",
          (_error, result) => {
            console.log(`ID:${result.id}`);
            db.run("INSERT INTO users (name) VALUES (?)", "Bob", () => {
              db.get(
                "SELECT id FROM users WHERE name=?",
                "Bob",
                (_error, result) => {
                  console.log(`ID:${result.id}`);
                  db.all("SELECT * FROM users", (_error, users) => {
                    users.forEach((user) => {
                      console.log(user);
                    });
                    db.run("DROP TABLE users");
                  });
                },
              );
            });
          },
        );
      });
    },
  );
});
