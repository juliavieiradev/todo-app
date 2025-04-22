const mongoose = require('mongoose');

const schemaTarefa = new mongoose.Schema(
    {
        descricao: String,
        statusRealizada: Boolean,
    },
    { versionKey: false }
)

module.exports = mongoose.model('Tarefa', schemaTarefa)