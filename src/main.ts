import "./style.css";

const API_URL = "https://u05-typescript.onrender.com/api/v1/books";
const bookList = document.getElementById("book-list");
const formTitle = document.getElementById("form-title") as HTMLHeadingElement;
const formButton = document.getElementById("form-button") as HTMLButtonElement;

const form = document.getElementById("book-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const authorInput = document.getElementById("author") as HTMLInputElement;
const yearInput = document.getElementById("year") as HTMLInputElement;
const genreInput = document.getElementById("genre") as HTMLInputElement;

function renderBook(book: any) {
  const li = document.createElement("li");
  li.textContent = `${book.title} by ${book.author} (${book.publishedYear})`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "1rem";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.style.marginLeft = "0.5rem";

  // DELETE-funktion
  deleteBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_URL}/${book._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");
      li.remove();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  });

  // EDIT-funktion – fyller i formuläret
  editBtn.addEventListener("click", () => {
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = String(book.publishedYear);
    genreInput.value = book.genre;
    form.setAttribute("data-edit-id", book._id);

    formTitle.textContent = "Edit Book";
    formButton.textContent = "Save Changes";
  });

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    publishedYear: Number(yearInput.value),
    genre: genreInput.value,
  };

  const editId = form.getAttribute("data-edit-id");

  try {
    if (editId) {
      // UPDATE
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      if (!res.ok) throw new Error("Failed to update book");

      // Återställ listan
      bookList!.innerHTML = "";
      fetchBooks();

      // Återställ form-tillstånd
      form.removeAttribute("data-edit-id");
      formTitle.textContent = "Add a New Book";
      formButton.textContent = "Add Book";
    } else {
      // CREATE
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      if (!res.ok) throw new Error("Failed to create book");

      const savedBook = await res.json();
      renderBook(savedBook);
    }

    form.reset();
  } catch (error) {
    console.error("Error submitting book:", error);
  }
});

fetchBooks();
