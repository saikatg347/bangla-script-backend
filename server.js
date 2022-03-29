const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/submitRoute'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
