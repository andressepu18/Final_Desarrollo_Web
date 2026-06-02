'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');

let secret = 'asdayiuttyi34578.,,qw';

function createToken(usuario){
    let payload = {
        sub: usuario._id,
        email: usuario.email,
        iat: moment().unix(),
        // Expiración: 12 horas
        exp: moment().add(12, 'hours').unix()
    };
    return jwt.encode(payload, secret);
}

function validateToken(req, res, next){
    try{
        if(!req.headers || !req.headers.authorization){
            return res.status(401).send({ message: 'Token no proporcionado' });
        }

        let token = req.headers.authorization;
        if(token.startsWith('Bearer ')){
            token = token.replace('Bearer ', '');
        }

        let payload = jwt.decode(token, secret);

        // Verificar expiración manualmente (jwt-simple no lo verifica automáticamente)
        if(payload.exp && payload.exp <= moment().unix()){
            return res.status(401).send({ message: 'Token expirado' });
        }

        req.userId = payload.sub; // Recordar el Id del usuario que logueo
        next();
    }
    catch(ex){
        res.status(401).send({ message: 'Token inválido'});
    }
}

module.exports = {    createToken,    validateToken };
