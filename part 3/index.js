const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const phoneBookCount = phonebook.length
    const infoValue = 
    `<div>Phonebook has info for ${phoneBookCount} people </div>
    <p>${new Date()}</p>`

    console.log(infoValue)
    response.send(infoValue)
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find((person) => person.id === id)

    if (person) {
        response.send(JSON.stringify(person))
    } else {
        response.status(404).json({
            error: 'person not found'
        })
    }
})

const generateID = () => {
    const maxID = Math.random() * 12345
    return maxID + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
        response.status(404).json({
            error: 'unable to add this person'
        })
    } 

    const name = body.name
    const number = body.number

    if (name.trim().length == 0 || number.trim().length == 0) {
        response.status(404).json({
            error: 'the name or number is missing'
        })
    }

    const duplicate = phonebook.find(p => p.name === name)
    if (duplicate) {
        response.status(404).json({
            error: 'name must be unique'
        })
    }

    
    const newPerson = {
        name: name,
        number: number,
        id: generateID()
    }

    console.log(newPerson)
    phonebook = phonebook.concat(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const newPhonebook = phonebook.filter(p => p.id !== id)
    phonebook = newPhonebook
    console.log('new phone book', newPhonebook)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
