var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userCtrl = require('../Controllers/users');

router.post('/signup', userCtrl.signup);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Add a new user 
router.post('/', async(req,res) =>{
  res.json(await mongoose.model('User').create(req.body));
});
module.exports = router;
