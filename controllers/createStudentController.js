const studentModel = require('../models/aluno')

exports.studentGet = (req, res) => {
    return res.render('create_student.ejs')
}

exports.studentPost = async(req, res) => {
    const name = req.body.name
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }
    const newStudent = {
        name,
        presence: 0,
        frequency: 0
    }
    try{
        await studentModel.create(newStudent)
        return res.redirect('/')
    }catch(err) {
        return res.status(500).json({msg: err})
    }
}