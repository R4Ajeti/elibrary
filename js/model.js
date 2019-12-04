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
  let index = myLibrary.length;
  myLibrary[index] = new Book(title, author, pages);
  let authorAlert = myLibrary[index].author; let titleAlert = myLibrary[index].title;
  alerts("success", `A book $titleAlert from $authorAlert has been successful added`);
  console.log(`A book $titleAlert from $authorAlert has been successful added`);
}

function checked(bool){
    return (bool == true) ? "checked" : "";
}

function displayAllBooks() {

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  let cloneLib = myLibrary
  for (let i = 0; i < myLibrary.length; i++) {
    
    let li = document.createElement("li");

    li.className = "col-lg-3 col-md-3 col-sm-6 col-xs-12";
    li.setAttribute("index", i);
    li.innerHTML = `<div class="item-box-blog">
    <div class="item-box-blog-image">
        <div class="item-box-blog-date bg-blue-ui white"> <span class="mon">` + cloneLib[i].pages + `</span> </div>
        <figure> <img alt="" src="https://www.eff.org/files/digital-book-logo.jpg"> </figure>
    </div>
    <div class="item-box-blog-body">
        <div class="item-box-blog-heading">
            <a href="#" tabindex="0">
                <h5>` + cloneLib[i].title + `</h5>
            </a>
        </div>
        <div class="item-box-blog-data" style="padding: px 15px;">
            <p><i class="fa fa-user-o"></i> ` + cloneLib[i].author + `, <i class="fa fa-comments-o"></i> Comments(0)</p>
        </div>
        <div> <input type="checkbox" `+  checked(cloneLib[i].read)  +` onclick="toggleReaded(`+ i +`)">
        <div class="mt"> <a href="#" tabindex="0" class="btn bg-blue-ui white read" onClick ="removeBook(`+ i +`)">remove</a> </div>
    </div>
</div>`;
/*
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
*/
    let divN = document.createElement("div");
    divN.className = "clearfix visible-*";
    ul.appendChild(li);
  }

  localStorage.setItem('bookslist', JSON.stringify(myLibrary));

}

function removeBook(index) {
  let authorAlert = myLibrary[index].author; let titleAlert = myLibrary[index].title;
  myLibrary.splice(index, 1);
  displayAllBooks();
  alerts("bookRemoved", `A book $titleAlert from $authorAlert has been successful removed`);
  console.log(`A book $titleAlert from "+authorAlert has been successful removed`);
}

function toggleReaded(index){
  let cb = document.querySelector(".books li[index='" + index + "'] input");
  
  myLibrary[index].read = cb.checked;

  displayAllBooks();
}

function alerts(alertType, message){
    if(alertType == "success"){
        let alerts = document.getElementById("alerts");
        let p = document.createElement("p");
        p.innerHTML = message;
        p.className = "alert alert-info";

        alerts.appendChild(p);
    }else{
        let alerts = document.getElementById("alerts");
        let p = document.createElement("p");
        p.innerHTML = message;
        p.className = "alert alert-warning";

        alerts.appendChild(p);
    }
}

btn = document.querySelector(".main_form .btn")

function addBookDOMChange(){

  let title = document.querySelector(".main_form #title").value;
  let author = document.querySelector(".main_form #author").value;
  let pages = document.querySelector(".main_form #pages").value;

  addBookToLibrary(title, author, pages);
  
  document.querySelector(".main_form #title").value = null;
  document.querySelector(".main_form #author").value = null;
  document.querySelector(".main_form #pages").value = null;

  displayAllBooks();
}

displayAllBooks();

(function() {
'use strict';
window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
var validation = Array.prototype.filter.call(forms, function(form) {
form.addEventListener('submit', function(event) {
if (form.checkValidity() === false) {
event.preventDefault();
event.stopPropagation();
}else{
    addBookDOMChange();
}
form.classList.add('was-validated');
}, false);
});
}, false);
})();