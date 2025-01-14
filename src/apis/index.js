const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Notes = require('../schema/notes')

router.post('/login', async (req, res) => {

    const { key } = req.body

    try {

        if (key === process.env.LOGIN_KEY) {
            res.status(200).json({
                api_key: process.env.API_KEY,
                status: true,
                message: "Successfully Logged in",
                session: 24 * 60
            })
        }

        res.status(204).json({
            message: "No Content",
            status: false
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }


})

router.post('/create_note', check_api_key, async (req, res) => {

    try {

        const newNote = await Notes.create({ name: req.body.name, note: "<p>Please Start note here....</p>" })

        return res.status(200).json({ message: "Successfully Created Note", status: true, data: newNote })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }

    // create and return the flag
})

router.get('/all_notes', check_api_key, async (req, res) => {

    try {

        const notes = await Notes.find().select('_id name')
        return res.status(200).json({
            data: notes,
            status: true
        })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }
    // returns the _id and name
})

router.post('/get_note_by_id', check_api_key, async (req, res) => {

    try {

        const objectId = new mongoose.Types.ObjectId(req.body.id);

        const note = await Notes.findById(objectId)

        if (note) {
            res.status(200).json({
                data: note,
                status: true
            })
        }
        else {
            res.status(204).json({ message: "Note is not found", status: false })
        }

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }


    // return the note
})

router.post('/update_note', check_api_key, async (req, res) => {

    const { note, id } = req.body

    // Convert the string id to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    try {

        const updateNote = await Notes.findByIdAndUpdate(objectId, { $set: { note } }, { new: true })

        if (!updateNote) {
            res.status(400).json({ message: "Something went wrong", status: false })
        }

        res.status(200).json({ message: "Updated Note Successfully", status: true })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }

    // update and return the flag
})

router.post('/update_note_title', check_api_key, async (req, res) => {

    const { name, id } = req.body

    // Convert the string id to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    try {

        const updateNote = await Notes.findByIdAndUpdate(objectId, { $set: { name } }, { new: true })

        if (!updateNote) {
            res.status(400).json({ message: "Something went wrong", status: false })
        }

        res.status(200).json({ message: "Updated Title Successfully", status: true })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }

})

router.post('/delete_note', check_api_key, async (req, res) => {

    try {
        const objectId = new mongoose.Types.ObjectId(req.body.id);
        const notes = await Notes.findByIdAndDelete(objectId)
        res.status(200).json({ message: "Note Deleted successfully", status: true })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "An Error Occured", status: false })
    }

    // delete and return the flag
})

function check_api_key(req, res, next) {
    try {

        if (req.headers['api_key'] === process.env.API_KEY) {
            next()
        }
        else {
            res.status(403).json({
                message: "Forbidden",
                status: false
            })
        }
    }
    catch (err) {
        console.log('err', err)
        res.status(503).json({
            message: "error",
            status: false
        })
    }


}

module.exports = router