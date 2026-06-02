'use strict';

let Resenia = require('../models/resenas');

function crearResenia(req, resp){
    let requestBody = req.body;
    let usuarioId = req.userId;

    if(!requestBody){
        resp.status(400).send({'message': 'no body was sent'});
    }
    else if(!requestBody.nombreRestaurante || !requestBody.calificacion || !requestBody.fechaVisita){
        resp.status(400).send({'message': 'missing mandatory fields'});
    }
    else if(requestBody.nombreRestaurante.trim() === '' || requestBody.calificacion < 1 || requestBody.calificacion > 5){
        resp.status(400).send({'message': 'invalid values in mandatory fields'});
    }
    else{
        let nuevaResenia = new Resenia();
        nuevaResenia.nombreRestaurante = requestBody.nombreRestaurante;
        nuevaResenia.calificacion = requestBody.calificacion;
        nuevaResenia.fechaVisita = requestBody.fechaVisita;
        nuevaResenia.observaciones = requestBody.observaciones;
        nuevaResenia.usuarioId = usuarioId;

        nuevaResenia.save().then(
            (reseniaCreada) => {
                resp.status(201).send({'message': 'resenia created', 'resenia': reseniaCreada});
            },
            err => {
                resp.status(500).send({'message':'internal error', 'error': err})
            }
        );
    }
}

function consultarTodos(req, resp){
    Resenia.find({ }).then(
        (resenas) => {
            resp.status(200).send(resenas);
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar reseñas' });
        }
    );
}

function consultarPorId(req, resp){
    let reseniaId = req.params.reseniaId;
    Resenia.findById(reseniaId).then(
        (resenia) => {
            resp.status(200).send(resenia);
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar reseña' });
        }
    );
}

function borrarPorId(req, resp){
    let reseniaId = req.params.reseniaId;
    let usuarioId = req.userId;

    Resenia.findById(reseniaId).then(
        (resenia) => {
            if(!resenia){
                return resp.status(404).send({ message: 'Reseña no encontrada' });
            }
            if(resenia.usuarioId.toString() !== usuarioId){
                return resp.status(403).send({ message: 'No tienes permiso para eliminar esta reseña' });
            }
            Resenia.findByIdAndDelete(reseniaId).then(
                (reseniaEliminada) => {
                    resp.status(200).send({ message: 'Reseña eliminada' });
                }
            );
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al eliminar reseña' });
        }
    );
}

function actualizarResenia(req, resp){

    let reseniaId = req.params.reseniaId;
    let usuarioId = req.userId;
    let requestBody = req.body;

    if(!requestBody){
        resp.status(400).send({'message': 'no body was sent'});
    }
    else if(!requestBody.nombreRestaurante || !requestBody.calificacion || !requestBody.fechaVisita){
        resp.status(400).send({'message': 'missing mandatory fields'});
    }
    else if(requestBody.nombreRestaurante.trim() === '' || requestBody.calificacion < 1 || requestBody.calificacion > 5){
        resp.status(400).send({'message': 'invalid values in mandatory fields'});
    }
    else{
        Resenia.findById(reseniaId).then(
            (resenia) => {
                if(!resenia){
                    return resp.status(404).send({ message: 'Reseña no encontrada' });
                }
                if(resenia.usuarioId.toString() !== usuarioId){
                    return resp.status(403).send({ message: 'No tienes permiso para actualizar esta reseña' });
                }

                Resenia.findByIdAndUpdate(reseniaId, 
                    {   
                        nombreRestaurante: requestBody.nombreRestaurante, 
                        calificacion: requestBody.calificacion,
                        fechaVisita: requestBody.fechaVisita,
                        observaciones: requestBody.observaciones
                    },  { new: true }).then(
                    (resenia) => {
                        resp.status(200).send({ message: 'Reseña actualizada', resenia: resenia });
                    }
                ).catch(
                    (err) => {
                        resp.status(500).send({ message: 'Error al actualizar reseña' });
                    }
                );
            }
        ).catch(
            (err) => {
                resp.status(500).send({ message: 'Error al verificar reseña' });
            }
        );
        
    }
}


module.exports = {crearResenia, consultarTodos, consultarPorId, borrarPorId, actualizarResenia };
