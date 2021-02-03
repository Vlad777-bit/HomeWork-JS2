const express = require('express')
const fs = require('fs')

const app = express()

// app.post('/basket', (req, res) => {
//     fs.readFile('./server/data/basket.json', 'utf-8', (err, data) => {
//         if (!err) {
//             res.send(data)
//         }
//     })
// })

app.get('/catalog', (req, res) => {
    fs.readFile('./server/data/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

app.listen(3000, () => console.log('Server is ready on port 3000'))