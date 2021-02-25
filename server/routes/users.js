var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/user', isAuthorized, (req, res, next) => {
  User.findOne({userName: req.body.userName}, function(err, user) {
    if(user) {
      return res.json(user);
    } else {
      var user = new User({userName: req.body.userName});
      user.save(function() {return res.json(user)});
    }
  })
})

router.post('/addTopic', isAuthorized, (req, res, next) => {
  User.findOne({userName: req.body.userName}, function(err, user) {
    user.topic.push([req.body.topic, req.body.score, req.body.output]);
    user.markModified('topic');
    user.save(function() {return res.json(user)});
    return;
  })
})

function isAuthorized(req, res, next) {
  if(req.headers.authorization.split(' ')[1] === 'MY_TOKEN'){ // Auth Token must be in the .env file;
    next();
  }
  else return res.status(401).json({ message: 'Unauthorized Request!!!' });
};

module.exports = router;
