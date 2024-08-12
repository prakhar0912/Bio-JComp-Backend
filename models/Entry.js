const mongoose = require('mongoose')

const EntrySchema = mongoose.Schema({
    Sector: {
        type: String,
        required: true
    },
    SID: {
        type: String,
        required: true
    },
    Physical_Hostname: {
        type: String,
        required: true
    },
    SAP_System_Type: {
        type: String,
        required: false
    },
    OS: {
        type: String,
        required: false
    },
    DB: {
        type: String,
        required: false
    },
    Threads: {
        type: Number,
        required: false
    },
    Cores: {
        type: Number,
        required: false
    },
    Sockets: {
        type: Number,
        required: false
    },
    CPUs: {
        type: Number,
        required: false
    },
    Main_RAM: {
        type: String,
        required: false
    },
    Swap_RAM: {
        type: String,
        required: false
    },
    Total_RAM: {
        type: String,
        required: false
    },
    Instances: {
        type: String,
        required: false
    },
    Local_Storage: {
        type: Number,
        required: false
    },
    Kernel_Version: {
        type: String,
        required: false
    },
    Patch_Number: {
        type: Number,
        required: false
    },
})


module.exports = mongoose.model('entry', EntrySchema)