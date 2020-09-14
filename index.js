if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express()
const axios = require("axios");
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')

const initializePassport = require('./passport')

const users = [{id : Date.now().toString(), username : "admin", password : "caribou"}]
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

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


//Test réponse passport.js
app.get('/', (req, res) => {
    res.send('PASSPORT OK')
})

app.get('/validate', (req, res) => {
    res.send('PASSPORT NOT OK')
})

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '',
        failureFlash: true
}))
    
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