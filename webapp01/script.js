document.addEventListener('DOMContentLoaded', function () {
    const booksList = document.getElementById('books-list');
    const modal = document.getElementById('myModal');
    const addBookBtn = document.querySelector('.add-book-btn');
    const clearProgressBtn = document.querySelector('.clear-progress-btn');
    const closeModalBtn = document.querySelector('.close');
    const bookNameInput = document.getElementById('bookName');
    const authorInput = document.getElementById('author');
    const totalPagesInput = document.getElementById('totalPages');
    const pagesReadInput = document.getElementById('pagesRead');

    let booksData = JSON.parse(localStorage.getItem('books')) || [];

    function updateLocalStorage() {
        localStorage.setItem('books', JSON.stringify(booksData));
    }

    function renderBooks() {
        booksList.innerHTML = '';
        booksData.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <div>${book.name} by ${book.author}</div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(book.pagesRead / book.totalPages) * 100}%">
                        ${book.pagesRead} / ${book.totalPages} pages
                    </div>
                </div>
                <div class="book-options">
                    <button class="btn mark-favorite-btn">${book.favorite ? 'Unmark Favorite' : 'Mark Favorite'}</button>
                    <button class="btn delete-book-btn">Delete</button>
                </div>
            `;
            booksList.appendChild(bookItem);

            const deleteBtn = bookItem.querySelector('.delete-book-btn');
            const markFavoriteBtn = bookItem.querySelector('.mark-favorite-btn');

            deleteBtn.addEventListener('click', () => {
                booksData = booksData.filter(item => item.name !== book.name);
                updateLocalStorage();
                renderBooks();
            });

            markFavoriteBtn.addEventListener('click', () => {
                book.favorite = !book.favorite;
                updateLocalStorage();
                renderBooks();
            });
        });
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        bookNameInput.value = '';
        authorInput.value = '';
        totalPagesInput.value = '';
        pagesReadInput.value = '';
    }

    addBookBtn.addEventListener('click', () => {
        const name = bookNameInput.value;
        const author = authorInput.value;
        const totalPages = parseInt(totalPagesInput.value);
        const pagesRead = parseInt(pagesReadInput.value);

        if (name && author && totalPages && pagesRead <= totalPages) {
            const existingBook = booksData.find(book => book.name === name);
            if (existingBook) {
                existingBook.pagesRead = pagesRead;
            } else {
                const newBook = {
                    name,
                    author,
                    totalPages,
                    pagesRead,
                    favorite: false
                };
                booksData.push(newBook);
            }

            updateLocalStorage();
            hideModal();
            renderBooks();
        } else {
            alert('Please fill all the details correctly.');
        }
    });

    clearProgressBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all progress?')) {
            booksData = [];
            updateLocalStorage();
            renderBooks();
        }
    });

    closeModalBtn.addEventListener('click', hideModal);

    const completedBtn = document.querySelector('.header .btn:nth-child(2)');
    const favoritesBtn = document.querySelector('.header .btn:nth-child(3)');

    completedBtn.addEventListener('click', () => {
        window.location.href = 'completed.html';
    });

    favoritesBtn.addEventListener('click', () => {
        window.location.href = 'favorites.html';
    });


    renderBooks();
});
