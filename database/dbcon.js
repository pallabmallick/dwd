//import mongoose from 'mongoose';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true, useUnifiedTopology: true});
//const conn= mongoose.connect;
const {Schema}= mongoose;
const employeeSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    eamil: String,
    etype: String,
    hourlyrate: Number,
    totalhour: Number,
    total:Number,
   
  });

  const EmployeeModel = mongoose.model('Employee', employeeSchema);
  module.exports=EmployeeModel;