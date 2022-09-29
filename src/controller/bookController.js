/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const { getBooks, createNewBook, updateBook, deleteBook } = require('../model/bookModel');

const showBooks = async (req, res) => {
  try {
    const booksArr = await getBooks();
    res.json(booksArr);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postNewBook = async (req, res) => {
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
};

const patchBook = async (req, res) => {
  const id = req.params;
  const { title, author, publisher, publishing_date, genre, isbn } = req.body;
  try {
    const result = await updateBook(id, title, author, publisher, publishing_date, genre, isbn);
    if (result.affectedRows === 1) {
      res.status(201).json('Book succesfully updated!');
      return;
    }
    res.status(400).json('Book was not updated!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong with update');
  }
};

const removeBook = async (req, res) => {
  const id = req.params;
  try {
    const result = await deleteBook(id);
    if (result.affectedRows === 1) {
      res.status(201).json('Book succesfully deleted!');
      return;
    }
    res.status(400).json('Book was not deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong with delete');
  }
};

module.exports = { showBooks, postNewBook, patchBook, removeBook };
