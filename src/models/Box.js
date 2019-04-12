//definindo as configurações do banco
const mongoose = require('mongoose');

//criado as 'tabelas ->schema'
const Box = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  files:[{type: mongoose.Schema.Types.ObjectId, ref:"files"}]//criando um relacionamento do ID FIles
}, {
  timestamps:true  //criar data do registro
});

module.exports = mongoose.model("Box",Box);