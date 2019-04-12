//importar o modulo do express
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// rotas da aplicação usando o midle

// routes.get('/teste',(req, res) =>{
//   return res.send("Hello World");
// });
routes.post("/boxes", BoxController.store);

routes.get("/boxes/:id", BoxController.show);
//pegar o arquivo pelo multer,um po vez(single) do campo file
routes.post(
  "/boxes/:id/files",//usar o id da box como url
  multer(multerConfig).single('file'),FileController.store);

//exportando a rota
module.exports = routes;
