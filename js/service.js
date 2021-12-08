'use strict'


var gBooks;
var gLastReadBook;
var gSortBy = 'NAME';
const PAGE_SIZE = 5;
var gPageIdx = 0

createBooks()



function movePage(whichPage) {
    if (whichPage) {
        gPageIdx++
        if (gPageIdx * PAGE_SIZE >= gBooks.length) {
            gPageIdx = 0
        }
    } else {
        if (gPageIdx === 0) {
            gPageIdx++
        }
        gPageIdx--
    }
}

function movePageTo(pageIdx) {
    gPageIdx = pageIdx
}


function _createBook(name, imgUrl) {
    return {
        id: makeId(),
        name,
        imgUrl: `<img src="img/${imgUrl}.png" />`,
        price: getRandomIntInclusive(50, 400),
        rate: 0
    }
}


function createBooks() {
    var books = loadFromStorage('booksDB')
    if (!books || !books.length) {
        books = [
            _createBook('Learning Some', 1),
            _createBook('Proccessing Some', 2),
            _createBook('Mastering Some', 3),
            _createBook('Completing Some', 4),
            _createBook('Completing Some', 1),
            _createBook('Completing Some', 2),
            _createBook('Completing Some', 3),
            _createBook('Completing Some', 1),
            _createBook('Completing Some', 4),
            _createBook('Completing Some', 3),
            _createBook('Completing Some', 2),
            _createBook('Completing Some', 1),
            _createBook('Completing Some', 4),
            _createBook('Completing Some', 4),
            _createBook('Completing Some', 4),
            _createBook('Completing Some', 4),
        ]
    }
    gBooks = books
    _saveBooksToStorage()
}


function _saveBooksToStorage() {
    saveToStorage('booksDB', gBooks)
}

//lol

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })

    gBooks.splice(bookIdx, 1)
    if (gBooks.length % PAGE_SIZE === 0 && gPageIdx !== 0) gPageIdx--
    _saveBooksToStorage()
}

function addBook(name, price) {
    const newBook = {
        id: makeId(),
        name,
        imgUrl: `<img src="img/${getRandomIntInclusive(1, 4)}.png" />`,
        price,
        rate: 0
    }

    gBooks.unshift(newBook)
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(function (book) {
        return book.id === bookId
    })

    book.price = bookPrice
    _saveBooksToStorage()
}

function readBook(bookId) {

    const book = gBooks.find(function (book) {
        return book.id === bookId
    })

    gLastReadBook = book
    // console.log(gLastReadBook);

    return book
}

function addRate() {
    if (gLastReadBook.rate === 10) return
    gLastReadBook.rate++
    _saveBooksToStorage()
}

function removeRate() {
    if (gLastReadBook.rate === 0) return
    gLastReadBook.rate--
    _saveBooksToStorage()
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getBooksForDisplay() {
    if (gSortBy === 'NAME') {
        gBooks.sort(function (book1, book2) {
            if (book1.name.toLowerCase() < book2.name.toLowerCase()) { return -1; }
            if (book2.name.toLowerCase() > book1.name.toLowerCase()) { return 1; }
            return 0;
        })
    }
    if (gSortBy === 'PRICE') {
        gBooks.sort(function (book1, book2) {
            return book2.price - book1.price
        })
    }


    console.log(gPageIdx);

    const startIdx = gPageIdx * PAGE_SIZE
    const books = gBooks.slice(startIdx, startIdx + PAGE_SIZE)
    console.log('books', books);
    return books;

}

function getPageAmount() {
    return Math.ceil(gBooks.length / PAGE_SIZE)

}


function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
