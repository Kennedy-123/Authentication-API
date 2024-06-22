const mongoose = require('mongoose')
require('dotenv/config')

const connection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('connected')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connection