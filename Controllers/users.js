const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            username: req.body.username,
            password: hash
        });
        user.save()
        .then( () => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch( () => res.status(400).json({ error: 'l\'utilisateur n\'a pas pu être crée' }));
    })
    .catch(error => res.status(500).json({ error }));
};