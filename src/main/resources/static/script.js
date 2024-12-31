const apiUrl = "http://localhost:8080/api/books";

// Handle form submission to add or update book
document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("bookId").value;
    const book = {
        isbn: document.getElementById("isbn").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publishedDate: document.getElementById("publishedDate").value
    };

    try {
        if (id) {
            // Update existing book
            await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book)
            });
            alert("Book updated successfully!");
        } else {
            // Add new book
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book)
            });
            alert("Book added successfully!");
        }

        // Reset form and reload book list
        document.getElementById("bookForm").reset();
        loadBooks();
    } catch (error) {
        console.error("Error saving book:", error);
        alert("Failed to save the book.");
    }
});

// Fetch and display books
async function loadBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();

        const tableBody = document.querySelector("#bookTable tbody");
        tableBody.innerHTML = "";  // Clear existing rows

        books.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.isbn}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publishedDate}</td>
                <td>
                    <button class="btn-edit" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading books:", error);
        alert("Failed to load books.");
    }
}

// Populate form for editing
async function editBook(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const book = await response.json();

        document.getElementById("bookId").value = book.id;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("publishedDate").value = book.publishedDate;
    } catch (error) {
        console.error("Error fetching book:", error);
        alert("Failed to fetch book details.");
    }
}

// Delete book
async function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            alert("Book deleted!");
            loadBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("Failed to delete book.");
        }
    }
}


loadBooks();
