const passport = require("passport");


const User = require('../models/user');
const Meta = require('../models/meta');


module.exports = {

    async listarMetas(req, res) {
        const meta = await Meta.find({});
        res.render('meta', {tituloPagina: "Lista de Metas", meta})
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
            deadline: req.body.prazo,
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


    async mostrarPaginaDeEdicaoDeMetas(req, res) {
        res.render('editarMeta', {tituloPagina: "Editar Meta"})
    },

    async atualizarDadosDaMeta(req, res) {
        res.redirect('/');

    },

    async atualizarMeta (req, res) {
        res.render('atualizarMeta', {tituloPagina: "Atualizar Leitura"})
    },

    async deletarMeta(req, res) {
        res.redirect('/');
    },

    async mostrarPaginaDetalhesMeta(req, res) {
        res.render('detalhesMeta', {tituloPagina: "Detalhes da Meta"})
    },

    async logout(req, res) {
        req.logout();
        res.redirect("/");
    },
}
