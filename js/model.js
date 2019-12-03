let myLibrary = [];

function Book(title, author, pages) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = false
}

function addBookToLibrary(title, author, pages) {
  myLibrary[myLibrary.length] = new Book(title, author, pages)
}

function displayAllBooks(){
  let cloneLib = myLibrary
  for(let i = 0; i<myLibrary.length; i++){
      console.log("Title: "+cloneLib[i].title+" Author: "+cloneLib[i].author+" has: "+cloneLib[i].pages+" pages");
  }
  console.log("true");
}

addBookToLibrary("Tesla", "Elon Musk", 193)
addBookToLibrary("Google", "Just another author", 83)
addBookToLibrary("Area", "Just another author", 83)
console.log("MOdel is included!");
displayAllBooks();