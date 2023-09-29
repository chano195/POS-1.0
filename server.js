const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8001;

console.log('Server started');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Access-Token, X-Key'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('POS Server Online.');
});

app.use('/api/inventory', require('./api/inventory'));
app.use('/api/customers', require('./api/customers'));
app.use('/api/categories', require('./api/categories'));
app.use('/api/settings', require('./api/settings'));
app.use('/api/users', require('./api/users'));
app.use('/api', require('./api/transactions'));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
