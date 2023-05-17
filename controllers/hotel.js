const { response, request } = require('express');
const Hotel = require('../models/hotel');
const Usuario = require('../models/usuario');


const getHoteles = async(req = request, res = response) =>{
   const listaHoteles = await Promise.all([
      Hotel.countDocuments(),
      Hotel.find()
  ]);

  res.json({
      listaHoteles
  });  
 }


const postHotel = async (req, res) => {
   try {
     const usuario = await Usuario.findById(req.usuario._id);
     if (!usuario) {
       return res.status(404).json({ msg: 'Usuario no encontrado' });
     }
 
     // Verificar si el usuario tiene el rol de "SUPER_ADMIN" o "ADMIN"
     if (usuario.rol !== 'SUPER_ADMIN' /*&& usuario.rol !== 'ADMIN'*/) {
       return res.status(403).json({ msg: 'Acceso denegado. Permiso insuficiente' });
     }
     
     // Crear un nuevo hotel utilizando los datos del cuerpo de la solicitud
     const nuevoHotel = new Hotel(req.body);
 
     // Guardar el hotel en la base de datos
     await nuevoHotel.save();
 
     res.json({ msg: 'Hotel agregado exitosamente' });
   } catch (error) {
     console.log(error);
     res.status(500).json({ msg: 'Error al agregar el hotel' });
   }
 };
 

 const putHotel = async (req = request, res = response) => {
   const {rol} = req.usuario;

   if (rol === "ADMIN") {
      const {id} = req.params;
   
      const {_id, ...resto} = req.body;
   
      const hotelEditado = await Hotel.findByIdAndUpdate(id, resto, {new: true});
   
      res.status(200).json({
        hotelEditado
      }) 
   } else {
      res.status(401).json({
         msg: 'Unauthorized you can only edit a hotel if u are admin'
      })
   }

 }

 const deleteHotel = async(req = request, res = response) => {
   const {rol} = req.usuario;

   if (rol === "ADMIN") {
      const {id} = req.params;
  
      const hotelEliminado = await Hotel.findByIdAndDelete(id);
  
      res.json({
        hotelEliminado
      })
      
   } else {
      res.status(401).json({
         msg: 'Unauthorized you can only delete a hotel if u are admin'
      })
   }
 }

const getHotelPorNombre = async(req = request, res = response) =>{
  const {nombre} = req.body;

  const hotel = await Hotel.findOne({nombre});

  res.json({
    hotel
  })
}

 module.exports = {
    getHoteles,
    postHotel,
    putHotel,
    deleteHotel,
    getHotelPorNombre
 }
