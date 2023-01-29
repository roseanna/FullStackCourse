const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())

const morgan = require('morgan')
morgan.token("data", (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const Person = require('./models/person')

let phonebook = [
    // { 
    //   "id": 1,
    //   "name": "Arto Hellas", 
    //   "number": "040-123456"
    // },
    // { 
    //   "id": 2,
    //   "name": "Ada Lovelace", 
    //   "number": "39-44-5323523"
    // },
    // { 
    //   "id": 3,
    //   "name": "Dan Abramov", 
    //   "number": "12-43-234345"
    // },
    // { 
    //   "id": 4,
    //   "name": "Mary Poppendieck", 
    //   "number": "39-23-6423122"
    // }
]

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        console.log('get', persons)
        const phoneBookCount = persons.length
        const infoValue = 
        `<div>Phonebook has info for ${phoneBookCount} people </div>
        <p>${new Date()}</p>`    
        response.json(infoValue)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log('get', persons)
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Persons.findById(request.params.id).then(note => {
        response.json(note)
    })
    // const id = Number(request.params.id)
    // const person = phonebook.find((person) => person.id === id)

    // if (person) {
    //     response.send(JSON.stringify(person))
    // } else {
    //     response.status(404).json({
    //         error: 'person not found'
    //     })
    // }
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

    
    const newPerson = new Person ({
        id: generateID(),
        name: name,
        number: number
    })
    newPerson.save().then(note => {
        response.json(note)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    console.log(request.params.id)
    Person.deleteOne({id: Number(request.params.id)}, function(err, res) {
        console.log('res', res)
        if (err) return handleError(err);
    })

    // const id = Number(request.params.id)
    // const newPhonebook = phonebook.filter(p => p.id !== id)
    // phonebook = newPhonebook
    // console.log('new phone book', newPhonebook)
    // response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
