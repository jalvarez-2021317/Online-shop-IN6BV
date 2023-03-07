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
        msg: 'GET API de usuarios',
        listaProductos
    });


}

const obtenerProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre');

    res.json({
        msg: 'categoria por id',
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
        msg: 'Post de categoria',
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
        msg: 'PUT API de usuario',
      productoEditado
    });

}


const eliminarProducto = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'delete categoria',
        id
    });

}



module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}