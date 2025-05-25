import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]        
        
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
        
        const user = await User.findById({_id: decoded.id})
        
        if(!user) { 
            res.status(401).json({
                success: false,
                message: 'unauthorized token'
            })
        }

        const newUser = {name: user.name, id: user._id }

        req.user = newUser

        next()

    } catch (error) {
        return res.status(500).json({success: false, message: "Please log in"})
    }
} 

export default middleware