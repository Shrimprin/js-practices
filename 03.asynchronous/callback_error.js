import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(20) NOT NULL)",
    () => {
      db.run("INSERT INTO users (name) VALUES (?)", null, (error) => {
        if (error) {
          console.error(error.message);
        }
        db.get("SELECT * FROM non_exist_table", (error, result) => {
          if (error) {
            console.error(error.message);
          } else {
            console.log(result);
          }
          db.run("DROP TABLE users");
        });
      });
    },
  );
});
