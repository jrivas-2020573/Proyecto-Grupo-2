const { response, request } = require('express');
const Hotel = require('../models/hotel')

const getHoteles = async(req = request, res = response) =>{
    const query = {estado: true};

    const listaHoteles = await Promise.all([
        Hotel.countDocuments(query),
        Hotel.find(query)
    ]);

    res.json({
        msg: 'GET Hoteles',
        listaHoteles
    });
 }

 const getHotelPorNombre = async(req = request, res = response) => {

    const {nombre} = req.body;

    const buscarHotel = await Hotel.findOne({nombre})

    res.json({
        buscarHotel
    })
}

 const postHotel = async (req = request, res = response) => {
    const {direccion, ...body} = req.body;

    //validación si existe un hotel en la db
    const hotelDB = await Hotel.findOne( { nombre: body.nombre } );

    if ( hotelDB ) {
        return res.status(400).json({
            mensajeError: `El hotel ${ hotelDB.nombre } ya existe en la DB`
        });
    }


    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const hotel = new Hotel( data );
    //Guardar en DB
    await hotel.save();

    res.status(201).json({
        msg: 'POST user',
        usuarioDB
    });
 }

 const putHotel = async (req = request, res = response) => {
    
 }

 const deleteHotel = async(req = request, res = response) => {
    const {id} = req.params;

    const hotelEliminado = await Hotel.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE hotel',
        hotelEliminado
    });
 }

 module.exports = {
    getHoteles,
    getHotelPorNombre,
    postHotel,
    putHotel,
    deleteHotel
 }