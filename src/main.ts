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

fetchBooks();
