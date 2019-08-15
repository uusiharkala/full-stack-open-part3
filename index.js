const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `<div><p>Phonebook has info for ${persons.length} people<p/><br>${new Date()}<div/>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)
persons = persons.filter(person => person.id !== id)

res.status(204).end()
})
 
app.post('/api/persons', (request, response) => {
const body = request.body

if (!body.name) {
    return response.status(400).json({ 
    error: 'name missing' 
    })
}

if (!body.number) {
    return response.status(400).json({ 
    error: 'number missing' 
    })
}

if (persons.map(per => per.name).find(per => per === body.name)) {
    return response.status(400).json({ 
    error: 'name must be unique' 
    })
}

const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10) + 10
}

persons = persons.concat(person)

response.json(person)
})

morgan

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})