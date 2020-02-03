const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'DELETE');
  next();
});

let basketItems = [];

app.get('/basket-items', (req, res) => {
  res.json(basketItems)
});

app.post('/basket-items', bodyParser.json(), (req, res) => {
  const { item } = req.body;

  basketItems = [...basketItems, item];

  res.json(item);
});

app.delete('/basket-items/:itemId', bodyParser.json(), (req, res) => {
  const { itemId } = req.params;

  basketItems = basketItems.filter(item => item !== itemId);
  res.json(true);
});

app.use('/phones', express.static('static/phones', {
  extensions: ['json'],
  index: ['index.json'],
}));

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
