//Importacion
const { response, request } = require('express');
//Modelos
const Producto = require('../models/producto');

const obtenerProductos = async (req = request, res = response) => {

    //Condición, me busca solo los categorias que tengan estado en true
    const query = { stock: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        
    ]);

    res.json({
        msg: 'GET API de Producto',
        listaProductos
    });


}

const obtenerProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)

    res.json({
        msg: 'Producto por id',
        producto: producto
    });

}


const crearProducto = async (req = request, res = response) => {

    const { nombre, proveedor,categoria } = req.body;
    const productoDB = new Producto({ nombre, proveedor,categoria });

    //Validación para encontar una cateroia por nombre en la DB
    //Generar la data a guardar

    //Guardar en DB
    await productoDB.save();

    res.status(201).json({
        msg: 'Post de Producto',
        productoDB
    });

}


const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, stock, ...resto } = req.body;


    //editar y guardar
    const productoEditado = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Prodcuto',
      productoEditado
    });

}


const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate(id, { stock: false });

    res.json({
        msg: 'delete Producto',
        productoEliminado
    });

}



module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}