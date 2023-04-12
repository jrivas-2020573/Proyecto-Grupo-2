const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');

const router = Router();

router.get('/mostrar', getUsuarios);

router.post('/agregar', postUsuario);

router.put('/editar/:id', putUsuario);

router.delete('/eliminar/:id', deleteUsuario);

module.exports = router;