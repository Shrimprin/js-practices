import { newDb, run, all } from "./sqlite_utils.js";

let db;
newDb(":memory:")
  .then((result) => {
    db = result;
    return run(
      db,
      "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(20) NOT NULL)",
    );
  })
  .then(() => run(db, "INSERT INTO users (name) VALUES (?)", "Alice"))
  .then((result) => {
    console.log(`ID:${result.lastID}`);
    return run(db, "INSERT INTO users (name) VALUES (?)", "Bob");
  })
  .then((result) => {
    console.log(`ID:${result.lastID}`);
    return all(db, "SELECT * FROM users");
  })
  .then((result) => {
    console.log(result);
    run(db, "DROP TABLE users");
  });
