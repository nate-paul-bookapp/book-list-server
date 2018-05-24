'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//root request
app.get('/', (req, res) => {
  let SQL = `SELECT * FROM books ORDER BY title;`;
  client.query(SQL)
    .then(result => {
      res.send(result.rows);
    })
    .catch(result => res.sendStatus(404).send(result));
});

// Retrieve a single book based on ID
app.get('/api/v1/books/:id', (req, res) => {
  let SQL = 'SELECT * FROM books WHERE book_id = $1;';
  let values = [req.params.id];

  client.query(SQL, values)
    .then(result => res.send(result.rows))
    .catch(result => res.sendStatus(404).send(result));
});

app.post('/submitted', express.urlencoded({extended: true}), (req, res) => {
  let {title, author, isbn, image_url, description} = req.body;
  let SQL = `INSERT INTO books(title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5);`;
  let values = [title, author, isbn, image_url, description];

  client.query(SQL, values)
  //TODO SEND BACK book_id
    .then(result => res.send(result.rows))
    .catch(result => res.sendStatus(404).send(result));

});

//catch-all request
app.get('*', (req, res) => res.status(403).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Mac: export DATABASE_URL=postgres://localhost:5432/
// Windows: export DATABASE_URL=postgres://postgres:password@localhost:5432/books_app