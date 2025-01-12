const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://necel64401:HYXcvcGSIt3Fr4ac@foggy.1hks0.mongodb.net/Notes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.on('connected', () => {
    console.log('database is connected...!!!')
})


// email: necel64401@pariag.com
//password: MongoDB@#@007

// user
// necel64401
// password
// HYXcvcGSIt3Fr4ac


// mongodb+srv://necel64401:HYXcvcGSIt3Fr4ac@foggy.1hks0.mongodb.net/?retryWrites=true&w=majority&appName=Foggy