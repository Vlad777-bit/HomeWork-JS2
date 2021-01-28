const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('.'))

app.get('/goods', (req, res) => {
    fs.readFile('./src/data/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            console.log('ok')
            res.send(data)
        } else {
            console.log('no')
            res.send(JSON.stringify({}))
        }
    })
})

app.post('/goods', (req, res) => {
    const item = req.body
    fs.readFile('./src/data/catalog.json', 'utf-8', (err, data) => {
        const catalogItems = JSON.parse(data)
        catalogItems.push(item)
        fs.watchFile('./src/data/catalog.json', JSON.stringify(catalogItems), err => {
            if (!err) {
                res.json({ res: true })
            } else {
                res.json({ res: false, err })
            }
        })
    })
})

app.listen(3000, () => console.log('Port 3000 is open'))