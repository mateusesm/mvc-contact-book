module.exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

module.exports.checkCsrfError = (error, req, res, next) => {
    if (error) {
        return res.render('404')
    }

    next()
}

module.exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

module.exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login!')
        req.session.save(() => res.redirect('/'))
        return
    }

    next()
}