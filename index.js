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

//Récupération des personnages
app.get('/people', (req, res) => {
    axios.get('https://swapi.dev/api/people/').then((response) => {
        console.log(response.data)
        let result = response.data;  
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

//Récupération des détails des personnages
app.get(`/detail/:id`, (req, res) => {
    let id = req.params.id
    axios.get(`https://swapi.dev/api/people/${id}`).then((response) => {
        //response.data = données des personnages
        let result = response.data;  
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

//Récupération des films
app.get(`/films/`, (req, res) => {
    let id = req.params.id
    axios.get(`https://swapi.dev/api/films/`).then((response) => {
        let result = response.data;  
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

//Récupération des véhicules
app.get(`/vehicles/`, (req, res) => {
    let id = req.params.id
    axios.get(`https://swapi.dev/api/vehicles/`).then((response) => {
        let result = response.data;  
        console.log(result)
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

//Récupération des espèces
app.get(`/species/`, (req, res) => {
    let id = req.params.id
    axios.get(`https://swapi.dev/api/species/`).then((response) => {
        let result = response.data;  
        console.log(result)
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

//Récupération des vaisseaux
app.get(`/starships/`, (req, res) => {
    let id = req.params.id
    axios.get(`https://swapi.dev/api/starships/`).then((response) => {
        let result = response.data;  
        console.log(result)
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
   
})

const PORT = process.env.PORT || 4200
app.listen(PORT, () => {
    console.log(`Le serveur est connecté sur le port ${PORT}`)
})