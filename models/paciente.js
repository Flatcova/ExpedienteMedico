var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var pacienteSchema = Schema({
	informacion: {
					nombres : String,
					apellidos: String,
	        nombre_completo : String,
          edad : Number,
          cumpleanos : Date,
	        correo : {type:String},
          domicilio : String,
          telefono : Number,
          celular : Number,
          civil : String,
          trabajo: String,
          domicilio_trabajo :  String,
          telefono_trabajo : Number,
          nombre_esposo : String,
          edad_esposo: Number,
          trabajo_esposo: String,
          telefono_esposo: Number,
          recomendado: String,
	},
	citas:[{
	}],
	antecedentes:[{
	}],
  consultas: [{
		consulta: { type: Schema.Types.ObjectId, ref: 'Consulta' },
	}]
},{
    usePushEach: true
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Paciente', pacienteSchema);
