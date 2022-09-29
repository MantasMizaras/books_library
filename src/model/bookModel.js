/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function getBooks() {
  const sql = 'SELECT * FROM books';
  return executeDb(sql);
}

// eslint-disable-next-line camelcase
function createNewBook(title, author, publisher, publishing_date, genre, isbn) {
  const sql = 'INSERT INTO books (title, author, publisher, publishing_date, genre, isbn) VALUES (?, ?, ?, ?, ?, ?)';
  // eslint-disable-next-line camelcase
  return executeDb(sql, [title, author, publisher, publishing_date, genre, isbn]);
}

function updateBook(id, title, author, publisher, publishing_date, genre, isbn) {
  const sql = `UPDATE books SET title = ? ,author = ? ,publisher = ? ,publishing_date = ? ,genre = ? ,isbn = ? WHERE id=${id.id} `;
  return executeDb(sql, [title, author, publisher, publishing_date, genre, isbn]);
}

function deleteBook(id) {
  const sql = `DELETE FROM books WHERE id=${id.id}`;
  return executeDb(sql, [id]);
}

module.exports = {
  getBooks,
  createNewBook,
  updateBook,
  deleteBook,
};
