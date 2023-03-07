const { Schema, model } = require('mongoose');
const facturaSchema = Schema({
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El id del usuario es obligatorio']
    },
    productos: [{
      producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'el id del producto es obligatorio']
      },
      cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
      }
    }],
    fecha: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = model('Factura', facturaSchema);