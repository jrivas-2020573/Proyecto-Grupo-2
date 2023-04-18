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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Hotel', HotelSchema)