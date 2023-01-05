const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    static async searchId(id) {
        if (typeof id !== 'string') return

        const contato = await ContatoModel.findById(id)
        return contato
    }

    static async getContatos() {
        const contatos = await ContatoModel.find()
            .sort({ createdIn: -1 })
        return contatos
    }

    static async delete(id) {
        if (typeof id !== 'string') return

        const contato = await ContatoModel.findOneAndDelete({_id: id})
        return contato
    }

    async register() {
        this.valid()
        if (this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    async edit(id) {
        if (typeof id !== 'string') return

        this.valid()

        if (this.errors.length > 0) return

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    valid() {
        this.cleanUp()

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido!')
        }

        if(!this.body.name) {
            this.errors.push('Nome é um campo obrigatório!')
        }

        if(!this.body.phone && !this.body.email) {
            this.errors.push('Telefone ou email precisam ser enviados para cadastro!')
        }

    }

    cleanUp() {
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            phone: this.body.phone,
            email: this.body.email
        }

        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        } 
    }
}

module.exports = Contato