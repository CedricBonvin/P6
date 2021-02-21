const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const posteSauceRoute = require("./routes/sauce");
const path = require('path');


mongoose.connect('mongodb+srv://cedricbonvin:allo@cluster0.oq0a7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json())


// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue putain de merde !' }); 
// });
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use("/api",userRoutes);
app.use("/api",posteSauceRoute);

module.exports = app;