const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatorio']
    },
    seccion: {
        type: String,
        required: true,
        emun: ['Comestible', 'Ocio','esencial','bebible','literatia']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Categoria', CategoriaSchema)
