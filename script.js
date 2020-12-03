
const add = document.querySelector('#addBtn');
add.addEventListener('click', addLibrary);

const newBook = document.querySelector('#newBtn');
newBook.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const close = document.getElementsByTagName('span')[0];
close.addEventListener('click', () => popUpForm.style.display = 'none');

class Book {
    constructor(title, author, pages, read,img) {
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + 'pg'; 
        this.read = form.read.checked; 
        this.img = form.img.value;
    }
}

let myLibrary = [];

function addLibrary() {
    event.preventDefault();
    popUpForm.style.display = 'none';

    let newBook = new Book(title, author, pages,read,img); 
    myLibrary.push(newBook); 
    setData();  
    render(); 
    form.reset();
}

function render() {
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

function createBook(item) {
    const library = document.querySelector('#Library-container');
    const book = document.createElement('div');
    const title = document.createElement('div');
    const auth = document.createElement('div');
    const page = document.createElement('div');
    const remove = document.createElement('button');
    const read = document.createElement('p');
    const img = document.createElement('img');

    img.src = item.img
    img.classList.add('img')
    book.appendChild(img);

    book.classList.add('book');
    book.setAttribute('id', myLibrary.indexOf(item));

    title.textContent = item.title;
    title.classList.add('title');
    book.appendChild(title);

    auth.textContent = item.author;
    auth.classList.add('author');
    book.appendChild(auth);

    page.textContent = item.pages;
    page.classList.add('pages');
    book.appendChild(page);

    read.classList.add('readBtn')    
    book.appendChild(read);
    if(item.read===false) {
        read.textContent = 'Not Read';
        read.style.color = '#e04f63';
    }else {
        read.textContent = 'Read';
        read.style.color = '#63da63'
    }

    remove.textContent = 'X'; 
    remove.setAttribute('id', 'removeBtn');
    book.appendChild(remove);
    
    library.appendChild(book);

    remove.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });

    read.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 
};

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') ;
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();

