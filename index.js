const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const basketItems = [];

app.get('/basket-items', (req, res) => {
  res.json(basketItems)
});

app.post('/basket-items', bodyParser.json(), (req, res) => {
  const { item } = req.body;

  basketItems.push(item);
  res.json(item);
});

app.use(express.static('api', {
  extensions: ['json'],
  index: 'index.json',
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
