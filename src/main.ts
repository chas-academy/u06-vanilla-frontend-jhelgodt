import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

const API_URL = "https://u05-typescript.onrender.com/api/v1/books";
const bookList = document.getElementById("book-list");

async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();

    books.forEach((book: any) => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author} (${book.publishedYear})`;
      bookList?.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}
const form = document.getElementById("book-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const authorInput = document.getElementById("author") as HTMLInputElement;
const yearInput = document.getElementById("year") as HTMLInputElement;
const genreInput = document.getElementById("genre") as HTMLInputElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    publishedYear: Number(yearInput.value),
    genre: genreInput.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (!res.ok) throw new Error("Failed to create book");

    const savedBook = await res.json();

    // Lägg till direkt i listan
    const li = document.createElement("li");
    li.textContent = `${savedBook.title} by ${savedBook.author} (${savedBook.publishedYear})`;
    bookList?.appendChild(li);

    form.reset(); // Rensa formuläret
  } catch (error) {
    console.error("Error adding book:", error);
  }
});
fetchBooks();
