var express = require('express');
var router = express.Router();
var async = require('async');
var Doctor = require('../../models/doctor');
var Paciente = require('../../models/paciente');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    Doctor
      .findById({ _id : req.user.profile.doctor })
      .populate('pacientes.paciente')
      .exec(function(err, Pacientes){
        // for (var i = 0; i < Pacientes.pacientes.length; i++) {
        //   for (var j = 0; j < Pacientes.pacientes[i].paciente.consultas.length; j++) {
        //     console.log(Date.now("dd/mm/yyyy"));
        //     if (Pacientes.pacientes[i].paciente.consultas[j].dia === Date.now(dd/mm/yyyy)){
        //       console.log(
        //         'nombre:' + Pacientes.pacientes[i].informacion.nombre)
        //       console.log(
        //         'dia:' + Pacientes.pacientes[i].paciente.consultas[j].dia)
        //     }
        //   }
        // }
        if (err) next(err);
        return res.render('main/assistant/index',{
          Pacientes: Pacientes.pacientes,
          Consultas: Pacientes.pacientes.consultas,
          err: req.flash('err')
          });
        });
  }else {
    return res.redirect('/');
  }
});

router.post('/cita', function(req, res, next){
  Paciente.findById(req.body.paciente , function(err, paciente){
    if (err) next(err);

    paciente.consultas.push({
      dia: req.body.dia_cita,
      hora: req.body.hora_cita
    });
    console.log(paciente.consultas);

    paciente.save(function(err){
      if (err) return next(err);
      return res.redirect('/assistant');
    });
  });
});

router.post('/', function(req, res, next){
  async.waterfall([
    function(callback){
      var newPaciente = new Paciente();

      newPaciente.informacion.nombre = req.body.name_wife;
      newPaciente.informacion.edad = req.body.edad_wife;
      newPaciente.informacion.cumpleanos = req.body.birth;
      newPaciente.informacion.correo = req.body.email;
      newPaciente.informacion.domicilio = req.body.place;
      newPaciente.informacion.telefono = req.body.telefono;
      newPaciente.informacion.celular = req.body.cellular;
      newPaciente.informacion.civil = req.body.civil;
      newPaciente.informacion.trabajo= req.body.work;
      newPaciente.informacion.domicilio_trabajo = req.body.workplace;
      newPaciente.informacion.telefono_trabajo = req.body.work_phone;
      newPaciente.informacion.nombre_esposo = req.body.name_men;
      newPaciente.informacion.edad_esposo = req.body.edad_men;
      newPaciente.informacion.trabajo_esposo = req.body.men_work;
      newPaciente.informacion.telefono_esposo = req.body.men_phone;
      newPaciente.informacion.recomendado = req.body.recomendation;

      Paciente.findOne({'informacion.nombre' : req.body.name_wife }, function(err, existePaciente){
        if(existePaciente){
          req.flash('err', 'El paciente con este nombre ya esta registrado, verifique los datos.');
          return res.redirect('/assistant');
        }else{
          newPaciente.save(function(err, paciente){
            if (err) next (err);
            callback(null, paciente);
          });
        }
      });
    },
    function (paciente){
      Doctor.findById(req.user.profile.doctor, function(err, doctor){
          if (err) next(err);
          console.log(paciente);
          doctor.pacientes.push({
      			paciente: paciente._id
      		});
          doctor.save(function(err){
            if (err) return next(err);
            return res.redirect('/assistant');
          })
      });
    }

  ]);
});

module.exports = router;
