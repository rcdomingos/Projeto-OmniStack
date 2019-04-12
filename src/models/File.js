//definindo as configurações do banco
const mongoose = require('mongoose');

//criado as 'tabelas ->schema'
const File = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  path:{
    type:String,
    required:true,
  }
}, 
{
  timestamps:true, //criar data do registro
  toObject:{virtuals:true},//permitir gerar o caminho virtual
  toJSON:{virtuals:true}
});

//campo virtual
File.virtual('url').get(function(){
  const url = process.env.URL || 'http://localhost:3333'

  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("files",File);