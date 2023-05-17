const { Router } = require('express');
const { check } = require('express-validator');
const { getHoteles, postHotel, putHotel, deleteHotel, getHotelPorNombre } = require('../controllers/hotel');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esHotelValido, hotelExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar', getHoteles);

router.post('/agregar', [
    validarJWT,
    check('nombre').custom(hotelExiste),
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

router.get('/buscar', [
    check('nombre').custom(esHotelValido),
    validarCampos
], getHotelPorNombre);

module.exports = router;