var express = require('express');
var multer  = require('multer');
var path = require('path');
//var mongoose = require('mongoose');
var empmodel = require('../database/dbcon');
var imgmodel =require('../modules/upload');
var router = express.Router();
//var employee= empmodel.find({});
const employess= empmodel.find({});
const imagedata= imgmodel.find({});


router.use(express.static(__dirname+"./public/"));
/* GET home page. */
router.get('/', function(req, res, next) {
  employess.exec(function(err,data){

    if (err) throw err;
    res.render('index', { title: 'Employee Records', records:data, success:'' });

  });

});

router.post('/', function(req,res,next){
  var empinsert= new empmodel({
    name:req.body.name,
    eamil: req.body.email,
    etype: req.body.etype,
    hourlyrate:req.body.rate,
    totalhour:req.body.thour,
    total:parseInt(req.body.rate) * parseInt(req.body.thour),
  });
  //console.log(empinsert);
  empinsert.save();

  employess.exec(function(err,data){
    if(err) throw err;
    res.render('index',{title: 'Employee Records', records:data, success:'Data Inserted Successfully!'})
  });

});
router.post('/search/', function(req, res, next) {
  var fltrname=req.body.name;
  var fltemail=req.body.email;
  
  if(fltrname !='' && fltemail!=''){
  var filterparamet={$and:[{name:fltrname},{eamil:fltemail}]}
  }else if(fltrname !='' && fltemail==''){
    var filterparamet={$and:[{name:fltrname}]}
  }else if(fltrname =='' && fltemail!=''){
    var filterparamet={$and:[{email:fltrname}]}
  }else{
    var filterparamet={}
  }
  const empfilter= empmodel.find(filterparamet);
  empfilter.exec(function(err,data){

    if (err) throw err;
    res.render('index', { title: 'Employee Records', records:data });

  });

});
router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var del = empmodel.findByIdAndDelete(id);
  del.exec(function(err){

    if (err) throw err;
    //res.redirect('/');
    employess.exec(function(err,data){
      if(err) throw err;
      res.render('index',{title: 'Employee Records', records:data, success:'Delete Successfully!'})
    });

  });

});
router.get('/edit/:id', function(req, res, next) {
  var id=req.params.id;
  var edit= empmodel.findById(id);
  edit.exec(function(err,data){

    if (err) throw err;
    res.render('edit', { title: 'Edit Employee Records', records:data });

  });

});
router.post('/update/', function(req, res, next) {
  //var id=req.params.id;
  var update= empmodel.findByIdAndUpdate(req.body.id,{
    name:req.body.name,
    eamil: req.body.email,
    etype: req.body.etype,
    hourlyrate:req.body.rate,
    totalhour:req.body.thour,
    total:parseInt(req.body.rate) * parseInt(req.body.thour),
  });
 
  update.exec(function(err,data){

    if (err) throw err;
    res.redirect('/');

  //   employess.exec(function(err,data){
  //     if(err) throw err;
  //     res.render('index',{title: 'Employee Records', records:data, success:'Record Update Successfully!'})
  //   });
  
   });

  });

  /* Image file upload. */
var storage= multer.diskStorage({
  destination:"./public/uploads",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});
  var upload = multer({
    storage:storage
  }).single('image');


  /*   */
  router.post('/upload',upload, function(req, res, next) {
    var imgname = req.file.fieldname;
    var success=req.file.filename +"Upload Success";

    var imgdetails = new imgmodel({
      imagename:imgname,
    });

    imgdetails.save(function(err,doc){
      if (err) throw err;
      imagedata.exec(function(err,data){
        if(err) throw err;
        res.render('upload_file', { title: 'Upload Records',records:data, success:success });
      });
      
    });
 
   

  });

router.get('/upload', function(req, res, next) {
  imgdetails.save(function(err,doc){
    if (err) throw err;
 
    res.render('upload_file', { title: 'Upload Records',records:data, success:'' });

  });
});


module.exports = router;
