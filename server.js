'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/api/v1/books', (req, res) => {
  let SQL = `SELECT book_id, title, author, image_url FROM books;`;

  client.query(SQL)
    .then(result => console.log(result.rows))
    .then(result => res.send(result.rows));
});

app.get('*', (req, res) => res.status(403).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Mac: export DATABASE_URL=postgres://localhost:5432/books_app
// Windows: export DATABASE_URL=postgres://postgres:password@localhost:5432/books_app