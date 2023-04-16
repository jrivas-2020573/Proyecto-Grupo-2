const { Router } = require('express');
const { check } = require('express-validator');
const { getHoteles, postHotel, putHotel, deleteHotel, getHotelPorNombre } = require('../controllers/hotel');

const router = Router();

router.get('/mostrar', getHoteles);

router.get('/mostrar', getHotelPorNombre);

router.post('/agregar', postHotel);

router.put('/editar/:id', putHotel);

router.delete('/eliminar/:id', deleteHotel);

module.exports = router;