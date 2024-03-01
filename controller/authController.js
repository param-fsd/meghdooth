const authController = require('express').Router()
const User1 = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User1.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Try with a different email")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User1.create({...req.body, password: hashedPassword})

        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})

        return res.status(201).json({user: others, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error) 
    }
})

authController.post('/login', async (req, res) => {
    try {
        const user = await User1.findOne({email: req.body.email})
        if(!user){
            throw new Error("Invalid credentials")
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("Invalid credentials")
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})        

        return res.status(200).json({user: others, token})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error) 
    }
})

module.exports = authController