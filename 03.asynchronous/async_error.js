import { newDb, run, all } from "./sqlite_utils.js";

const db = await newDb(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(20) UNIQUE NOT NULL)",
);

try {
  await run(db, "INSERT INTO books (title) VALUES (?)", null);
} catch (error) {
  console.error(error.message);
}

try {
  const books = await all(db, "SELECT * FROM non_exist_table");
  books.forEach((book) => {
    console.log(book);
  });
} catch (error) {
  console.error(error.message);
}

run(db, "DROP TABLE books");
