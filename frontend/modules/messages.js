export const messagesAlert = (classe, messages = []) => {
    const divLg8 = document.querySelector('.col-lg-8')
    const p = divLg8.querySelector('p')

    if (document.querySelector('.error')) {
        const divRemoved = document.querySelector('.error')
        divRemoved.remove()
    }

    const divRow = document.createElement('div')
    divRow.classList.add('row')
    divRow.classList.add('error')

    const divCol = document.createElement('div')
    divCol.classList.add('col')
    divCol.classList.add('my-3')

    const divMessage = document.createElement('div')
    divMessage.classList.add('alert')
    divMessage.classList.add(`alert-${classe}`)

    messages.forEach((message) => {
        divMessage.innerHTML += `${message}<br />`  
    })

    divCol.appendChild(divMessage)
    divRow.appendChild(divCol)

    p.after(divRow)

}



