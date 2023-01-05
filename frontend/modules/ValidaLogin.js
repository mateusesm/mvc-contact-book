import validator from "validator"
import { messagesAlert } from "./messages"

export class ValidaLogin {
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

        const emailInput = this.form.querySelector('input[name="email"]')
        const passwordInput = this.form.querySelector('input[name="password"]')

        this.body = {
            email: emailInput.value,
            password: passwordInput.value
        }

        this.cleanUp()


        if (!validator.isEmail(emailInput.value)) {
            this.errors.push('Email inválido!')
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 20) {
            this.errors.push('Senha precisa ter entre 3 e 20 caracteres')
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