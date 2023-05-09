const { response, request } = require('express');
const Usuario = require('../models/usuario');
const Factura = require('../models/factura');

const mostrarFactura = async (req, res) => {
    try {
      const factura = await Factura.findOne({ usuario: req.usuario._id }).populate({
        path: 'reservacion',
        select: '-password -carrito'
      }).select('-usuario');
      if (!factura) {
        return res.status(404).json({ msg: 'No existe la factura para el usuario' });
      }
      res.json(factura);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hubo un error' });
    }
  };
  




  const generarFactura = async (req, res) => {
    try {
      const { usuario } = req;
      const usuarioDB = await Usuario.findById(usuario._id).populate('carrito');
      const { carrito, total } = usuarioDB;
  
      const nuevaFactura = new Factura({
        usuario: usuarioDB._id,
        reservacion: carrito,
        total,
        fecha: new Date()
      });
  
      await nuevaFactura.save();
  
      // Limpiamos el carrito del usuario
      usuarioDB.carrito = [];
      usuarioDB.total = 0;
      await usuarioDB.save();
  
      res.json({
        ok: true,
        factura: nuevaFactura,
        msg: '!Muchas gracias por su compra¡'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al crear la factura'
      });
    }
  };
  
  

module.exports  = {
    generarFactura,
    mostrarFactura
}