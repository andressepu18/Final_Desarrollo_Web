'use strict';

let express = require('express');
let router = express.Router();
let reseniaController = require('../controllers/resenas');
let auth = require('../helpers/auth');

router.post('/api/resenia', auth.validateToken, reseniaController.crearResenia);
router.get('/api/resenias', reseniaController.consultarTodos);
router.get('/api/resenia/:reseniaId', reseniaController.consultarPorId);
router.delete('/api/resenia/:reseniaId', auth.validateToken, reseniaController.borrarPorId);
router.put('/api/resenia/:reseniaId', auth.validateToken, reseniaController.actualizarResenia);

module.exports = router;
