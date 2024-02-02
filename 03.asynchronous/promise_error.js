import { newDb, run, all } from "./sqlite_utils.js";

let db;
newDb(":memory:")
  .then((newDb) => {
    db = newDb;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
    );
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", null))
  .then((queryResult) => console.log(`ID: ${queryResult.lastID}`))
  .catch((error) => {
    if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() => all(db, "SELECT * FROM nox_exist_table"))
  .then((books) => {
    books.forEach((book) => {
      console.log(book);
    });
  })
  .catch((error) => {
    if (error instanceof Error && error.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() => {
    return run(db, "DROP TABLE books");
  });
