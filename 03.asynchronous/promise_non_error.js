import { newDb, run, all } from "./sqlite_utils.js";

let db;
newDb(":memory:")
  .then((booksDb) => {
    db = booksDb;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
    );
  })
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?)", "JavaScript本格入門"),
  )
  .then((book) => {
    console.log(`ID: ${book.lastID}`);
    return run(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "JavaScriptひらがなプログラミング",
    );
  })
  .then((book) => {
    console.log(`ID: ${book.lastID}`);
    return all(db, "SELECT * FROM books");
  })
  .then((books) => {
    books.forEach((book) => {
      console.log(book);
    });
    return run(db, "DROP TABLE books");
  });
