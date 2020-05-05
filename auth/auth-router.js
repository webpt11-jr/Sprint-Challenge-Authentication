const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generate-token.js');

const Users = require('./auth-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 11);
  user.password = hash;

  Users.add(user)
    .then(added => {
      const token = generateToken(added);
      res.status(201).json({ user: added, token });
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials Provided' });
      };
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

module.exports = router;