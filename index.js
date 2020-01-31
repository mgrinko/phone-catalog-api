const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

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

app.use('/phones', express.static('static/phones', {
  extensions: ['json'],
  index: ['index.json'],
}));

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
