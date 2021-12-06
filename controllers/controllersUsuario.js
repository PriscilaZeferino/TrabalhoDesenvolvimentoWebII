const Meta = require('../models/meta');
var moment = require('moment');

module.exports = {

    async listarMetas(req, res) {
        const username = req.session.passport.user;
        const metas = await Meta.find({user: username});
        res.render('meta', {tituloPagina: "Lista de Metas", metas})
    },

    async mostrarPaginaDeCadastroDeMetas(req, res) {
        res.render('cadastrarMeta', {tituloPagina: "Cadastrar Nova Meta"})
    },

    async salvarDadosDaMeta(req, res) {

        const body = await {
            user: req.session.passport.user,
            title: req.body.titulo,
            description: req.body.description,
            total_books: req.body.total_books,
            deadline: await moment(req.body.prazo).format('YYYY-MM-DD'),
        };

        if(body) {
            try {
                const novaMeta = new Meta(body);
                await novaMeta.save();
                res.redirect('/');

            } catch (err) {
                console.log(err);
                res.render('cadastrarMeta', {tituloPagina: "Cadastrar Nova Meta", msg: ''})
            }
        }

    },

    async mostrarPaginaDetalhesMeta(req, res) {
        const { id } = req.params;
        const meta = await Meta.findById(id);
        let deadline = await moment(meta.deadline).format('DD/MM/YYYY');

        const progress = await Math.round((meta.read_books/meta.total_books)*100);
        res.render('detalhesMeta', {tituloPagina: "Detalhes da Meta", meta, progress, deadline})
    },


    async mostrarPaginaDeEdicaoDeMetas(req, res) {
        const { id } = await req.params;
        const meta = await Meta.findById(id);
        let deadline = await moment(meta.deadline).format('YYYY-MM-DD');
        res.render('editarMeta', {tituloPagina: "Editar Meta", id, meta, deadline})
    },

    async atualizarDadosDaMeta(req, res) {

        const { id } = await req.params;

        const body = await {
            user: req.session.passport.user,
            title: req.body.titulo,
            description: req.body.description,
            total_books: req.body.total_books,
            deadline: await moment(req.body.prazo).format('YYYY-MM-DD'),
        };
        
        try {
            await Meta.findByIdAndUpdate(id, body, { runValidators: true });
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.render('editarMeta', {tituloPagina: "Editar Meta", msg: 'Não foi possivel atualizar!'})
        }

    },

    async atualizarMetaDeLivros (req, res) {
        const { id } = req.params;
        res.render('atualizarMeta', {tituloPagina: "Atualizar Leitura", id})
    },

    async atualizarQtdDeLivrosLidos (req, res) {

        const { id } = await req.params;
        const {lidos} = await req.body;

        try {
            await Meta.findByIdAndUpdate(id, {read_books: lidos}, { runValidators: true });
            res.redirect('/meta/' + id + '/detalhes');

        } catch (err) {
            console.log(err);
            res.render('atualizarMeta', {tituloPagina: "Atualizar Leitura"})
        }

    },

    async deletarMeta(req, res) {
        const { id } = await req.params;
        await Meta.findByIdAndDelete(id);
        await res.redirect('/');
    },

    async logout(req, res) {
        req.logout();
        res.redirect("/");
    },
}
