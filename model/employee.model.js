const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    department: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    }
}, {
    versionKey: false
})

const EmployeeModel = mongoose.model('employee', employeeSchema);

module.exports = {
    EmployeeModel
}