const multer = require('multer');//manipular os arquivos
const path = require('path');//pegar o caminho 
const crypto = require('crypto');//gerar numero unicos

module.exports = {
  dest: path.resolve(__dirname,'..','..','tmp'),
  storage: multer.diskStorage({
    destination:(req,file, cb) =>{
      cb(null,path.resolve(__dirname,'..','..','tmp'));
    },
    filename:(req,file,cb) =>{
      crypto.randomBytes(16,(err,hash) =>{
        if(err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null,file.key);
      });
    }
  })
}