const classModel = require('../models/aula')
const indexService = require('../services/indexService')

exports.indexGet = async (req, res ) => {
    const students = await indexService.getNameStudents()
    return res.render('index.ejs', {students: students, sucess: 0})
}

exports.indexPost = async (req, res) => {
    const students = await indexService.getNameStudents()

    const classroom = await indexService.createClassroom();

    if(!classroom) {
        return res.render('index.ejs', {sucess: 2, students: students})
    }

    const studentsBody = Object.keys(req.body)
    await indexService.presenceUpdate(studentsBody)

    const classCount = (await classModel.find()).length
    await indexService.frequencyUpdate(classCount)

    return res.render('index.ejs', {sucess: 1, students: students})
}
