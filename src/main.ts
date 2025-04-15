import "./style.css";

const API_URL = "https://u05-typescript.onrender.com/api/v1/books";
const bookList = document.getElementById("book-list");

function renderBook(book: any) {
  const li = document.createElement("li");
  li.textContent = `${book.title} by ${book.author} (${book.publishedYear})`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "1rem";

  deleteBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_URL}/${book._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");

      li.remove(); // remove from DOM
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  });

  li.appendChild(deleteBtn);
  bookList?.appendChild(li);
}

async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();
    books.forEach(renderBook);
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
    renderBook(savedBook); // Lägg till direkt i listan
    form.reset(); // Rensa formuläret
  } catch (error) {
    console.error("Error adding book:", error);
  }
});

fetchBooks();
