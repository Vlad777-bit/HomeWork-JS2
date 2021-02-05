const express = require('express');
const fs = require('fs');

const write = require('./utils/writer');
const Basket = require('./services/basket_service');

const app = express();
app.use(express.json());


app.get('/catalog', (req, res) => {
    fs.readFile('./server/data/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

app.get('/basket', (req, res) => {
    fs.readFile('./server/data/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

app.post('/basket', (req, res) => {
    fs.readFile('./server/data/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = Basket.add(JSON.parse(data), req.body);
            write('./server/data/basket.json', newCart)
            .then(status => {
                if (status) {
                    res.json({ status });
                } else {
                    res.sendStatus(500);
                }
            })
        }
    })
})

app.put('/basket/:id', (req, res) => { 
    fs.readFile('./server/data/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = Basket.change(JSON.parse(data), req.params.id, req.body.amount);
            write('./server/data/basket.json', newCart)
            .then(status => {
                if (status) {
                    res.json({ status });
                } else {
                    res.sendStatus(500);
                }
            })
        }
    })
})

app.delete('/basket/:id', (req, res) => {
    fs.readFile('./server/data/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = Basket.delete(JSON.parse(data), req.params.id);
            write('./server/data/basket.json', newCart)
            .then(status => {
                if (status) {
                    res.json({ status });
                } else {
                    res.sendStatus(500);
                }
            })
        }
    })
})

app.listen(3000, () => { console.log('Listen 3000...') });



