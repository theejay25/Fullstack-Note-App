import express from 'express'
import Note from '../models/note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()

router.post('/add', middleware , async (req, res) => {
    try {

        const { title, description} = req.body

        const newNote = new Note ({
            title, description, userId: req.user.id
        })

        await newNote.save()

        return res.status(200).json({success: true, message: "Note added Successfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in adding notes"})
        
    }


})

router.get('/', middleware , async (req, res) => {
    try {
        const notes =  await Note.find({ userId: req.user.id })
        return res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'error note fetching', error
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
    const updateNotes =  await Note.findByIdAndUpdate(id, req.body)
    return res.status(200).json({
        success: true,
        updateNotes
    })
}   catch (error) {
    return res.status(500).json({
        success:false,
        message:'error updating fetching', error
    })
}
})

router.delete('/:id', async (req, res) => {
        try {
        const {id} = req.params;
    const deletedNotes =  await Note.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        deletedNotes
    })
}   catch (error) {
    return res.status(500).json({
        success:false,
        message:'error deleting fetching', error
    })
}
})


export default router