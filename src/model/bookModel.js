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

module.exports = {
  getBooks,
  createNewBook,
};
