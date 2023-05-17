const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const Hotel = require('../models/hotel');


const  getUsuarios = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.usuario._id);
      if (!usuario) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      // Verificar si el usuario tiene el rol de "SUPER_ADMIN"
      if (usuario.rol !== 'SUPER_ADMIN') {
        return res.status(403).json({ msg: 'Acceso denegado. Permiso insuficiente' });
      }
  
      // Obtener todos los usuarios de la base de datos
      const usuarios = await Usuario.find();
  
      res.json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
  };   

 const postUsuario = async (req = request, res = response) => {
    if (req.body.rol == "") {
        req.body.rol = "HUÉSPED"
    }

    const {nombre, correo, password, rol} = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST user',
        usuarioDB
    });
 }

 const putUsuario = async (req = request, res = response) => {
    const {id} = req.params;
    const user = req.usuario._id;
    const idUser = user.toString();

    if (id === idUser) {
        const {_id, role,...resto} = req.body;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
        const userEditado = await Usuario.findByIdAndUpdate(id, resto, {new: true});
        res.status(200).json({
            msg: 'User updated',
            userEditado
        })
    } else{
        res.status(401).json({
            msg: 'Unauthorized you can only update your own account'

        })
    }
 }

 const deleteUsuario = async(req = request, res = response) => {
    const {id} = req.params;
    const user = req.usuario._id;
    const idUser = user.toString();

    if(id === idUser){
        const userEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'User deleted',
            userEliminado
        })
    }else{
        res.status(401).json({
            msg: 'Unauthorized you can only delete your own account'

        })
    }
 }



const reservaHotel = async (req, res) => {
    const { idHotel } = req.body;
    const { _id: idUsuario } = req.usuario;
  
    try {
      // Buscar usuario por ID
      const usuario = await Usuario.findById(idUsuario);
  
      // Verificar si el usuario ya tiene una reserva para este hotel
      const index = usuario.carrito.indexOf(idHotel);
      if (index !== -1) {
        return res.status(400).json({ msg: 'El usuario ya tiene una reserva para este hotel' });
      }
  
      // Buscar hotel por ID
      const hotel = await Hotel.findById(idHotel);
  
      // Verificar si hay habitaciones disponibles en el hotel
      if (hotel.habitacionesDispo === 0) {
        return res.status(400).json({ msg: 'No hay habitaciones disponibles en este hotel' });
      }
  
      // Actualizar el campo habitacionesDispo del hotel y agregar la reserva al carrito del usuario
      await Promise.all([
        Hotel.findByIdAndUpdate(idHotel, { $inc: { habitacionesDispo: -1 } }),
        Usuario.findByIdAndUpdate(idUsuario, { $push: { carrito: idHotel } })
      ]);
  
      // Actualizar el total del carrito del usuario
      const usuarioActualizado = await Usuario.findById(idUsuario).populate('carrito');
      const total = usuarioActualizado.carrito.reduce((acc, hotel) => acc + hotel.precioHabitacion, 0);
      await Usuario.findByIdAndUpdate(idUsuario, { total });
  
      res.json({ msg: 'Reserva realizada correctamente', total });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hubo un error al realizar la reserva' });
    }
  };
  
     

 module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
    reservaHotel
 }