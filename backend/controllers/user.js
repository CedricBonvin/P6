const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const CryptoJS = require("crypto-js");
require("dotenv").config()


exports.signup = (req, res, next) => {
    const emailCrypt = CryptoJS.HmacSHA256(JSON.stringify(req.body.email), `${process.env.EMAIL_KEY}`).toString();
    
    bcrypt.hash(req.body.password, 10)  
    .then(hash => {
        const user = new User({
        email:  emailCrypt, 
        password: hash
      });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ message : "l'utilisateur n'a pas pu être crée !"}));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const emailCrypt = CryptoJS.HmacSHA256(JSON.stringify(req.body.email), `${process.env.EMAIL_KEY}`).toString();
    // var originalText = decrypts.toString(CryptoJS.enc.Utf8);
    // const decrypts =CryptoJS.AES.decrypt(bytes, 'secret key 123');
    User.findOne({email : emailCrypt})   
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({                                            // Bon alors la c'est encore très flou 
                userId: user._id,
                token: jwt.sign(    
                    { userId: user._id },
                    `${process.env.VERIF_TOKEN}`,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ message : "mot de passe incorrect...!" }));
    })
    .catch(error => res.status(500).json({ message : "utilisateur non trouvé...!"}));
};

