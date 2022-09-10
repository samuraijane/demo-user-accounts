const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const checkAuth = require('./middleware');
const { User } = require('./models');

const server = express();

// third-party middleware
server.use(cookieParser());
server.use(express.json());
server.use(
  session({
    cookie: {
      secure: false,  // allow requests over http; if true, allow only over https
      maxAge: 86400  // set cookie expiration for 86,400 seconds (i.e. 24 hours)
    },
    resave: false,  // update the session even when there are no changes
    saveUninitialized: true,  // always create a session
    secret: 'H!4e_#uTr2'  // a unique value that signs the cookie
  })
);

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

server.get('/login', (req, res) => {
  res.json({
    message: 'Please login'
  });
});

server.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      email: username,
      password
    }
  });
  if (user) {
    req.session.user = user;
    res.redirect(`/users/${user.id}`);
  } else {
    res.json({
      message: 'There is a problem with the username or password.'
    });
  }
});

// demo only, do not allow just anyone to access all the users in your database
server.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// this endpoint is now protected with `checkAuth` middleware
server.get('/users/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
      const user = await User.findByPk(id);
      res.json({
        message: `User with id ${id} has been successfully authenticated.`
      });
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