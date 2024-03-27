const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.route');
const { employeeRouter } = require('./routes/employee.route');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Home page!")
});

//for users
app.use('/users', userRouter);

// to get or add employees
app.use('/employees', employeeRouter);

app.listen(process.env.port, async() => {
    try{
        await connection;
        console.log(`Server is running at port ${process.env.port}`)
        console.log("Server is connected to DB")
    } catch(err){
        console.log(err)
    }
})
