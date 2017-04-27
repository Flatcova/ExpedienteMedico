var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var pacienteSchema = Schema({
	informacion: {
	        nombre : String,
          edad : Number,
          cumpleanos : {type:Date, unique:true},
	        correo : {type:String, unique: true},
          domicilio : String,
          telefono : {type:Number, unique:true},
          celular : {type:Number, unique:true},
          civil : String,
          trabajo: String,
          domicilio_trabajo :  String,
          telefono_trabajo : Number,
          nombre_esposo : String,
          edad_esposo: Number,
          trabajo_esposo: String,
          telefono_esposo: {type:Number, unique:true},
          recomendado: String,
	},
  consultas: [{
		consulta: { type: Schema.Types.ObjectId, ref: 'Consulta' },
	}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Paciente', pacienteSchema);
