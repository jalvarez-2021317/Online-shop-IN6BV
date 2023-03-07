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
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    }, 
    stock: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Producto', ProductoSchema)