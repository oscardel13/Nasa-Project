const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const path = require('path');

const api = require('./routes/api');
const { config, passport, checkLoggedIn } = require("./services/secruity");


const app = express();

app.use(helmet());

app.use(cookieSession({
    name:'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2 ]
}))
app.use(passport.initialize());

app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan("combined"));

app.use(express.json());

app.use('/v1',api)

app.get('/', (req,res)=>{
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (isLoggedIn) return res.redirect('/dashboard')
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

app.use(express.static(path.join(__dirname, ".." , 'public')));

// this allows spa routing 
app.get('/*', checkLoggedIn , (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});  

module.exports = app;