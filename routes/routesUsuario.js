const controllersUsuario = require('../controllers/controllersUsuario')
const controllersLivro = require('../controllers/controllersLivro')

const express = require('express')
const router = express.Router()

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

/**METAS GLOBAIS**/

router.get('/', isLoggedIn, controllersUsuario.listarMetas)
router.get('/meta/:id/detalhes', isLoggedIn, controllersUsuario.mostrarPaginaDetalhesMeta)

router.get('/meta', isLoggedIn, controllersUsuario.mostrarPaginaDeCadastroDeMetas)
router.post('/meta', isLoggedIn, controllersUsuario.salvarDadosDaMeta)

router.get('/meta/:id', isLoggedIn, controllersUsuario.mostrarPaginaDeEdicaoDeMetas)
router.patch('/meta/:id', isLoggedIn, controllersUsuario.atualizarDadosDaMeta)
router.delete('/meta/:id', isLoggedIn, controllersUsuario.deletarMeta)

router.get('/meta/:id/atualizar', isLoggedIn, controllersUsuario.atualizarMetaDeLivros)
router.post('/meta/:id/atualizar', isLoggedIn, controllersUsuario.atualizarQtdDeLivrosLidos)

/**LIVROS**/
router.get('/livro', isLoggedIn, controllersLivro.listarLivros)
router.get('/livro/:id/detalhes', isLoggedIn, controllersLivro.mostrarPaginaDetalhesLivro)

router.get('/livro/cadastrar', isLoggedIn, controllersLivro.mostrarPaginaDeCadastroDeLivros)
router.post('/livro/cadastrar', isLoggedIn, controllersLivro.salvarDadosDeLivro)

router.get('/livro/:id', isLoggedIn, controllersLivro.mostrarPaginaDeEdicaoDeLivro)
router.patch('/livro/:id', isLoggedIn, controllersLivro.atualizarDadosDeLivro)
router.delete('/livro/:id', isLoggedIn, controllersLivro.deletarLivro)

router.get('/livro/:id/atualizar', isLoggedIn, controllersLivro.mostrarPaginaDeAtualizarLeitura)
router.post('/livro/:id/atualizar', isLoggedIn, controllersLivro.atualizarNumeroDePaginasLidas)

router.get('/logout', isLoggedIn, controllersUsuario.logout)


module.exports = router;