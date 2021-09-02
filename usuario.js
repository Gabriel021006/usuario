const mongoose = require ("mongoose");

const usuariosModel = new mongoose.Schema({

name:String,
email:String,
password:String,
status:String

});

module.exports = usuariosModel;
