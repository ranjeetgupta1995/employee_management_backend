const express = require("express");
const { EmployeeModel } = require("../model/employee.model");


const employeeRouter = express.Router()


employeeRouter.post("/addemployee", async(req, res) => {
    try{
        const newEmployee = new EmployeeModel(req.body)
        await newEmployee.save()
        res.status(200).send({"msg": "new employee has been added", "newEmployee": newEmployee})
    }catch(err){
        res.status(400).send({"error": err})
    }
})

employeeRouter.get("/", async(req, res) => {
    try{
        const allEmployee = await EmployeeModel.find();
        res.status(200).send({allEmployee})
    }catch(err){
        res.status(400).send({"error": err})
    }
})


module.exports = {
    employeeRouter
}