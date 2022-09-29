const express = require('express');
const { validateBook } = require('../middleware');
const { getBooks, createNewBook } = require('../model/bookModel');

const bookRoutes = express.Router();

bookRoutes.get('/book', async (req, res) => {
  try {
    const booksArr = await getBooks();
    res.json(booksArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

bookRoutes.post('/book', validateBook, async (req, res) => {
  // eslint-disable-next-line camelcase, object-curly-newline
  const { title, author, publisher, publishing_date, genre, isbn } = req.body;
  try {
    const result = await createNewBook(title, author, publisher, publishing_date, genre, isbn);
    if (result.affectedRows === 1) {
      res.status(201).json('Book succesfully added!');
      return;
    }
    res.status(400).json('Book was not added!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
});

module.exports = bookRoutes;
