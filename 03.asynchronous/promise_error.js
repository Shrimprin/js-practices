import { newDb, run, all } from "./sqlite_utils.js";

let db;
newDb(":memory:")
  .then((result) => {
    db = result;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(20) UNIQUE NOT NULL)",
    );
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", null))
  .catch((error) => {
    console.error(error.message);
    return all(db, "SELECT * FROM nox_exist_table");
  })
  .then((result) => {
    console.log(result);
    run(db, "DROP TABLE books");
  })
  .catch((error) => {
    console.error(error.message);
    run(db, "DROP TABLE books");
  });
