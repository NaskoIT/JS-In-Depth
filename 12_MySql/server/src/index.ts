import express from 'express';
import { connect } from './database/connect';
import { models } from './database/models';

const app = express();

app.get('/', (req, res) => {
  res.send('API is up!');
});

connect().then(() => {
  app.listen(8080, () => {
    console.log('Server is listening on localhost:8080');
  });
});