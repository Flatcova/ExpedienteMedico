var express = require('express');
var router = express.Router();
var async = require('async');
var Doctor = require('../../models/doctor');
var Assistant = require('../../models/assistant');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    res.render('main/register/signup', {
      errors: req.flash('errors')
    });
  }
});

router.post('/', function(req, res, next){
	async.waterfall([
		function(callback){
			var newDoc = new Doctor();

			// set the user's local credentials
			newDoc.profile.nombre = req.body.name;
			newDoc.profile.correo  = req.body.email;
			newDoc.profile.contrasena = newDoc.generateHash(req.body.password);
      newDoc.profile.nombre_consultorio = req.body.nombre_consultorio;
      newDoc.profile.especialidad = req.body.especialidad;
      newDoc.profile.cedula_prof = req.body.cedula_prof;
      newDoc.profile.cedula_esp = req.body.cedula_esp;
      newDoc.profile.universidad = req.body.universidad;
      newDoc.profile.domicilio = req.body.domicilio;
      newDoc.profile.telefono = req.body.telefono;

			Doctor.findOne({ 'profile.correo' : req.body.email }, function(err, existingUser){
				if (existingUser) {
					req.flash('errors', 'El correo ya ha sido utilizado, intenta otro diferente.');
					return res.redirect('/signup');
				}else{
					// save the user
					newDoc.save(function(err, doctor) {
				    	if (err) next(err);
              callback(null, doctor);
          })
				}
			});
		},
    function(doctor){
			var newAssis = new Assistant();
			newAssis.profile.doctor = doctor._id;
      newAssis.profile.nombre = req.body.name_assis;
      newAssis.profile.correo = req.body.email_assis;
      newAssis.profile.contrasena = newAssis.generateHash(req.body.password_assis);

			newAssis.save(function(err, assistant){
        console.log("Asistente : "+assistant);
        console.log("Doctor : "+doctor);
				if (err) return next(err);
				req.logIn(doctor, function(err){
					if (err) return next(err);
					res.redirect('/');
				});
			});
		}
	]);
});

module.exports = router;
