const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.json({location: '/'})
});

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080');
});