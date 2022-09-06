const express = require('express');
const { User } = require('./models');

const server = express();

server.use(express.json());

// we will protect this endpoint later so that only the user can delete his or her own data
server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.destroy({
      where: { id }
  });
  res.json({
    id: user.id,
    message: 'user deleted',
  });
});

server.get('/', (req, res) => {
  res.json({location: '/'})
});

// demo only, do not allow just anyone to access all the users in your database
server.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// we will protect this endpoint later so that only the user can access his or her own data
server.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      res.json(user);
  } catch (e) {
      console.log(e);
      res.status(404).json({ message: 'User not found' });
  }
});

server.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });
  res.json({
    id: newUser.id,
    message: 'new user created',
  });
});

// 
server.put('/users/:id', async (req, res) => {
  const user = await User.update(
    {
      // this specifies what you want to update
      password: req.body.password
    },
    {
      // this matches which record should be updated
      where: { id: req.params.id }
    }
  );
  res.json({
    id: user.id,
    message: 'password for user has been updated',
  });
 })

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080');
});