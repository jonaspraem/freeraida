var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET message */
router.get('/message', function(req, res, next) {
    User.findOne({}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        res.render('node', {email: doc.email});
    });
});

router.post('/message', function(req, res, next) {
  var email = req.body.email;
  var user = new User({
      firstName: 'Max',
      lastName: 'Schwarz',
      password: 'super-secret',
      email: email
  });
  user.save();
  res.redirect('/message');
});

module.exports = router;
