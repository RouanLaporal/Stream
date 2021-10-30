var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userCtrl = require('../Controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Add a new user 
router.post('/', async(req,res) =>{
  res.json(await mongoose.model('User').create(req.body));
});

//GET one user with is id
router.get('/:id', async(req,res,next) =>{
  res.json(await mongoose.model('User').findById(req.params.id, {password: 0 }));
});

//Update a user
router.put('/:id', async(req,res)=> {
  res.json(await mongoose.model('User').findByIdAndUpdate(req.params.id,req.body));
});
module.exports = router;
