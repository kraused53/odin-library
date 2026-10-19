const booksDisplay = document.getElementById("books-display");
const addBookButton = document.getElementById("add-book-button");
const addBookDialog = document.getElementById("add-book-dialog");
const addBookForm = document.getElementById("add-book-form");
const closeDialogButton = document.getElementById("add-book-close");

const dialogBookTitle = document.getElementById("dialog-title");
const dialogBookAuthor = document.getElementById("dialog-author");
const dialogBookRead = document.getElementById("dialog-read");

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
    dialogBookTitle.focus();
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = dialogBookTitle.value.trim();
    const author = dialogBookAuthor.value.trim();
    const hasBeenRead = dialogBookRead.checked;

    // required does not reject whitespace-only input.
    if (!title || !author) {
        if (!title) {
            dialogBookTitle.setCustomValidity("Please enter a title.");
            dialogBookTitle.reportValidity();
            dialogBookTitle.setCustomValidity("");
        } else {
            dialogBookAuthor.setCustomValidity("Please enter an author.");
            dialogBookAuthor.reportValidity();
            dialogBookAuthor.setCustomValidity("");
        }
        return;
    }

    addBookToLibrary(title, author, hasBeenRead);

    addBookForm.reset();
    addBookDialog.close();
});

let myLibrary = [];


function Book(title, author, hasBeenRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.hasBeenRead = hasBeenRead
}

function addBookToLibrary(title, author, hasBeenRead) {
    const myBook = new Book(title, author, hasBeenRead);
    myLibrary.push(myBook);
    addBookToPage(myBook);
}

function logAllBooks() {
    for(let i = 0; i < myLibrary.length; i++) {
        console.log("Book "+(i+1)+" / "+myLibrary.length);
        console.log("\t   ID: "+myLibrary.at(i).id);
        console.log("\tTitle: "+myLibrary.at(i).title);
        console.log("\Author: "+myLibrary.at(i).author);
        console.log("\t Read: "+myLibrary.at(i).hasBeenRead);
    }
}

function deleteBook(toDelete) {
    console.log(toDelete.id);
    myLibrary = myLibrary.filter(book => book.id != toDelete.id);
}

function addBookToPage(book) {
    let newBook = document.createElement("div");
    newBook.setAttribute('id', book.id);

    let bookTitle = document.createElement("p");
    bookTitle.textContent = book.title;
    newBook.appendChild(bookTitle);

    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = "By: " + book.author;
    newBook.appendChild(bookAuthor);

    let bookRead = document.createElement("p");
    if(book.hasBeenRead === true) {
        bookRead.textContent = "Has been read.";
    }else {
        bookRead.textContent = "Has not been read.";
    }
    newBook.appendChild(bookRead);

    newBook.classList.add("book");

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
        deleteBook(event.currentTarget.parentElement);
        event.currentTarget.parentElement.remove()
    });

    newBook.appendChild(deleteButton);
    booksDisplay.appendChild(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", true);
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", true);
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", false);
addBookToLibrary("The Return of the King", "J.R.R. Tolkien", false);