const { Schema, model } = require("mongoose")


const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

module.exports = model('Factura', FacturaSchema)