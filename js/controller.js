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
        <td> <button data-trans="delete-btn" class="btn" onclick= "onRemove('${book.id}')"> Delete </button> </td>
        <td> <button data-trans="read-btn" class="btn" onclick= "onRead('${book.id}')"> Read </button> </td>
        <td> <button data-trans="update-btn" class="btn" onclick= "onUpdate('${book.id}')"> Update </button> </td>
        </tr>
        `
    })
    document.querySelector('.container').innerHTML = strHtmls.join('')
    getLangForDisplay()
    renderPages()


}

function renderPages(){
    const pageAmount = getPageAmount()
    console.log(pageAmount);
    var pageStrHtml = ''
    var count = 1

    for (var i = 0; i < pageAmount; i++) {
        pageStrHtml += `<button onclick="onMovePage('${count}')"> ${count++} </button>`
    }

    document.querySelector('.page-container').innerHTML = pageStrHtml

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

    const strHtml = `
    <h4 data-trans="mHeader">What is the New Price?</h4>
    <button class="close-btn" onclick="onClose()">x</button>
    <input data-trans="new-price" class="new-price" type="text" placeholder="New Price?" />
    <button data-trans="update-btn" class="update-btn" onclick="onUpdateBook('${bookId}')">Update</button>
`

    var elModal = document.querySelector('.modal-update')
    elModal.innerHTML = strHtml
    if (elModal.classList.contains('unseen')) elModal.classList.remove('unseen')
    renderBoard()
}

function onClose() {
    var elModal = document.querySelector('.modal-update')
    elModal.classList.add('unseen')
}

function onUpdateBook(bookId) {
    onClose()
    if (!newPrice || newPrice < 0) return
    const el = document.querySelector('.new-price')
    const newPrice = el.value
    updateBook(bookId, newPrice)
    el.value = ''
    renderBoard()
}

function onRead(bookId) {
    var elModal = document.querySelector('.modal')
    var elModalH3 = elModal.querySelector('h3')
    var elModalSpan = elModal.querySelector('.num')
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

function onSetLang(setLangBy) {

    if (setLangBy === 'he') {
        document.body.classList.add('rtl')
    }
    else {
        document.body.classList.remove('rtl')
    }

    setLang(setLangBy)
    renderBoard()
}

function onMovePage(pageNum) {
    const pageIdx = pageNum - 1
    console.log(pageIdx);
    movePageTo(pageIdx)
    renderBoard()
}