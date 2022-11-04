const mongoose = require('mongoose');

const AulaSchema = new mongoose.Schema({
    data: {
        type: String,
    },
    hora: {
        type: String
    },
});

const Aula = mongoose.model('Aula', AulaSchema);

module.exports = Aula;