require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')

const sessionOptions = session({
    secret: '123456789',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Base de dados conectada')
        app.emit('done')
    })
    .catch(error => console.log(error))
        
app.use(sessionOptions)
app.use(flash())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(csrf())
app.use(helmet())

app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes)

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.on('done', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
        console.log('Acesse: http://localhost:3000/')
    })
})

