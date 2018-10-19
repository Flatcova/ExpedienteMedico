const express = require('express');
const moment = require('moment');
const router = express.Router();
const async = require('async');
const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(
  'MEZ3TXMHN8',
  '944234e3bead982ceb2ab534d5a4cfa5'
);
const Doctor = require('../../models/doctor');
const Pacientes = require('../../models/paciente');
const Consultas = require('../../models/consulta');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    Doctor
      .findById({ _id : req.user._id })
      .populate('pacientes.paciente')
      .populate('citados.paciente')
      .populate('asistentes.asistente')
      .exec(function(err, Pacientes){
        console.log(Pacientes);
        // console.log(Pacientes.asistentes[0].asistente.profile.nombre)
        if (err) next(err);
        return res.render('main/doctor/index', {
          Pacientes: Pacientes.citados,
          Asistentes: Pacientes.asistentes[0],
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

router.get('/getToken', async (req, res) => {
  var public_key = await algolia.generateSecuredApiKey(
                      '89b9a2a470865ef255679c64161dcb34',
                      {filters: `_tags:doctor_${req.query.id}`}
                  );
  res.json({'token':public_key});
});

router.post('/confirm', function(req, res, next){
  Doctor.findById(req.user.id , function(err, paciente){
    if (err) next(err);
    console.log(req.body.posicion);
    paciente.citados.splice(req.body.posicion, 1);
    console.log(paciente.citados);

    paciente.save(function(err){
      if (err) return next(err);
      return res.redirect('/doctor/'+req.body.id_paciente);
    });
  });
});

router.put('/', function(req, res, next){
  Doctor
    .findById({ _id : req.user._id })
    .populate('pacientes.paciente')
    .populate('asistentes.asistente')
    .exec(function(err, Doc){
      if (err) next(err);

      var consultorio = req.body.nombre_consultorio;
      var especi = req.body.especialidad;
      var prof = req.body.cedula_prof;
      var esp = req.body.cedula_esp;
      var univ = req.body.universidad;
      var domi = req.body.domicilio;
      var tel = req.body.telefono;

      Doc.paciente.nombre_consultorio= consultorio || Doc.paciente.nombre_consultorio;
      Doc.paciente.especialidad= especi || Doc.paciente.especialidad;
      Doc.paciente.cedula_prof= prof || Doc.paciente.cedula_prof;
      Doc.paciente.cedula_esp= esp || Doc.paciente.cedula_esp;
      Doc.paciente.universidad= univ || Doc.paciente.universidad;
      Doc.paciente.domicilio= domi || Doc.paciente.domicilio;
      Doc.paciente.telefono= tel || Doc.paciente.telefono;

      Doc.save(function(err){
        if (err) next (err);
        return res.redirect('/doctor');
      });
    });
});

router.get('/:id', function(req, res, next){
  if (req.user && req.user.profile.doc === true){
    Pacientes
      .findById(req.params.id)
      .populate('consultas.consulta')
      .exec(function(err, Consulta){
        console.log(Consulta);
        console.log(Consulta.consultas);
        if (err) next(err);
        return res.render('main/doctor/paciente', {
          Paciente: Consulta,
          moment: moment,
          // if (Consulta.consultas != null || '') {
              Consultas: Consulta.consultas,
          // }
          err: req.flash('err')
          });
        });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

router.get('/:id/antecedentes', function(req, res, next){
  if (req.user && req.user.profile.doc === true){
    Pacientes
      .findById(req.params.id)
      .populate('consultas.consulta')
      .exec(function(err, Consulta){
        if (err) next(err);

        console.log(Consulta.antecedentes.length);

        if (Consulta.antecedentes.length === 0) {
          return res.render('main/doctor/antecedentes', {
            Paciente: Consulta,
            moment: moment,
            Consultas: Consulta.consultas,
            err: req.flash('err')
            });
        }else{
          return res.render('main/doctor/antecedentes_done', {
            Paciente: Consulta,
            ahf: Consulta.antecedentes[0].ahf,
            ago: Consulta.antecedentes[0].ago,
            app: Consulta.antecedentes[0].app,
            moment: moment,
            Consultas: Consulta.consultas,
            err: req.flash('err')
            });
        }
    });
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

router.post('/:id/antecedentes', function(req, res, next){
  Pacientes.findById(req.params.id, function(err, paciente){
    console.log(paciente.antecedentes);
    paciente.antecedentes.push({
      ahf:{
        historial_familiar: req.body.historia_familiar
      },
      ago:{
        Menarquia: req.body.Menarquia,
        Ritmo: req.body.Ritmo,
        ivsa: req.body.ivsa,
        Gestas: req.body.Gestas,
        Partos: req.body.Partos,
        Cesarias: req.body.Cesarias,
        Abortos: req.body.Abortos,
        fuc: req.body.fuc,
        Peso_Hijos: req.body.Peso_Hijos,
        ppf: req.body.ppf,
        fum: req.body.fum,
        Dismenorrea:req.body.Dismenorrea,
        Dispareunia:req.body.Dispareunia,
        Sangrado_Postcoito: req.body.Sangrado_Postcoito,
        Dismenorrea_si:req.body.Dismenorrea_si,
        Dispareunias_si:req.body.Dispareunias_si,
        Sangrado_si:req.body.Sangrado_si,
        cod:req.body.cod,
        Mamografia:req.body.Mamografia,
        Tipo_Sangre:req.body.Tipo_Sangre,
        Micciones:req.body.Micciones,
        Nicturia:req.body.Nicturia,
        Urgencia:req.body.Urgencia,
        Inc_Urgencias:req.body.Inc_Urgencias,
        Micciones_si:req.body.Micciones_si,
        Nicturia_si:req.body.Nicturia_si,
        Urgencia_si:req.body.Urgencia_si,
        Inc_Urgencias_si:req.body.Inc_Urgencias_si,
        Tenesmo:req.body.Tenesmo,
        iue:req.body.iue,
        Disuria:req.body.Disuria,
        Tenesmo_si:req.body.Tenesmo_si,
        IUE_si:req.body.IUE_si,
        Disuria_si:req.body.Disuria_si
      },
      app:{
        Ante_patologicos:req.body.Ante_patologicos
      }
    });
    paciente.save(function(err){
      if (err) return next(err);
      return res.redirect('/doctor/'+req.params.id);
    });

  });
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
      newConsulta.diagnostico.Consulta = req.body.Consulta;

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
