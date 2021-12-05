const express = require('express')
const session = require('express-session')

const path = require('path')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const app = express()
app.use(
    session(
    {
        secret: '56879876567890876567898765789012364512534SAUHAIUHSIUH213551092UWICONF31128403GHIFJN13498', 
        resave: false, 
        saveUninitialized: false
    }
));

const bodyparser = require('body-parser')
app.use(express.urlencoded({extended: true}))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(cookieparser())

mongoose.connect("mongodb://localhost:27017/dbTrabalho", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Conexão estabelecida com o banco!');})
    .catch(err => {console.log("Erro ao conectar com o banco:" + err);
});

// const rotasVisitante = require('./routes/routesVisitante')
// app.use(rotasVisitante)

const rotasUsuario = require('./routes/routesUsuario')
app.use(rotasUsuario)

app.get('*', (req, res) => 
{
    res.statusCode = 404;
    res.write("<p> 404 Not Found </p>");
    res.write('<p>Clique <a href="/"> aqui </a> para voltar a pagina inicial');
    res.end();
});

app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000!");
});
