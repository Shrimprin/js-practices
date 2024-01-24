import { newDb, run, all } from "./sqlite_utils.js";

let db;
newDb(":memory:")
  .then((memoryDb) => {
    db = memoryDb;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
    );
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", null))
  .catch((error) => {
    if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    }
    return all(db, "SELECT * FROM nox_exist_table");
  })
  .then((books) => {
    console.log(books);
    run(db, "DROP TABLE books");
  })
  .catch((error) => {
    if (error instanceof Error && error.code === "SQLITE_ERROR") {
      console.error(error.message);
    }
    run(db, "DROP TABLE books");
  });
