const controllersUsuario = require('../controllers/controllersUsuario')
const express = require('express')
const router = express.Router()
const passport = require("passport");

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

router.get('/login', controllersUsuario.mostrarPaginaDeLogin)
router.post('/login', passport.authenticate("local", {successRedirect: `/`, failureRedirect: "/login"}));

router.get('/register', controllersUsuario.mostrarPaginaDeCadastro)
router.post('/register', controllersUsuario.salvarDadosDeCadastro)

router.get('/', isLoggedIn, controllersUsuario.listarMetas)
router.get('/meta/:id/detalhes', isLoggedIn, controllersUsuario.mostrarPaginaDetalhesMeta)

router.get('/meta', isLoggedIn, controllersUsuario.mostrarPaginaDeCadastroDeMetas)
router.post('/meta', isLoggedIn, controllersUsuario.salvarDadosDaMeta)

router.get('/meta/:id', isLoggedIn, controllersUsuario.mostrarPaginaDeEdicaoDeMetas)
router.patch('/meta/:id', isLoggedIn, controllersUsuario.atualizarDadosDaMeta)
router.delete('/meta/:id', isLoggedIn, controllersUsuario.deletarMeta)

router.get('/meta/:id/atualizar', isLoggedIn, controllersUsuario.atualizarMetaDeLivros)
router.post('/meta/:id/atualizar', isLoggedIn, controllersUsuario.atualizarQtdDeLivrosLidos)


router.get('/logout', isLoggedIn, controllersUsuario.logout)


module.exports = router;