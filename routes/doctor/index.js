var express = require('express');
var moment = require('moment');
var router = express.Router();
var async = require('async');
var Doctor = require('../../models/doctor');
var Pacientes = require('../../models/paciente');
var Consultas = require('../../models/consulta');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    Doctor
      .findById({ _id : req.user._id })
      .populate('pacientes.paciente')
      .populate('asistentes.asistente')
      .exec(function(err, Pacientes){
        console.log(Pacientes);
        console.log(Pacientes.asistentes[0].asistente.profile.nombre)
        if (err) next(err);
        return res.render('main/doctor/index', {
          Pacientes: Pacientes.pacientes,
          Asistentes: Pacientes.asistentes[0],
          err: req.flash('err')
          });
        });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

router.get('/:id', function(req, res, next){
  if (req.user && req.user.profile.doc === true){
    Pacientes
      .findById(req.params.id)
      .populate('consultas.consulta')
      .exec(function(err, Consulta){
        console.log(Consulta.consultas[0]);
        if (err) next(err);
        return res.render('main/doctor/paciente', {
          Paciente: Consulta,
          moment: moment,
          Consultas: Consulta.consultas,
          err: req.flash('err')
          });
        });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

router.get('/:id/nueva_consulta', function(req, res, next){
  if (req.user && req.user.profile.doc === true){


      Pacientes.
        findById(req.params.id)
        .populate('consultas.consulta')
        .exec(function(err, Resultado){
          console.log("paciente: "+Resultado);
          console.log("consutlas: "+Resultado.consultas);
          if (err) next(err);
          return res.render('main/doctor/consulta', {
            Paciente: Resultado,
            Consultas: Resultado.consultas,
            moment: moment,
            err: req.flash('err')
            });
          });

  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

router.post('/:id/nueva_consulta', function(req, res, next){
  async.waterfall([
    function(callback){
      var newConsulta = new Consultas();
      console.log(req.params.id);
      newConsulta.diagnostico.paciente = req.params.id;
      newConsulta.diagnostico.rfc = req.body.rfc;
      newConsulta.diagnostico.rfc2 = req.body.rfc2;

      Consultas.findOne({}, function(err){
          newConsulta.save(function(err, consulta){
            console.log(consulta);
            if (err) next (err);
            callback(null, consulta);
        });
      });
    },
    function (consulta){
      Pacientes.findById(req.params.id, function(err, paciente){
          if (err) next(err);
          console.log(paciente);
          paciente.consultas.push({
      			consulta: consulta._id
      		});
          paciente.save(function(err){
            if (err) return next(err);
            return res.redirect('/doctor/'+req.params.id);
          })
      });
    }

  ]);
});
router.get('/:id/:id', function(req, res, next){
  if (req.user && req.user.profile.doc === true){
    Consultas.findById(req.params.id, function(err, consulta){
      Pacientes.
        findById(consulta.diagnostico.paciente)
        .populate('consultas.consulta')
        .exec(function(err, Resultado){
          console.log("consulta: "+consulta);
          console.log("paciente: "+Resultado);
          console.log("consutlas: "+Resultado.consultas);
          if (err) next(err);
          return res.render('main/doctor/consulta_anterior', {
            Paciente: Resultado,
            Consultas: Resultado.consultas,
            Consulta: consulta,
            moment: moment,
            err: req.flash('err')
            });
          });
    });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

module.exports = router;
