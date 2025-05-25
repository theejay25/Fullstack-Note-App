import jwt from 'jsonwebtoken'
import User from '../models/user'

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]        
        
        if(!token) {
            res.status(401).json({
                success: false,
                message: 'unauthorized'
            })
        }
        
        const decoded = jwt.verify(token, 'secret-key');
        
        if(!decoded){
            res.status(401).json({
                success: false,
                message: 'unauthorized token'
            })
        }
        
        const user = User.findById({_id: decoded.id})
        
        if(!user) { 
            res.status(401).json({
                success: false,
                message: 'unauthorized token'
            })
        }

        const newUser = {anme: user.name }

        req.user = newUser

        next()

    } catch (error) {
        
    }
} 