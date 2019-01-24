// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}




// UI Constructor

function UI() {};

// Add Book To List
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    // create tr element

    const row = document.createElement('tr');
    // insert col
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class = "delete"</a>X</td>
    `

    list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
    // create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // inser alert
    container.insertBefore(div, form);

    // Time out after 3seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000)
}

// Delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// clear field
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

    //   Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value




    // Instantiate book
    const book = new Book(title, author, isbn);

    alert('submitted')

    // Instantiate UI
    const ui = new UI();


    // validate
    if (title === '' || author === '' || isbn === '') {
        // Error
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book)

        // show success
        ui.showAlert('book Added!', 'success');


        // clear fields
        ui.clearFields();
    }



    e.preventDefault();

})

// event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();
    ui.deleteBook(e.target);

    // show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})