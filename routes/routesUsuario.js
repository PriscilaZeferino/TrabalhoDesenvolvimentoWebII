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

router.get('/', isLoggedIn, controllersUsuario.listarMetas)

router.get('/login', controllersUsuario.mostrarPaginaDeLogin)
router.post('/login', passport.authenticate("local", {successRedirect: `/`, failureRedirect: "/login"}));

router.get('/register', controllersUsuario.mostrarPaginaDeCadastro)
router.post('/register', controllersUsuario.salvarDadosDeCadastro)

router.get('/meta/cadastrar', isLoggedIn, controllersUsuario.mostrarPaginaDeCadastroDeMetas)
router.post('/meta/cadastrar', isLoggedIn, controllersUsuario.salvarDadosDaMeta)

router.get('/meta/:id/editar', isLoggedIn, controllersUsuario.mostrarPaginaDeEdicaoDeMetas)
router.put('/meta/:id/editar', isLoggedIn, controllersUsuario.atualizarDadosDaMeta)

router.get('/meta/atualizar', isLoggedIn, controllersUsuario.atualizarMeta)

router.delete('/meta/deletar', isLoggedIn, controllersUsuario.deletarMeta)

router.get('/meta/detalhes', isLoggedIn, controllersUsuario.mostrarPaginaDetalhesMeta)

router.get('/logout', isLoggedIn, controllersUsuario.logout)


module.exports = router;