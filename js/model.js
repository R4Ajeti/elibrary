
let myLibrary = [];
const ul = document.querySelector('ul.books');

const lb = localStorage.getItem('bookslist');

if (lb) {
  myLibrary = JSON.parse(lb);
}

function alerts(alertType, message) {
  const alertsEl = document.getElementById('alerts');

  while (alertsEl.firstChild) {
    alertsEl.removeChild(alertsEl.firstChild);
  }

  const p = document.createElement('p');
  p.innerHTML = message;

  if (alertType === 'success') {
    p.className = 'alert alert-info';
  } else {
    p.className = 'alert alert-warning';
  }

  alertsEl.appendChild(p);
}

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary(title, author, pages) {
  const index = myLibrary.length;
  myLibrary[index] = new Book(title, author, pages);
  const authorAlert = myLibrary[index].author; const titleAlert = myLibrary[index].title;
  alerts('success', `A book ${titleAlert} from ${authorAlert} has been successful added`);
}

function checked(bool) {
  return (bool === true) ? 'checked' : '';
}

function displayAllBooks() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  const cloneLib = myLibrary;
  for (let i = 0; i < myLibrary.length; i += 1) {
    const li = document.createElement('li');

    li.className = 'col-lg-3 col-md-3 col-sm-6 col-xs-12';
    li.setAttribute('index', i);
    li.innerHTML = `<div class="item-box-blog">
      <div class="item-box-blog-image">
          <div class="item-box-blog-date bg-blue-ui white"> <span class="mon">${cloneLib[i].pages}</span> </div>
          <figure> <img alt="" src="https://www.eff.org/files/digital-book-logo.jpg"> </figure>
      </div>
      <div class="item-box-blog-body">
          <div class="item-box-blog-heading">
              <a href="#" tabindex="0">
                  <h5>${cloneLib[i].title}</h5>
              </a>
          </div>
          <div class="item-box-blog-data" style="padding: px 15px;">
              <p><i class="fa fa-user-o"></i> ${cloneLib[i].author}, <i class="fa fa-comments-o"></i> Comments(0)</p>
          </div>
          <div> <input type="checkbox" ${checked(cloneLib[i].read)} onclick="toggleReaded(${i})">
          <div class="mt"> <a href="#" tabindex="0" class="btn bg-blue-ui white read" onClick ="removeBook(${i})">remove</a> </div>
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
    const divN = document.createElement('div');
    divN.className = 'clearfix visible-*';
    ul.appendChild(li);
  }

  localStorage.setItem('bookslist', JSON.stringify(myLibrary));
}

/* eslint-disable */
//this two functions are been used with an onclick atribute.

function removeBook(index) {
  let authorAlert = myLibrary[index].author; let titleAlert = myLibrary[index].title;
  myLibrary.splice(index, 1);
  displayAllBooks();
  alerts("bookRemoved", 'A book ' + titleAlert + ' from ' + authorAlert + ' has been successful removed');
}

function toggleReaded(index) {
  let cb = document.querySelector(".books li[index='" + index + "'] input");

  myLibrary[index].read = cb.checked;

  displayAllBooks();
}
/* eslint-enable */

// let btn = document.querySelector(".main_form .btn")

function addBookDOMChange() {
  const title = document.querySelector('.main_form #title').value;
  const author = document.querySelector('.main_form #author').value;
  const pages = document.querySelector('.main_form #pages').value;

  addBookToLibrary(title, author, pages);

  document.querySelector('.main_form #title').value = null;
  document.querySelector('.main_form #author').value = null;
  document.querySelector('.main_form #pages').value = null;

  displayAllBooks();
}

displayAllBooks();


window.addEventListener('load', () => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', (event) => {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        addBookDOMChange();
      }
      form.classList.add('was-validated');
    }, false);
  });
});
