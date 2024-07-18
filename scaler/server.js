const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/alert', (req, res) => {
  console.log('Received alert:', JSON.stringify(req.body, null, 2));
  // Process the alert here
  // You could log to a database, send notifications, etc.
  res.status(200).send('Alert received');
});

app.listen(port, () => {
  console.log(`Alert receiver listening at http://localhost:${port}`);
});