const controllersUsuario = require('../controllers/controllersUsuario')

const express = require('express')
const router = express.Router()

router.get('/', controllersUsuario.listarMetas)

router.get('/login', controllersUsuario.mostrarPaginaDeLogin)
router.post('/login', controllersUsuario.enviarDadosDeLogin)

router.get('/register', controllersUsuario.mostrarPaginaDeCadastro)
router.post('/register', controllersUsuario.salvarDadosDeCadastro)

router.get('/meta/cadastrar', controllersUsuario.mostrarPaginaDeCadastroDeMetas)
router.post('/meta/cadastrar', controllersUsuario.salvarDadosDaMeta)

router.get('/meta/editar', controllersUsuario.mostrarPaginaDeEdicaoDeMetas)
router.put('/meta/editar', controllersUsuario.atualizarDadosDaMeta)

router.get('/meta/atualizar', controllersUsuario.atualizarMeta)

router.delete('/meta/deletar', controllersUsuario.deletarMeta)

router.get('/meta/detalhes', controllersUsuario.mostrarPaginaDetalhesMeta)


module.exports = router;