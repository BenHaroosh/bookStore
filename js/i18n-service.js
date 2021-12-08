'use strict'

var gCurrLang = 'en'

const gTrans = {
    title: {
        en: 'Welcome!',
        he: 'ברוכים הבאים!'
    },
    'book-name': {
        en: 'Book\'s name?',
        he: 'שם הספר?'
    },
    'book-price': {
        en: 'Book\'s price?',
        he: 'מחיר הספר?'
    },
    'add-btn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'sort-name': {
        en: 'Name',
        he: 'שם'
    },
    'sort-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'delete-btn':{
        en: 'Delete',
        he: 'מחק'
    },
    'read-btn':{
        en: 'Read',
        he: 'קרא'
    },
    'update-btn':{
        en: 'Update',
        he: 'עדכן'
    },
    'th-id':{
        en:'Id',
        he:'ת.ז'
    },
    'th-title':{
        en:'Title',
        he:'כותרת'
    },
    'th-picture':{
        en:'Picture',
        he:'תמונה'
    },
    'th-price':{
        en:'Price',
        he:'מחיר'
    },
    'th-actions':{
        en:'Actions',
        he:'פעולות'
    },
    'back-page-btn':{
        en:'PREVIOUS',
        he:'חזור'
    },
    'ahead-page-btn':{
        en:'NEXT',
        he:'הבא'
    },
    close:{
        en:'Close',
        he:'סגור'
    },
    desc:{
        en:'Book\'s Description',
        he:'תיאור הספר'
    },
    price:{
        en:'Book\'s Price',
        he:'מחיר הספר'
    },
    'new-price':{
        en:'New-Price?',
        he:'מחיר חדש?'
    },
    mHeader:{
        en:'What Is The New Price?',
        he:'מה המחיר החדש?'
    }
}


function setLang(setLangBy) {
    gCurrLang = setLangBy
}

function getLangForDisplay() {
    const transKeys = document.querySelectorAll('[data-trans]')

    transKeys.forEach(transKey => {
        const transData = transKey.dataset.trans
        // console.dir(transKey)
        if (transKey.nodeName === 'INPUT') {
            transKey.placeholder = doTrans(transData)
        } else {
            transKey.innerText = doTrans(transData)

        }
    })
}

function doTrans(transData) {
    // console.log(transData);
    return gTrans[transData][gCurrLang]
}