const Box = require('../models/Box');

class BoxController{
  async store(req,res){
    //criar uma BOX
    const box = await Box.create({title: req.body.title});//req.body.title o copor do json

    return res.json(box);
  }

  //retornar os arquivos da box
  async show(req, res){
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options:{sort:{createAt: -1}}
    });

    return res.json(box);
  }
}

module.exports = new BoxController();