var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');
var Doctor = require('../../models/doctor');
var Paciente = require('../../models/paciente');
var algoliasearch =require('algoliasearch');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    Doctor
    .findById({ _id : req.user.profile.doctor })
    .populate('pacientes.paciente')
    .exec(function(err, Pacientes){
      if (err) next(err);
      return res.render('main/assistant/index',{
        Pacientes: Pacientes.pacientes,
        Consultas: Pacientes.pacientes.consultas,
        moment : moment,
        Dia : moment().locale('es').format("L"),
        err: req.flash('err')
      });
    });
  }else {
    return res.redirect('/');
  }
});

router.post('/cita', function(req, res, next){
  Doctor
  .findById({ _id : req.user.profile.doctor })
  .populate('pacientes.paciente')
  .exec(function(err, Doc){

    for (var i = 0; i < Doc.pacientes.length; i++) {
      for (var j = 0; j < Doc.pacientes[i].paciente.citas.length; j++) {
        if(Doc.pacientes[i].paciente.citas[j].hora === req.body.hora_cita || Doc.pacientes[i].paciente.citas[j].paciente === req.body.paciente){
          return res.redirect('/assistant');
        }
      }
    }

    Paciente.findById(req.body.paciente , function(err, paciente){
      if (err) next(err);
      paciente.citas.push({
        paciente: req.body.paciente,
        fecha: req.body.dia_cita,
        hora: req.body.hora_cita
      });
      console.log(paciente.citas);

      paciente.save(function(err){
        if (err) return next(err);
        return res.redirect('/assistant');
      });
    });
  });
});

router.post('/:id', function(req, res, next){
  Doctor
  .findById({ _id : req.user.profile.doctor })
  .populate('pacientes.paciente')
  .exec(function(err, Doc){

    Paciente.findById(req.params.id , function(err, paciente){
      if (err) next(err);

      Doc.citados.push({
        paciente: paciente.citas[req.body.posicion].paciente,
        fecha: paciente.citas[req.body.posicion].fecha
      });

      Doc.save(function(err){
        if (err) next(err);
      });

      paciente.citas.splice(req.body.posicion, 1);

      paciente.save(function(err){
        if (err) return next(err);
        return res.redirect('/assistant');
      });
    });
  });
});

router.post('/', function(req, res, next){
  async.waterfall([
    function(callback){
      var newPaciente = new Paciente();

      newPaciente.informacion.nombres = req.body.name_wife;
      newPaciente.informacion.apellidos = req.body.apellido_wife;
      newPaciente.informacion.nombre_completo = req.body.name_wife+' '+req.body.apellido_wife;
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

      Paciente.findOne({'informacion.nombre_completo' : {$eq: req.body.name_wife+' '+req.body.apellido_wife},  }, function(err, existePaciente){
        if(existePaciente){
          req.flash('err', 'El paciente con este nombre ya esta registrado, verifique los datos.');
          return res.redirect('/assistant');
        }else{
          newPaciente.save(function(err, paciente){
            var client = algoliasearch('MEZ3TXMHN8', '944234e3bead982ceb2ab534d5a4cfa5');
            var index = client.initIndex('test_ExpedienteMed');
            console.log('paciente registro: ', paciente);
            let pacienteToAlgolia = JSON.parse(JSON.stringify(paciente));
            pacienteToAlgolia['_tags'] = `doctor_${req.user.profile.doctor}`;
            console.log(pacienteToAlgolia);
             index.addObjects([
              pacienteToAlgolia
            ], function(err, content) {
              console.log(content);
            });

            if (err) next (err);
            callback(null, paciente);
          });
        }
      });
    },
    function (paciente){
      Doctor.findById(req.user.profile.doctor, function(err, doctor){
        console.log("este es doctor: ", doctor);
        if (err) next(err);
        console.log("esete es paciente: ", paciente);
        console.log(doctor.pacientes.length);
        let count = (doctor.pacientes.length - 1);
        doctor.pacientes.push({paciente: paciente._id})
        doctor.save(function(err){
          if (err) return next(err);
          return res.redirect('/assistant');
        })
      });
    }

  ]);
});

module.exports = router;
