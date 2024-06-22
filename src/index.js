require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('../db/dbConnection');
const routes = require('../routes/auth.routes');
const server = express();

// middlewares
server.use(
  cors({
    origin: 'http://localhost:3000',
    Credential: true,
  })
);

server.use(cookieParser()); //to support cookies 
server.use(express.json()); //to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support url-encoded bodies

server.use('/', routes);
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  db();
});
