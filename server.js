'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const conString = 'postgres://localhost:5432';
//const conString = 'postgres://postgres:password@localhost:5432/postgres';

const client = new pg.Client(process.env.DATABASE_URL || conString);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/', (req, res) => res.redirect('http://localhost:8080'));

app.get('/api/v1/books/:id', (req, res) => {
  console.log('HI!!!', req.params.id);

  let SQL = 'SELECT * FROM books WHERE book_id= $1;';
  let values = [req.params.id];

  client.query(SQL, values)
    .then(result => res.send(result.rows))
    .catch(result => {
      console.log('Error', result);
      return res.sendStatus(404).send(result);
    });
});

app.get('/api/v1/books', (req, res) => {
  let SQL = `SELECT * FROM books ORDER BY title;`;
  client.query(SQL)
    .then(result => res.send(result.rows))
    .catch(result => res.sendStatus(404).send(result));
});




app.get('*', (req, res) => res.status(403).send('This route does not exist'));

loadDB();

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

function loadDB() {
  client.query(
    `CREATE TABLE IF NOT EXISTS books(
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(100) NOT NULL,
      image_url VARCHAR (255),
      isbn VARCHAR(21),
      description TEXT
    );`
  );
}

// Mac: export DATABASE_URL=postgres://localhost:5432/books_app
// Windows: export DATABASE_URL=postgres://postgres:password@localhost:5432/books_app