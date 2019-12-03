let myLibrary = [];
var ul = document.querySelector("ul.books");

let lb = localStorage.getItem('bookslist');

if (lb){
  myLibrary = JSON.parse(lb)
}

function Book(title, author, pages) {
  this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = false
}

function addBookToLibrary(title, author, pages) {
  myLibrary[myLibrary.length] = new Book(title, author, pages)
}

function displayAllBooks() {

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  let cloneLib = myLibrary
  for (let i = 0; i < myLibrary.length; i++) {
    
    let li = document.createElement("li");

    li.setAttribute("index", i);
    li.innerHTML = "<p>" + cloneLib[i].title + "</p>" +
      "<p>" + cloneLib[i].author + "</p>" +
      "<p>" + cloneLib[i].pages + "</p>";

    let cb = document.createElement("input");
    cb.setAttribute("type", "checkbox");
    cb.setAttribute("onclick", "toggleReaded(" + i +")");
    cb.checked = cloneLib[i].read;

    li.appendChild(cb);

    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("onclick", "removeBook(" + i + ")");
    a.innerHTML = "Remove";

    li.appendChild(a);

    ul.appendChild(li);

  }

  localStorage.setItem('bookslist', JSON.stringify(myLibrary));

}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayAllBooks();
}

function toggleReaded(index){
  let cb = document.querySelector(".books li[index='" + index + "'] input");
  
  myLibrary[index].read = cb.checked;

  displayAllBooks();
}

btn = document.querySelector(".main_form .btn")

btn.addEventListener("click", function () {

  let title = document.querySelector(".main_form .title").value;
  let author = document.querySelector(".main_form .author").value;
  let pages = document.querySelector(".main_form .pages").value;

  addBookToLibrary(title, author, pages);

  displayAllBooks();
})

displayAllBooks();