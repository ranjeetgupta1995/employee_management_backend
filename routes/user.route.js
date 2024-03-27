const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist.model");

const userRouter = express.Router()


userRouter.post("/register", async(req, res) => {
    const {email, password, confirm_password} = req.body;
    const newEmail = await UserModel.findOne({email})
    if(newEmail){
        return res.send("User already exist, please login")
    }
    if(password != confirm_password){
        return res.send("Password does not match with confirm password")
    }
    try{
        bcrypt.hash(password, 8, async(err, hash) => {
            if(err){
                res.status(200).send({"msg": "password has not been hashed."})
            }else{
                const newUser = new UserModel({
                    email,
                    password: hash,
                })
                await newUser.save()
                res.status(200).send({"msg": "new user has been registered.", "newUser": newUser})
            }
        });
    } catch(err){
        res.status(400).send({"error": err})
    }
})

userRouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.status(200).send({"msg": "Please login again!"})
                }else{
                    const token = jwt.sign({ name: user.name, userId: user._id }, "masai");
                    res.status(200).send({"msg": "Login Successful!", "token": token})
                }
            });
        }else{
            res.status(200).send({"msg": "This user does not exists!"})
        }
    }catch(err){
        res.status(400).send({"error": err})
    }
})

userRouter.get("/logout", async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try{
        const newToken = new BlacklistModel(token)
        await newToken.save()
        res.status(400).send({"msg": "user has been logout!"})
    }catch(err){
        res.status(400).send({"error": err})
    }
})


module.exports = {
    userRouter
}