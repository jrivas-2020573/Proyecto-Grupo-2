const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { emailExiste, RolValido, existeUserPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getUsuarios);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El email es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({min: 6}),
    check('rol').custom(RolValido),
    validarCampos
], postUsuario);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUserPorId),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('password', 'La password deber ser mayor a 6 letras').isLength({min: 6}),
    check('rol').custom(RolValido),
    validarCampos
] , putUsuario);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUserPorId),
    validarCampos
] ,deleteUsuario);

module.exports = router;