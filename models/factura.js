const { Schema, model } = require("mongoose")


const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    reservacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
    }],
    total: {
        type: Number,
        require: true,
    },
    fecha: {
        type: Date,
        required: true
    }

})

module.exports = model('Factura', FacturaSchema)