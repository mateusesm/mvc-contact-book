const Contato = require('../models/ContatoModel')

module.exports.index = async (req, res) => {
    const contatos = await Contato.getContatos()
    res.render('index', { contatos })
}