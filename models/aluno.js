const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    presence: {
        type: Number,
        require: true,
    },
    frequency:{
        type: String
    }
});

const Aluno = mongoose.model('Aluno', AlunoSchema);

module.exports = Aluno;