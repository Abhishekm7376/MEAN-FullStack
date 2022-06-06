const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');


const Employee = mongoose.model('Employee');

//get data
module.exports.empProfile = (req, res, next) =>{
    Employee.find(
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, token:req.token, users : user });
        }
    );
}

//create new data
module.exports.createProfile = (req,res,next) =>{
    var emp = new Employee();
    emp.name = req.body.name;
    emp.position = req.body.position;
    emp.office = req.body.office;
    emp.salary = req.body.salary;
    emp.save((err,data)=>{
        if(!err){
            res.send(data);
        }
        else{
            if(err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}


//edit data
module.exports.editProfile = (req,res,next)=>{
    console.log('update');
    console.log(req.params.id);

    var emp = {
        name: req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new:true},  (err,doc)=>{
        if(!err){
            console.log('updating data');
            res.status(200).send(doc);
            console.log('updated');
        }else{
            console.log('Error in updating data : ' + err.stack);
        }
    });

}

//delete data
module.exports.deleteProfile = (req,res, next) =>{
    Employee.findByIdAndRemove(req.params.id, (err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log('Error in deleting data : ' + err.stack);
        }
    })
}