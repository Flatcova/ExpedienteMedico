var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var assistantSchema = Schema({
	profile: {
          doctor      : { type: Schema.Types.ObjectId, ref: 'Doctor' },
	        nombre 	     : String,
	        correo        : {type:String, unique: true},
	        contrasena     : String,
					doc : {type:Boolean, default: false},
				}
},{
    usePushEach: true
});

// methods ======================
// generating a hash
assistantSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
assistantSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.profile.contrasena);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Assistant', assistantSchema);
