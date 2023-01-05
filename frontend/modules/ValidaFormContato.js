import validator from "validator"
import { messagesAlert } from "./messages"

export class ValidaFormContato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.body = null
        this.errors = []
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const element = e.target

        const nameInput = this.form.querySelector('input[name="name"]')
        const lastnameInput = this.form.querySelector('input[name="lastname"]')
        const phoneInput = this.form.querySelector('input[name="phone"]')
        const emailInput = this.form.querySelector('input[name="email"]')

        this.body = {
            name: nameInput.value,
            lastname: lastnameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        }

        this.cleanUp()

        if (!nameInput.value) {
            this.errors.push('Nome é um campo obrigatório!')
        }

        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.errors.push('Email inválido!')
        }

        if(!phoneInput.value && !emailInput.value) {
            this.errors.push('Telefone ou email precisam ser enviados para cadastro!')
        }

        if (this.errors.length > 0) {
            messagesAlert('danger', this.errors)
            this.errors = []
        } else {
            element.submit()
        }
        
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        } 
    }
}