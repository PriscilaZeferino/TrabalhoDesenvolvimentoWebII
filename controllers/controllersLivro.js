const Livro = require('../models/livro');

module.exports = {
    async listarLivros(req, res) {
        const username = req.session.passport.user;
        const livros = await Livro.find({user: username});
        res.render('livro', {tituloPagina: "Lista de livros", livros})
    },

    async mostrarPaginaDeCadastroDeLivros(req, res) {
        res.render('cadastrarLivro', {tituloPagina: "Cadastrar Livro"})
    },

    async salvarDadosDeLivro(req, res) {

        const body = await {
            user: req.session.passport.user,
            title: req.body.titulo,
            description: req.body.description,
            author: req.body.author,
            total_pages: req.body.total_pages,
        };

        if(body) {
            try {
                const novoLivro = new Livro(body);
                await novoLivro.save();
                res.redirect('/');

            } catch (err) {
                console.log(err);
                res.render('cadastrarLivro', {tituloPagina: "Cadastrar Livro", msg: ''})
            }
        }

    },

    async mostrarPaginaDetalhesLivro(req, res) {
        const { id } = req.params;
        const livro = await Livro.findById(id);
        res.render('detalhesLivro', {tituloPagina: "Detalhes livro", livro})
    },

    async mostrarPaginaDeEdicaoDeLivro(req, res) {
        const { id } = await req.params;
        const livro = await Livro.findById(id);
        res.render('editarLivro', {tituloPagina: "Editar livro", id, livro})
    },


    async atualizarDadosDeLivro(req, res) {

        const { id } = await req.params;

        const body = await {
            user: req.session.passport.user,
            title: req.body.titulo,
            description: req.body.description,
            author: req.body.author,
            total_pages: req.body.total_pages,
        };
        
        try {
            await Livro.findByIdAndUpdate(id, body, { runValidators: true });
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.render('editarLivro', {tituloPagina: "Editar Livro", msg: 'Não foi possivel atualizar!'})
        }

    },

    async mostrarPaginaDeAtualizarLeitura(req, res) {
        const { id } = req.params;
        res.render('atualizarLivro', {tituloPagina: "Atualizar Leitura", id})
    },

    async atualizarNumeroDePaginasLidas (req, res) {

        const { id } = await req.params;
        const {lidos} = await req.body;

        try {
            await Livro.findByIdAndUpdate(id, {read_pages: lidos}, { runValidators: true });
            res.redirect('/livro/' + id + '/detalhes');

        } catch (err) {
            console.log(err);
            res.render('atualizarLivro', {tituloPagina: "Atualizar Leitura"})
        }

    },

    async deletarLivro (req, res) {
        const { id } = await req.params;
        await Livro.findByIdAndDelete(id);
        await res.redirect('/');
    },


}