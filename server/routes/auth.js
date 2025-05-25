import express, { json } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', async (req, res) => {

    try {

        const { email, password} = req.body
        const user = await User.findOne({email})
        
        if(!user) {
            return res.status(401).json({success: false, message: 'user doesn\'t exist'})
        }

        const checkPassword = bcrypt.compare(password, user.password)

        if(!checkPassword) {
            return res.status(401).json({success: false, message:'wrong details'})
        } 


        const token = jwt.sign({id: user._id}, 'secret-key', {expiresIn: '2h'})

        return res.status(200).json({success: true, message: "Login successful", token, user: {name: user.name}})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Erro in log in"})
        
    }

})
router.post('/signup', async (req, res) => {

    try {

        const { name, email, password} = req.body
        const user = await User.findOne({email})
        
        if(user) {
            return res.status(401).json({success: false, message: 'user already exist'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User ({
            name, email, password: hashedPassword
        })

        await newUser.save()

        return res.status(200).json({success: true, message: "Account Created Successfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in adding users"})
        
    }

})

export default router