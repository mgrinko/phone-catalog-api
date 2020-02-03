const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'DELETE,PATCH');
  next();
});

const basketItems = {};

app.get('/basket-items', (req, res) => {
  res.json(Object.values(basketItems))
});

app.post('/basket-items', bodyParser.json(), (req, res) => {
  const { itemId } = req.body;

  basketItems[itemId] = { id: itemId, count: 1 };

  res.json(basketItems[itemId]);
});

app.delete('/basket-items/:itemId', (req, res) => {
  const { itemId } = req.params;

  delete basketItems[itemId];

  res.json(true);
});

app.patch('/basket-items/:itemId', bodyParser.json(), (req, res) => {
  const { count } = req.body;
  const { itemId } = req.params;

  basketItems[itemId].count = count;

  res.json(basketItems[itemId]);
});

app.use('/phones', express.static('static/phones', {
  extensions: ['json'],
  index: ['index.json'],
}));

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
