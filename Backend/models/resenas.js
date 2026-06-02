'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ReseniaSchema = Schema(
    {
        nombreRestaurante : String,
        calificacion : Number,
        fechaVisita : Date,
        observaciones : String,
        usuarioId : String
    }
);

module.exports = mongoose.model('resenas', ReseniaSchema);
