const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generate-token.js');

const Users = require('./auth-model.js');

//register endpoint
router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 11);
  user.password = hash; //hashes the password in user object

//Using user model insert the user
  Users.add(user)
    .then(added => {
      const token = generateToken(added); //
      res.status(201).json({ user: added, token }); //returns saved user and token
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
      //if theres a match, bcrypt compares the password in the body vs the hashed one in the server
      if (user && bcrypt.compareSync(password, user.password)) {
        //there's a match! now let's generate a token
        const token = generateToken(user); //pass the user in to sign the token with user id
        //respond to the request with a json body that includes the token
        res.status(200).json({ user, token });
      } else {
        //if username and password don't match any records
        res.status(401).json({ message: 'Invalid Credentials Provided' });
      };
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

module.exports = router;