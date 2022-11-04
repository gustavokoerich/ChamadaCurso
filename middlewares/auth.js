const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token){
        return res.redirect('/auth/login')
    }

    try{
        
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    }catch(err){
        return res.redirect('/auth/login')
    }
}