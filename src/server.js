const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server); //trabalhar com protocol websocket

//requisão do frontend
io.on('connection',socket => {
  socket.on('connectRoom', box => { //isolar cada usuario
    socket.join(box);
  })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-rxplo.mongodb.net/omnistack?retryWrites=true',
{
  useNewUrlParser:true
}
);

app.use((req, res, next) => {
  req.oi = io;
  return next(); //precessar e retornar o processameneto
});

// carrega os arquivos de configurações
app.use(express.json());
//enviar arquivos para aplicação
app.use(express.urlencoded({ extended: true}));

app.use('/files',express.static(path.resolve(__dirname,'..','tmp'))); //redirecionamento do files para pasta tmp

//carregar os carquivos de rota
app.use(require('./routes'));


// porta do servidor
server.listen(3333);