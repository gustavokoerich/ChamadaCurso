require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(cors())

// Ler o JSON

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())


// Rotas Publicas API

const loginRoutes = require('./routes/auth/login');
app.use('/auth', loginRoutes)

// Rotas Privadas API

const homeRoutes = require('./routes/index');
app.use('/', homeRoutes)

const studentRoutes = require('./routes/createStudent')
app.use('/aluno', studentRoutes)



// BD

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@chamada.f38anua.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectado com o Mongo')
    })
    .catch((err) => console.log(err))

// RUN    

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor está rodando com a porta: 3000`)
});
