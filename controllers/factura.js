//Importacion
const { response, request } = require('express');
//Modelos
const Factura = require('../models/factura');

const obtenerFactura = async (req = request, res = response) => {
    try {
        const facturas = await Factura.find();
        
        res.status(200).json({
            msg: 'GET API de Facturas',
            facturas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const obtenerFacturaPorId = async (req = request, res = response) => {

    const { usuarioId } = req.params;

    const facturas = await Factura.find({ usuario: usuarioId }).populate('productos.producto');

    res.json(facturas);

}

const crearFactura = async (req = request, res = response) => {

//     const { usuario, productos } = req.body;
  
//   // Crea un objeto de factura y guarda en la base de datos
//   const factura = new Factura({
//     usuario: usuario,
//     productos: productos.map(p => ({ producto: p.productoId })),
//   });
//   await factura.save();

//   res.json(factura);


  const data = {
    
    usuario: req.usuario._id,
    productos: req.body
}

const producto = new Factura(data);
//Guardar en DB
await producto.save();

res.status(201).json({
    msg: 'Post de categoria',
     producto
});
}

const actualizarFactura = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { usuario, fecha, ...resto } = req.body;


    //editar y guardar
    const facturaEditada = await Factura.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Facturas',
       facturaEditada
    });

}

const eliminarFactura= async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const facturaEliminada = await Factura.findByIdAndDelete(id);
        if (!facturaEliminada) {
          return res.status(404).json({ mensaje: 'Factura no encontrada' });
        }
        res.json({ mensaje: 'Factura eliminada correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la factura' });
      }

}



module.exports = {
    obtenerFactura,
    obtenerFacturaPorId,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}