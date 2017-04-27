var express = require('express');
var router = express.Router();
var Doctor = require('../../models/doctor');
var Pacientes = require('../../models/paciente');
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
    Pacientes.findById(req.params.id, function(err, paciente){
      if (err) next(err);
      console.log(paciente);
      return res.render('main/doctor/paciente', {
        Paciente: paciente,
        })
    });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

module.exports = router;
