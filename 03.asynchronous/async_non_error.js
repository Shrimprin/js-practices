import { newDb, run, all } from "./sqlite_utils.js";

const db = await newDb(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
);

const titles = ["JavaScript本格入門", "JavaScriptひらがなプログラミング"];
for (const title of titles) {
  // forEach(async () => {}で書くとトップレベルの次の処理が実行されるため、for ofで記述
  const book = await run(db, "INSERT INTO books (title) VALUES (?)", title);
  console.log(`ID:${book.lastID}`);
}

const books = await all(db, "SELECT * FROM books");
books.forEach((book) => {
  console.log(book);
});

run(db, "DROP TABLE books");
