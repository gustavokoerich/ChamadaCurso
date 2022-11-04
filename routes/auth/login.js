const router = require('express').Router();
require('dotenv').config()
const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');

// Parte de fazer o login do site!

router.get('/login', async (req, res) => {
    return res.render('login.ejs')
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({ name: username });

    if (!user) {
        return res.status(422).json({msg: 'Usuario não encontrado!'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida!'})
    }

    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        },
        secret, {
            expiresIn: 43200
        })
        res.cookie("jwt", token, {httpOnly: false})
        return res.redirect('/')
    }catch(err) {
        console.log(err)
        res.status(500).json({msg:'Ops, algo deu errado'})
    }
    
});

// Parte de fazer o cadastro do site!

router.get('/register', async (req, res) => {
    return res.redirect('/auth/login')
});

router.post('/register', async (req, res) => {
    const {username, password, code} = req.body
    console.log(username, password, code)

    if (code != '123'){
        return res.status(422).json( {msg: 'Código invalido, impossivel prosseguir!'} )
    }

    if (!username || !password || !code) {
        return res.status(422).json( {msg: 'Todos os campos são obrigatorios!'} )
    }

    const userExists = await User.findOne({ name: username })

    if (userExists) {
        return res.status(422).json({ msg: 'Já temos usuario com esse nome!' })
    }

    // Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name: username,
        password: passwordHash,
    })

    try{
        await user.save()
        res.redirect('/auth/login')
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Aconteceu um erro no servidor!'})
    }
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {httpOnly: false, maxAge: 0})
    return res.redirect('/auth/login')
})

module.exports = router;