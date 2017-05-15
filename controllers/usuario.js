var Doctor = require('./../models/doctor');
var Assistant = require('./../models/assistant');

exports.createUser = async (req, res) => {
  let newDoc = new Doctor();
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
  try {
    let doctor = await newDoc.save();
    let assitent = await agregarAssistant(doctor, req);
    doctor.asistentes.push({ asistente: assitent._id });
    await doctor.save();
    req.logIn(doctor, function(err){
      if (err) return next(err);
      res.redirect('/');
    });
  } catch (e) {
    console.error('[ERROR]');
    console.log(e);
    req.flash('errors', 'El correo ya ha sido utilizado, intenta otro diferente.');
    return res.redirect('/signup');
  }
}


let agregarAssistant = async (doctor, req) => {
  let newAssis = new Assistant();
  newAssis.profile.doctor = doctor._id;
  newAssis.profile.nombre = req.body.name_assis;
  newAssis.profile.correo = req.body.email_assis;
  newAssis.profile.contrasena = newAssis.generateHash(req.body.password_assis);
  return await newAssis.save();
}
