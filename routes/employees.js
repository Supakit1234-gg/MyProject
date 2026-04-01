const express = require('express')
const router = express.Router()
const Employee = require('../models/employees')

router.get('/', async (req, res) => {

    try {
        const employee = await Employee.find()
        res.render('employees/index', { employee })
    } catch (err) {
        console.log(err)
    }
})

router.get('/add', (req,res)=>{
    res.render('employees/add' ,{
        employees: {}
    })
})

router.post('/add', async (req, res) => {
    try {
        const data = new Employee({
            name: req.body.name,
            gender: req.body.gender,
            position: req.body.position,
            phone: req.body.phone,
            email: req.body.email,
            salary: req.body.salary,
            startdate: req.body.startdate
        })

        await data.save()

        res.redirect('/employees')

    } catch (err) {
        console.log(err)
    }
})

router.get('/edit/:id', async (req, res) => {
    const title = "Edit Employee";   
    try {
        const employee = await Employee.findById(req.params.id)
        res.render('employees/edit', { employee, title })

    } catch (err) {
        console.log(err)
    }
})

router.post('/update', async (req, res) => {

    try {
        const id = req.body.id

        const data = {
            name: req.body.name,
            gender: req.body.gender,
            position: req.body.position,
            phone: req.body.phone,
            email: req.body.email,
            salary: req.body.salary
        }

        await Employee.findByIdAndUpdate(id, data)
        res.redirect('/employees')

    } catch (err) {
        console.log(err)
    }
})

router.get('/delete/:id', async (req, res) => {

    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.redirect('/employees')

    } catch (err) {
        console.log(err)
    }
})

module.exports = router