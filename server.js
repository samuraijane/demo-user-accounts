const express = require('express');
const { User } = require('./models');

const server = express();

server.get('/', (req, res) => {
  res.json({location: '/'})
});

// demo only, do not allow just anyone to access all the users in your database
server.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080');
});