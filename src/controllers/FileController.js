const Box = require('../models/Box');
const File = require('../models/File');

//criar um arquivo
class FileController{
  async store(req,res){
    const box = await Box.findById(req.params.id);

    //criar o registro no banco
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();//aguardar o retorno do banco
  
    //retornar ao usuasrio que o arquivo foi criado
    req.io.sockets.in(box_id).emit('file', file);

    return res.json(file);//retornar o arquivo criado para aplicação

    //console.log(req.file);
    // return res.send('OK');
  }
}

module.exports = new FileController();