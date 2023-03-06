const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'El Proveedor es obligatorio'],
    },
    stock: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Producto', ProductoSchema)