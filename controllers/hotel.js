const { response, request } = require('express');
const Hotel = require('../models/hotel');


const getHoteles = async(req = request, res = response) =>{
   const listaHoteles = await Promise.all([
      Hotel.countDocuments(),
      Hotel.find()
  ]);

  res.json({
      listaHoteles
  });  
 }


 const postHotel = async (req = request, res = response) => {
   const {rol} = req.usuario;

   if (rol === "ADMIN") {
      const {nombre, direccion, precioHabitacion, habitacionesDispo} = req.body;
      const hotelDB = new Hotel({nombre, direccion, precioHabitacion, habitacionesDispo});
   
      await hotelDB.save();
   
      res.status(201).json({
         hotelDB
      });
   } else {
      res.status(401).json({
         msg: 'Unauthorized you can only create hotel if u are admin'
      })
   }

 }

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

 module.exports = {
    getHoteles,
    postHotel,
    putHotel,
    deleteHotel
 }
