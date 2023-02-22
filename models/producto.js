const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    Proveedor: {
        type: String,
        required: [true, 'El Proveedor es obligatorio'],
    },
    stock: {
        type: Number,
        required: [true, 'El Stock es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Producto', ProductoSchema)