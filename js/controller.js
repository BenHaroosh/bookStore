'use strict'


function onInit() {
    renderBoard()
}

function renderBoard() {

    const books = getBooksForDisplay()

    const strHtmls = books.map(function (book) {
        return `
        <tr>
        <td> ${book.id} </td>
        <td> ${book.name} </td>
        <td> ${book.imgUrl} </td>
        <td> ${book.price}$ </td>
        <td> <button class="btn" onclick= "onRemove('${book.id}')"> Delete </button> </td>
        <td> <button class="btn" onclick= "onRead('${book.id}')"> Read </button> </td>
        <td> <button class="btn" onclick= "onUpdate('${book.id}')"> Update </button> </td>
        </tr>
        `
    })
    document.querySelector('.container').innerHTML = strHtmls.join('')

    // const pageAmount = getPageAmount()
    // const pageStrHtml = ''
    // var count = 1

    // for (var i = 0; i < pageAmount; i++) {
    //     pageStrHtml += `<button> ${count++} </button>`
    //     console.log(pageStrHtml);
    // }

    // document.querySelector('.page-container').innerHTML = pageStrHtml

}


function onRemove(bookId) {
    removeBook(bookId)
    renderBoard()
}

function onAdd() {
    var elBookName = document.querySelector('.book-name')
    var elBookPrice = document.querySelector('.book-price')

    const bookName = elBookName.value
    const bookPrice = elBookPrice.value

    if (!bookName || bookName === ' ') return
    if (!bookPrice || bookPrice < 0) return

    addBook(bookName, bookPrice)

    elBookPrice.value = ''
    elBookName.value = ''

    renderBoard()
}

function onUpdate(bookId) {
    const newPrice = +prompt('New Book Price?')
    if (!newPrice || newPrice < 0) return

    updateBook(bookId, newPrice)
    renderBoard()
}

function onRead(bookId) {
    var elModal = document.querySelector('.modal')
    var elModalH3 = elModal.querySelector('h3')
    var elModalSpan = elModal.querySelector('span')
    var elModalRateSpan = elModal.querySelector('.rate-span')
    var elModalP = elModal.querySelector('p')

    const book = readBook(bookId)

    elModalH3.innerText = book.name
    elModalSpan.innerText = book.price
    elModalRateSpan.innerText = book.rate
    elModalP.innerText = makeLorem()

    elModal.classList.add('open')
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('open')

}

function onAddRate() {
    addRate()
    var elModalRateSpan = document.querySelector('.rate-span')
    elModalRateSpan.innerText = gLastReadBook.rate
}

function onRemoveRate() {
    removeRate()
    var elModalRateSpan = document.querySelector('.rate-span')
    elModalRateSpan.innerText = gLastReadBook.rate
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderBoard()
}

function onNextPage() {
    movePage(true)
    renderBoard()
}

function onPrevious() {
    movePage(false)
    renderBoard()
}