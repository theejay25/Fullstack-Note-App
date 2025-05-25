import express from 'express'
import Note from '../models/note'

const router = express.Router()

router.post('/add', async () => {
    try {

        const { title, description} = req.body

        const newNote = new Note ({
            title, description,
        })

        await newNote.save()

        return res.status(200).json({success: true, message: "Account Created Successfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in adding users"})
        
    }


})

export default router