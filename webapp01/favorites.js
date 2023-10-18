document.addEventListener('DOMContentLoaded', function () {
    const favoriteBooksList = document.getElementById('favorite-books-list');

    let favoriteBooksData = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

    function renderFavoriteBooks() {
        favoriteBooksList.innerHTML = '';
        favoriteBooksData.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <div>${book.name} by ${book.author}</div>
            `;
            favoriteBooksList.appendChild(bookItem);
        });
    }

    renderFavoriteBooks();
});
