const controllersUsuario = require('../controllers/controllersUsuario')

const express = require('express')
const router = express.Router();

router.get('/', controllersUsuario.acessarHome)

/*AUTENTICACAO */

router.get('/login', controllersUsuario.mostrarPaginaDeLogin)
router.post('/login', controllersUsuario.enviarDadosDeLogin)

router.get('/register', controllersUsuario.mostrarPaginaDeCadastro)
router.post('/register', controllersUsuario.salvarDadosDeCadastro)

// /*LISTAGENS */
// router.get('/:user_id/listar', controllersUsuario.listarMetas)
// router.get('/:user_id/:metas_id/show', controllersUsuario.mostrarDetalhesDaMeta)
// router.get('/:user_id/:livro_id/show', controllersUsuario.mostrarDetalhesDoLivro)

// /*METAS DE LEITURA GLOBAIS*/
// router.get('/:user_id/Meta/cadastrar', controllersUsuario.mostrarPaginaDeCadastroDeMetas)
// router.get('/:user_id/Meta/cadastrar', controllersUsuario.salvarDadosDaMeta)

// router.get('/:user_id/Meta/:meta_id/editar', controllersUsuario.mostrarPaginaDeEdicaoDeMetas)
// router.put('/:user_id/Meta/:meta_id/editar', controllersUsuario.atualizarDadosDaMeta)
// router.delete('/:user_id/Meta/:meta_id', controllersUsuario.deletarMeta)

// /*LIVROS*/
// router.get('/:user_id/Livro/cadastrar', controllersUsuario.mostrarPaginaDeCadastroDeLivros)
// router.get('/:user_id/Livro/cadastrar', controllersUsuario.salvarDadosDoLivro)

// router.get('/:user_id/Livro/:livro_id/editar', controllersUsuario.mostrarPaginaDeEdicaoDeLivros)
// router.put('/:user_id/Livro/:livro_id/editar', controllersUsuario.atualizarDadosDoLivro)
// router.delete('/:user_id/Livro/:livro_id', controllersUsuario.deletarLivro)

module.exports = router;