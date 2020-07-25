const express = require('express');
const app = express()
const axios = require("axios");


//Debug CORS Policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
         "Access-Control-Allow-Methods",
         "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.get('/', (req, res) => {
    res.send('Hello SWAPI')
})

app.get('/people', (req, res) => {
    axios.get('https://swapi.dev/api/people/').then((response) => {
        console.log(response.data)
        let result = response.data;  
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

app.get(`/detail/:id`, (req, res) => {
    console.log('ID' + req.params.id)
    let id = req.params.id
    axios.get(`https://swapi.dev/api/people/${id}`).then((response) => {
        console.log(response.data)
        let result = response.data;  
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

const PORT = process.env.PORT || 4200
app.listen(PORT, () => {
    console.log(`Le serveur est connecté sur le port ${PORT}`)
})