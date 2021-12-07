const controllersAuthentication = require('../controllers/controllersAuthentication')

const passport = require("passport")
const express = require('express')
const router = express.Router()

router.get('/login', controllersAuthentication.mostrarPaginaDeLogin)
router.post('/login', passport.authenticate("local", {successRedirect: `/`, failureRedirect: "/login", failureFlash: 'Invalid username or password'}));

router.get('/register', controllersAuthentication.mostrarPaginaDeCadastro)
router.post('/register', controllersAuthentication.salvarDadosDeCadastro)

module.exports = router;