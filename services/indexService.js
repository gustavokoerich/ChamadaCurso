const studentModel = require('../models/aluno')
const classModel = require('../models/aula')
const indexFunctions = require('../functions/indexFunctions')

// Functions

exports.getNameStudents = async () => {
    try{
        const students = await studentModel.find({}).sort({name: 1})
        const arrayStudents = [];
        for (i of students) {
            arrayStudents.push({name: i.name})
        }
        return arrayStudents
    }catch(err) {
        return console.log(err)
    }
}

exports.frequencyUpdate = async (classCount) => {
    try{
        const student = await studentModel.find({})
        for (i of student) {
            const newStudent = new indexFunctions.Student(i.id, i.name, i.presence, i.frequency)
            newStudent.frequency = indexFunctions.frequencyCalculation(newStudent.presence, classCount)
            const updatedStudent = await studentModel.updateOne({_id: i.id}, newStudent)
        }
    }catch(err) {
        return console.log(err)
    }

}

exports.presenceUpdate = async (students) => {
    for (let i in students){
        const [ student ] = await studentModel.find({name: students[i]})
        try{
            const newStudent = new indexFunctions.Student(student.id, student.name,
            student.presence, student.frequency)
            newStudent.presence += 1
            const updatedStudent = await studentModel.updateOne({_id: student.id}, newStudent)
        }catch(err) {
            return console.log(err)
        }
    }
}

exports.createClassroom = async () => {
    try{
        const date = new Date(Date.now())
        const data = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`
        const hour = `${date.getUTCHours()-3}:${date.getUTCMinutes()}`
        bdDate = {
            data: data,
            hora: hour
        }
        const verifyClassroom = await classModel.find({data: data})
        if (verifyClassroom.length > 0){
            return false
        }else{
            return newClass = await classModel.create(bdDate) 
        }
        
    }catch(err){
        return console.log(err)
    }
}
