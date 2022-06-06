const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var employeeSchema = new mongoose.Schema({
    name : {
        type: String
    },
    position : {
        type:String
    },
    office: {
        type : String
    },
    salary: {
        type: Number
    }
});





mongoose.model('Employee', employeeSchema);