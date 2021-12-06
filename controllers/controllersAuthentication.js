const User = require('../models/user');
const passport = require("passport")

module.exports = {

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
                Users = await new User({email: email, username: username, password: password});
                await User.register(Users, password, function(err, user) {
                        if (err) {
                            console.log(err)
                            msg = 'Este usuário/email ja está em uso. Tente fazer login!'
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

}