module.exports = {
    async acessarHome(req, res) {
        res.redirect('login');
    },
    async mostrarPaginaDeLogin(req, res) {
        res.render('login')
    },
    async enviarDadosDeLogin(req, res) {
        res.render('login')
    },

    async mostrarPaginaDeCadastro(req, res) {
        res.render('register')
    },
    async salvarDadosDeCadastro(req, res) {
        res.render('register')
    }
}
