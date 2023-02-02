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
    Person.findById(request.params.id)
    .then(note => {
        response.json(note)
    })
    .catch(error => next(error))
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
    const number = body.phone

    if (name.trim().length == 0 || number.trim().length == 0) {
        response.status(404).json({
            error: 'the name or number is missing'
        })
    }

    Person.find({name: name})
    .then(person => {
        if (person) {
            const newPerson = {
                name: name,
                phone: number        
            }
            console.log('person found', person[0]._id.valueOf())
            Person.findByIdAndUpdate(person[0]._id.valueOf(), newPerson, {new:true})
            .then(updatedPerson => {
                console.log('updated person', updatedPerson)
                response.json(updatedPerson)
            })
            .catch(error => next(error))
        }
        else {
            const newPerson = new Person ({
                name: name,
                phone: number
            })
            
            newPerson.save().then(note => {
                response.json(note)
            })
            .catch(error => next(error))
        }
    })  
    .catch(error => next(error)) 
})

app.delete('/api/persons/:id', (request, response) => {
    console.log(request.params.id)
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))

    // const id = Number(request.params.id)
    // const newPhonebook = phonebook.filter(p => p.id !== id)
    // phonebook = newPhonebook
    // console.log('new phone book', newPhonebook)
    // response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint '})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    }
    next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
