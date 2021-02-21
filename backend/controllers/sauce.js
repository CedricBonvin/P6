const Sauce = require("../models/sauce")

exports.createSauce = (req,res,next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    // enregistrement de l'article dans la base de données
    sauce.save()
    .then(() => res.status(201).json({ message : "sauce bien enregistré...!"}))
    .catch(error => res.status(400).json({message : "non non non"}))
};


exports.displaySauce = (req , res , next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}

// exports.callAllThings = (req, res, next) => {
//     thing.find()
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({error}));
// }