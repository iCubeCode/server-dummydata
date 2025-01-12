const express = require('express')
const cors = require('cors')
const app = express()
require('./src/db/index')
const Notes = require('./src/schema/notes')
require('dotenv').config()

const { users } = require('./Users')
const { Products } = require('./Products')
const { MyntraData } = require('./myntra-products')
const AppRouter = require('./src/apis/index')

app.use(cors())
app.use(express.json())
app.use('/icubecode', express.static('images'))
app.use('/api', AppRouter)


app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iCube Code</title>
    <link rel="icon"
        href="https://yt3.ggpht.com/Lzgn9oBnTHw6_GVO3wTLY4EgKS4gwG2JkF8zIpglmctjpSkRIzyMKxqAzXq0bEYQHuTGwOCSbA=s176-c-k-c0x00ffffff-no-rj">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .center {
            background: #181e2a;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fefefe;
        }

        .container {
            width: 400px;
        }

        .header {
            display: flex;
            justify-content: center;
        }

        .header img {
            width: 200px;
        }

        .content {
            text-align: center;
        }

        .content h2 {
            font-size: 38px;
        }

        .content h3 {
            font-size: 30px;
            margin: 10px;
        }

        .content table {
            width: 100%;
            border-collapse: collapse;
        }

        .content table tbody tr td {
            color: #fefefe;
            font-size: 20px;
            border: 1px solid #fefefe;
            padding: 10px;
        }

        .content table tbody tr td a {
            color: #fefefe;
        }

        .content p {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%);
            font-size: 24px;
        }

        .content p a {
            color: #fefefe;
        }
    </style>
</head>

<body>

    <div class="center">
        <div class="container">
            <div class="header">
                <img
                    src="https://yt3.ggpht.com/Lzgn9oBnTHw6_GVO3wTLY4EgKS4gwG2JkF8zIpglmctjpSkRIzyMKxqAzXq0bEYQHuTGwOCSbA=s176-c-k-c0x00ffffff-no-rj" />
            </div>
            <div class="content">
                <h2>iCube Code</h2>
                <h3>APIs</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Users Data</td>
                            <td><a href="/users">Click Here</a></td>
                        </tr>
                        <tr>
                            <td>Myntra Products</td>
                            <td><a href="/myntra-products">Click Here</a></td>
                        </tr>
                    </tbody>
                </table>

                <p>Go To Channel <a href="https://www.youtube.com/channel/UCKndiB_Rxg_7622N6zIHtYA"
                        target="_blank">iCube Code</a></p>
            </div>
        </div>
    </div>

</body>

</html>
        `)
})

app.get('/end', (req, res) => {
    res.send(process.env)
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

app.get('/products', (req, res) => {

    let values = Products.filter((item) => {
        let id = req.query['id'] !== undefined ?
            item.id.toString().includes(req.query['id'])
            : true

        let type = req.query['type'] !== undefined ?
            item.type.toLowerCase().includes(req.query['type'].toLowerCase())
            : true

        return id && type

    })

    res.json(values)

})

app.get('/users/:id', (req, res) => {

    const { id } = req.params

    res.json(users.filter(item => item.id === Number.parseInt(id)))

})

app.get('/products/:id', (req, res) => {

    const { id } = req.params

    res.json(Products.filter(item => item.id === Number.parseInt(id)))

})

app.get('/myntra-products', (req, res) => {

    res.json(MyntraData)

})

app.listen(8000, () => {
    console.log('server is runing')
})