var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var doctorSchema = Schema({
	profile: {
	        nombre 	     : String,
	        correo        : {type:String, unique: true},
	        contrasena     : String,
					nombre_consultorio : String,
					especialidad : String,
					cedula_prof	:	{type:Number, unique: true},
					cedula_esp	:	{type:Number, unique: true},
					universidad : String,
					domicilio : String,
					telefono : {type:Number, unique:true},
					doc : {type:Boolean, default: true},
	}
});

// methods ======================
// generating a hash
doctorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
doctorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.profile.contrasena);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Doctor', doctorSchema);
