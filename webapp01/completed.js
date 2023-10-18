document.addEventListener('DOMContentLoaded', function () {
    const completedBooksList = document.getElementById('completed-books-list');

    let completedBooksData = JSON.parse(localStorage.getItem('completedBooks')) || [];

    function renderCompletedBooks() {
        completedBooksList.innerHTML = '';
        completedBooksData.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <div>${book.name} by ${book.author}</div>
            `;
            completedBooksList.appendChild(bookItem);
        });
    }

    renderCompletedBooks();
});
