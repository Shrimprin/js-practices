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
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?)", "JavaScript本格入門"),
  )
  .then((result) => {
    console.log(`ID:${result.lastID}`);
    return run(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "JavaScriptひらがなプログラミング",
    );
  })
  .then((result) => {
    console.log(`ID:${result.lastID}`);
    return all(db, "SELECT * FROM books");
  })
  .then((result) => {
    console.log(result);
    run(db, "DROP TABLE books");
  });
