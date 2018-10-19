var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var ConsultaSchema = Schema({
	diagnostico: {
          paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
          date: { type: Date, default: Date.now },
	        Consulta: String
	}
},{
    usePushEach: true
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Consulta', ConsultaSchema);
