import express, { json } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/login', async (req, res) => {

    try {

        const { email, password} = req.body
        const user = await User.findOne({email})
        
        if(!user) {
            return res.status(401).json({success: false, message: 'user doesn\'t exist'})
        }

        const checkPassword =  await bcrypt.compare(password, user.password)

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
        
                const verificationToken = Math.floor(10000 + Math.random() * 90000).toString()
        
                const transporter = nodemailer.createTransport({
                    service: process.env.SERVICE,
                    host: process.env.HOST,
                    port: process.env.PORT,
                    secure: true,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASSWORD
                    },
                      tls: {
                         rejectUnauthorized: false // 👈 THIS fixes the self-signed certificate issue
                    }
              
                })

                try {
                    await transporter.sendMail({
                        from: process.env.USER,
                        to: email,
                        subject: 'Verify Your Account!',
                        html: `
                            <h2 style='color: white;'>Verification Token</h2>
            
                            <p>${verificationToken}</p>
                            `
                    })


                    console.log('Email successfully sent')
                } catch (error) {
                    console.log(error)
                }
        

        const newUser = new User ({
            name,
            email, 
            password: hashedPassword, 
            verificationToken: verificationToken, 
            verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000
        })

        await newUser.save()

        return res.status(200).json({success: true, message: "Account Created Successfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in adding users"})
        
    }

})

router.get('/verify', middleware, async (req, res) => {
     try {
      return res.status(200).json({success: true, user: req.user})
     }

     catch (error) {
        res.status(500).json({success: false, user: req.user})
     }
})

router.post('/verify-email', async (req, res) => {
    const { code } = req.body;

    const token = await User.findOne({ verificationToken: code})

    if(!token) {
        return res.status(401).json({success: false, message: 'Invalid token'})
    }

    await User.save()
})

export default router