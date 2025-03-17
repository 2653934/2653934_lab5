const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

let books = [];

app.get('/whoami', (req, res) => {
    let me = {"studentNumber":"2653934"}
    res.json(me);
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ 'message': "Book not found" });
    res.json(book);
});

app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !details) {
        return res.status(400).json({ "error": "Missing required book details" });
    }

    const newBook = { id, title, details };
    books.push(newBook);
    res.json(newBook);
});

app.put('/books/:id', (req, res) => {
    const { id, title, details } = req.body;
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ 'message': "Book not found" });
    }

    if (!id || !title || !details) {
        return res.status(400).json({ 'error': "Missing required book details" });
    }

    books[bookIndex] = { id, title, details };

    res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ 'message': "Book not found" });
    books = books.filter(b => b.id !== req.params.id);
    res.json({ message: "Book deleted" });
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ 'message': "Book not found" });

    const { id , author, genre, publicationYear } = req.body;

    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ 'error': "Missing required book details" });
    }

    const details = { id, author, genre, publicationYear };
    book.details.push(details);
    res.json(book);
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ 'message': "Book not found" });

    book.details = book.details.filter(d => d.id !== req.params.detailId);
    res.json(book);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
