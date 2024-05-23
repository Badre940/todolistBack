//Require bcrypt
const bcrypt = require('bcrypt');

//Require dataMapper
const dataMapper = require('../datamaper/datamaper');

//Require userControllers.js
const user = require ('../controllers/UserControllers');

//Params of bcrypt
const saltRounds = 10;
const myPlaintextPassword =  'blabla' ;

// Test bcrypt Hash password
const hashPassword = {
  hashPassword : (req, res) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {

    const hashingPassword = bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {

      console.log(hashingPassword);
      res.json(hashingPassword)
      // Store hash in our db
  });
})
}
}

module.exports = hashPassword;

