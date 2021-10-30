const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
/**
 * Use to add a new user to the database
 * @param {Object} req request send by the user with his username and his password in JSon
 * @param {any} res response send to the user
 */
exports.signup = (req, res) => {
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
/**
 * Find a user in the database and compare the password
 * @param {Object} req request send by the user with his username and his password in JSon
 * @param {*} res 
 */
exports.login = (req,res)=>{
    User.findOne({ username: req.body.username })
    .then(user =>{
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid){
                return res.status(401).json({error: "Mot de passe incorrect" });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch( error => res.status(500).json({ error }));
};