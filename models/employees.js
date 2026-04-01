const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["ชาย", "หญิง"]
    },

    position: {
        enum: ["employee", "manager"],
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String, required: true, unique: true 
    },

    salary: {
        type: Number
    },

    startdate: {
        type: Date
    },

    role: {
        type: String,
        enum: ["employee", "manager"],
        default: "employee" // employee หรือ manager
    },

    status: {
        type: String,
        default: "active"
    }
})

module.exports = mongoose.model('Employee', employeeSchema)