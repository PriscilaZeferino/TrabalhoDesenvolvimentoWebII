const passport = require("passport");


const User = require('../models/user');
const Meta = require('../models/meta');

var moment = require('moment');

module.exports = {

    async listarMetas(req, res) {
        const metas = await Meta.find({});
        res.render('meta', {tituloPagina: "Lista de Metas", metas})
    },

    async mostrarPaginaDeLogin(req, res) {
        res.render('login', {tituloPagina: "Login", msg: ''})
    },

    async mostrarPaginaDeCadastro(req, res) {
        res.render('register', {tituloPagina: "Registrar", msg: ''})
    },

    async salvarDadosDeCadastro(req, res) {  

            const {username, email, password} = req.body;
            let msg = '';

            if(username && email && password) {
                Users = await new User({email: email, username: username});
                await User.register(Users, password, function(err, user) {
                        if (err) {
                            msg = 'Este usuário ja está em uso. Tente fazer login!'
                            res.render('register', {tituloPagina: "Registrar", msg})
                        }else{
                            passport.authenticate("local")(req, res, ()=>{
                                res.redirect("/");
                            });
                        }
                });
            } else {
                msg = 'Por favor, preencha todos os campos!'
                res.render('register', {tituloPagina: "Registrar", msg})
            }


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
