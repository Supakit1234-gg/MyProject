const express = require('express')
const router = express.Router()
const Member = require('../models/members')

router.get('/', async (req, res) => {
    try {
        const members = await Member.find()
        res.render("members/index", { members })
    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', async (req, res) => {
    const title = "Edit Member";
    try {
        const edit_id = req.body.id
        const member = await Member.findById(edit_id)
        res.render('members/edit', { member: member, title: title })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

router.post('/update', async (req, res) => {
    try {
        const id = req.body.id
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }
        await Member.findByIdAndUpdate(id, data)
        res.redirect('/members')
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

router.get("/delete/:id", async (req, res) => {
    try {

        await Member.findByIdAndDelete(req.params.id)

        res.redirect('/members')

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

module.exports = router