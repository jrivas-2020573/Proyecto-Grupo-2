const {request, response} = require('express');

const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario
    if (rol != 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es admin - No puedes hacer esto`
        });
    }

    next();
}

module.exports = {
    esAdminRole
}