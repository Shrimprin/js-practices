import { newDb, run, all } from "./sqlite_utils.js";

const db = await newDb(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL)",
);

try {
  const queryResult = await run(
    db,
    "INSERT INTO books (title) VALUES (?)",
    null,
  );
  console.log(`ID: ${queryResult.lastID}`);
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
    console.error(error.message);
  } else {
    throw error;
  }
}

try {
  const books = await all(db, "SELECT * FROM non_exist_table");
  books.forEach((book) => {
    console.log(book);
  });
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_ERROR") {
    console.error(error.message);
  } else {
    throw error;
  }
}

await run(db, "DROP TABLE books");
