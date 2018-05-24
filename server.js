'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// const conString = 'postgres://localhost:5432';
const conString = 'postgres://postgres:password@localhost:5432/postgres';

const client = new pg.Client(process.env.DATABASE_URL || conString);
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

app.get('/api/v1/books/:id', (req, res) => {
  let SQL = 'SELECT * FROM books WHERE book_id = $1;';
  let values = [req.params.id];

  client.query(SQL, values)
    .then(result => res.send(result.rows))
    .catch(result => res.sendStatus(404).send(result));
});

// app.post('post-new-book', (req, res) => {
//   console.log(req);
// });

//catch-all request
app.get('*', (req, res) => res.status(403).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Mac: export DATABASE_URL=postgres://localhost:5432/books_app
// Windows: export DATABASE_URL=postgres://postgres:password@localhost:5432/books_app