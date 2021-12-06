const express = require('express')
const session = require('express-session')

const path = require('path')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const User = require('./models/user');

const flash = require("connect-flash");

const app = express()
app.use(
    session(
    {
        secret: '56879876567890876567898765789012364512534SAUHAIUHSIUH213551092UWICONF31128403GHIFJN13498', 
        resave: false, 
        saveUninitialized: false
    }
));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const bodyparser = require('body-parser')
app.use(express.urlencoded({extended: true}))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(cookieparser())

app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // aplicando o connect-flash na sua aplicacao.

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost:27017/dbTrabWebII", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Conexão estabelecida com o banco!');})
    .catch(err => {console.log("Erro ao conectar com o banco:" + err);
});

const rotasUsuario = require('./routes/routesUsuario')
app.use(rotasUsuario)

app.get('*', (req, res) => 
{
    res.statusCode = 404;
    res.render('notFound', {tituloPagina: '404 NOT FOUND'});
});

app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000!");
});
