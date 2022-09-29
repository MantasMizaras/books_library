const express = require('express');
const { validateBook, validateToken } = require('../middleware');

const bookRoutes = express.Router();

const controller = require('../controller/bookController');

bookRoutes.get('/book', controller.showBooks);
bookRoutes.post('/book', validateBook, validateToken, controller.postNewBook);
bookRoutes.patch('/book/:id', validateBook, validateToken, controller.patchBook);
bookRoutes.delete('/book/:id', validateToken, controller.removeBook);

module.exports = bookRoutes;
