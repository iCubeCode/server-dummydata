const express = require('express')
const cors = require('cors')
const app = express()

const { users } = require('./Users')

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("<div style='text-align:center'><h1>iCube Code</h1></div>")
})

app.get('/users', (req, res) => {

    let values = users.filter((item) => {

        let id = req.query['id'] !== undefined ?
            item.id.toString().includes(req.query['id'])
            : true

        let username = req.query['username'] !== undefined ?
            item.username.includes(req.query['username'])
            : true


        let email = req.query['email'] !== undefined ?
            item.email.includes(req.query['email'])
            : true

        let phoneNumber = req.query['phoneNumber'] !== undefined ?
            item.phoneNumber.includes(req.query['phoneNumber'])
            : true

        return username && email && id && phoneNumber

    })

    res.json(values)

})

app.get('/users/:id', (req, res) => {

    const { id } = req.params

    res.json(users.filter(item => item.id === Number.parseInt(id)))

})

app.listen(8000, () => {
    console.log('server is runing')
})