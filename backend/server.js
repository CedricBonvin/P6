
require("dotenv").config()
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || process.env.APP_PORT);
const server = http.createServer(app);

server.listen(process.env.PORT || process.env.APP_PORT);