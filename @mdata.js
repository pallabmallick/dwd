//import mongoose from 'mongoose';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true, useUnifiedTopology: true});
const conn= mongoose.connection;
const {Schema}= mongoose;
const employeeSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    eamil: String,
    etype: String,
    hourlyrate: Number,
    totalhour: Number,
    total:Number,
   
  });

  employeeSchema.methods.totalsalary= function (){
      return this.hourlyrate*this.totalhour;

  }

  const EmployeeModel = mongoose.model('Employee', employeeSchema);
  const employee = new EmployeeModel({name:'Pallab Kumar',
  eamil:'pallab@gmail.com',
  etype:'hourly',
  hourlyrate:10,
  totalhour:16,

});



employee.total=employee.totalsalary();

//employee.totalsalary();

//console.log("Total Income of Emploee :"+ employee.hourlyrate*employee.totalhour);
conn.on("connected", function(){
    console.log("success");
});
conn.on("disconnected", function(){
    console.log("Disconnected Success");
});

conn.on('error',console.error.bind(console,'connection error:'));
conn.once('open',function(){
    employee.save(function(err,res){
        if(err) throw error;
        console.log(res);
        conn.close();
    });
});