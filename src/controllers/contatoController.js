const Contato = require('../models/ContatoModel')

module.exports.index = (req, res) => {
    return res.render('contato', {
        contato: {}
    })
}

module.exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'))
            return
        }

        req.flash('success', 'Contato cadastrado com sucesso!')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
        return
    } catch(error) {
        console.log(error)
        return res.render('404')
    }
        
}

module.exports.editIndex = async (req, res) => {
    try {
        if (!req.params.id) return (res.render('404'))

        const contato = await Contato.searchId(req.params.id)

        if(!contato) return (res.render('404'))

        res.render('contato', { contato })
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
        

}

module.exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return (res.render('404'))

        const contato = new Contato(req.body)

        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/${req.params.id}`))
            return
        }

        req.flash('success', 'Contato editado com sucesso!')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
        return

    } catch (error) {
        console.log(error)
        return res.render('404')
    }
    
}

module.exports.delete = async (req, res) => {
    try {
        if (!req.params.id) return (res.render('404'))

        const contato = await Contato.delete(req.params.id)

        if(!contato) return (res.render('404'))

        req.flash('success', 'Contato excluído com sucesso!')
        req.session.save(() => res.redirect('/'))
        return
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}
