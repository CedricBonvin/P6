   
                                                    /// application de base 

require("dotenv").config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const posteSauceRoute = require("./routes/sauce");
const path = require('path');
const helmet = require('helmet');



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.oq0a7.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 
const app = express();

app.use(helmet());

app.use((req, res, next) => {                               // c'est quoi exactement les headers, comment sa fonctionne ? 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json())                  // je parse le body de la requête, donc j'obtient un objet javaScript ? 

app.use('/images', express.static(path.join(__dirname, 'images'))); // bon ca c'est encore un gros mystère !!! 
app.use("/api",userRoutes);
app.use("/api",posteSauceRoute);

module.exports = app;