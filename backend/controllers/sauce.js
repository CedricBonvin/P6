const Sauce = require("../models/sauce")
const fs = require('fs');
const { exception } = require("console");
const { json } = require("body-parser");                        // tout les require avec {} c'est pas moi qui les ai fait,, Mongoose le fait tout seuls ?
const { get } = require("../routes/user");
const { deleteOne } = require("../models/sauce");


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);         // pourquoi on doit parser la requeste ? pourtant on l'a déjà parser avec bodyParser qui se trouve dans app.js!
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  // C'est la que j'enregistre le fichier dans images ?  Ca veut dire que le dossier image se trouve sur localhost:3000 ? Donc tout nos fichiers en tout cas ceux du bakend se trouve sur localhost:3000 ?
    });
    sauce.save()                                                // la sauce que je sauvegarde est la sauce créer avec new Sauce, mais comment il sait ou la sauvegarder ? .save va de paire avec new ?
        .then(() => res.status(201).json({ message: "sauce bien enregistré...!" }))
        .catch(error => res.status(400).json({ message: "non non non" }))
}

exports.displaySauce = (req, res, next) => {
    Sauce.find()                                                // tout est OK !!
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.oneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauces => res.status(201).json(sauces))
        .catch(error => res.status(401).json({ error }))
}


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`)                     // si je met seulement unlink elle attend un callback, et à ce moment je passe deleteOne dans le callback
            Sauce.deleteOne(sauce)
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
            
        })
        .catch(error => res.status(500).json({ error }));
}


exports.upLoadSauce = (req, res, next) => {
    let newSauce = {};
    req.file ? (
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }),
        newSauce = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
    : (
        newSauce = { ...req.body }
    )
    Sauce.updateOne(
        { _id: req.params.id },   // updateOne prend 2 paramètre => le premier est la sauce cible à uploader => le 2eme est ce qu'on veut uploader, mais pourquoi on met à jour le _id ?
        { ...newSauce, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch((error) => res.status(400).json({ error }))
}


exports.like = (req, res, next) => {                                   
                                                                     // ici je doit encore étudier tout ca !!!!!
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

        if (req.body.like === 1) {
            Sauce.updateOne(
                { _id: req.params.id },                                                     // Pourquoi je pas mettre sauce à la place de req.....
                { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 }, }
            )
            .then(() => res.status(200).json({ message: "Vous avez aimez cette sauce...!"}))
            .catch((error) => res.status(400).json({ error }))
        }

        if (req.body.like === -1) {
            Sauce.updateOne(
                { _id: req.params.id },
                { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 }, }
            )
            .then(() => res.status(200).json({ message: "Vous n'avez pas aimez cette sauce...!"}))
            .catch((error) => res.status(400).json({ error }))
        }

        if (req.body.like === 0) {
            const indexLike = sauce.usersLiked.indexOf(req.body.userId);
            if (indexLike > -1) {
                //sauce.usersLiked.slice(indexLike, 1);                                                             // Ca sert à rien !!!!
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersLiked: { $each: [], $slice: indexLike } }, $inc: { likes: -1 }, }               // $each   $slice ???????
                )
                .then(() => res.status(200).json({ message: "Vous avez annulez votre j'aime...!" }))
                .catch((error) => res.status(400).json({ error }))
            }
            else if (indexLike === -1) {
                const indDisliked = sauce.usersDisliked.indexOf(req.body.userId);
               // sauce.usersDisliked.slice(indDisliked, 1);                                                          // ca sert à rien
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersDisliked: { $each: [], $slice: indDisliked } }, $inc: { dislikes: -1 }, }
                )
                .then(() => res.status(200).json({ message: "Vous avez annuler votre j'aime pas..!" }))
                .catch((error) => res.status(400).json({ error }))
            }
        }
    })
}

///////////////////// Esaie ///////////////

