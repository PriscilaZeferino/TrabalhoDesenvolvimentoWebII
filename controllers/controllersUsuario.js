const isLoggedIn = true;

module.exports = {

    async listarMetas(req, res) {
        if(!isLoggedIn) {
            res.redirect('login')
        } else {
            res.render('meta', {tituloPagina: "Lista de Metas"});
        }
    },

    async mostrarPaginaDeLogin(req, res) {
        res.render('login', {tituloPagina: "Login"})
    },

    async enviarDadosDeLogin(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.redirect('login')
        }    
    },

    async mostrarPaginaDeCadastro(req, res) {
        if(isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('register', {tituloPagina: "Registrar"})
        }
    },

    async salvarDadosDeCadastro(req, res) {
        if(isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('register', {tituloPagina: "Registrar"})
        }
    },

    async mostrarPaginaDeCadastroDeMetas(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('cadastrarMeta', {tituloPagina: "Cadastrar Nova Meta"})
        }
    },

    async salvarDadosDaMeta(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        }
    },


    async mostrarPaginaDeEdicaoDeMetas(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('editarMeta', {tituloPagina: "Editar Meta"})
        }
    },

    async atualizarDadosDaMeta(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('editarMeta', {tituloPagina: "Editar Meta"})
        }
    },

    async atualizarMeta (req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('atualizarMeta', {tituloPagina: "Atualizar Meta"})
        }
    },

    async deletarMeta(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.redirect('/listar')
        }
    },

    async mostrarPaginaDetalhesMeta(req, res) {
        if(!isLoggedIn) {
            res.redirect('/');
        } else {
            res.render('detalhesMeta', {tituloPagina: "Detalhes da Meta"})
        }
    },
}
