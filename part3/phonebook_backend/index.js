const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    })
  }
  next(error)
}

app.use(morgan('tiny'))
app.use(morgan((tokens, request, response) => [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  JSON.stringify(request.body),
].join(' ')))

app.get('/', (request, response) => {
  response.send('<h1>HI</h1>')
})

app.get('/info', (request, response) => {
  const today = new Date()
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][today.getMonth()]
  const dayOfTheMonth = today.getDate()
  const year = today.getFullYear()
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
  const timeZone = today.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]
  const currentDate = `${day} ${month} ${dayOfTheMonth} ${year} ${time} ${timeZone}`

  Person.find({}).then((persons) => {
    const number = persons.length
    response.send(`<div>
        <p>Phonebook has info for ${number} people</p>
        <p>${currentDate}</p>
        </div>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const {
    body
  } = request

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Content missing!',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
      console.log(`added ${body.name} number ${body.number} to phonebook`)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {
    body
  } = request

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
      new: true,
    })
    .then((changedPerson) => {
      response.json(changedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
  })
}
app.use(unknownEndpoint)
app.use(errorHandler)

const {
  PORT
} = process.env
app.listen(PORT)
console.log(`server running on port ${PORT}`)