const { Router } = require('express');
const { check } = require('express-validator');
const { getHoteles, postHotel, putHotel, deleteHotel } = require('../controllers/hotel');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', getHoteles);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es olbigatoria').not().isEmpty(),
    check('precioHabitacion', 'El precio es obligatorio').not().isEmpty(),
    check('precioHabitacion', 'El precio solo acepta numeros').not().isString(),
    check('habitacionesDispo', 'El numero de habitaciones es olbigatorio').not().isEmpty(),
    check('habitacionesDispo', 'Las habitaciones disponibles solo acepta numeros').not().isString(),
    validarCampos
], postHotel);

router.put('/editar/:id', [
    validarJWT,
    check('precioHabitacion', 'El precio es obligatorio').not().isEmpty(),
    check('precioHabitacion', 'El precio solo acepta numeros').not().isString(),
    check('habitacionesDispo', 'El numero de habitaciones es olbigatorio').not().isEmpty(),
    check('habitacionesDispo', 'Las habitaciones disponibles solo acepta numeros').not().isString(),
    validarCampos
], putHotel);

router.delete('/eliminar/:id', [
    validarJWT,
    validarCampos
], deleteHotel);

module.exports = router;