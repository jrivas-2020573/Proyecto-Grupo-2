const { Schema, model } = require('mongoose');

const HotelSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    precioHabitacion: {
        type: String,
        required: [true, 'El precio es obligatorio'],
        unique: true
    },
    habitacionesDispo: {
        type: Number,
        required: [true, 'El numero de habitaciones disponibles es obligatorio']
    }
});

module.exports = model('Hotel', HotelSchema)
