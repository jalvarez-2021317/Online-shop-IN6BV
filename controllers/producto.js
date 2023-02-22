//Importacion
const { response, request } = require('express');
//Modelos
const Producto = require('../models/producto');

const obtenerProductos = async (req = request, res = response) => {

    //Condición, me busca solo los categorias que tengan estado en true
    const query = { estado: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaProductos: listaProductos
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

    const nombre = req.body.nombre.toUpperCase();

    //Validación para encontar una cateroia por nombre en la DB
    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre}, ya existe en la DB`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    //Guardar en DB
    await producto.save();

    res.status(201).json({
        msg: 'Post de categoria',
        categoria: producto
    });

}


const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase(); //cambiamos el nombre todo a mayusculas
    data.usuario = req.usuario._id; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de categoria                                         // new: true Sirve para enviar el nuevo documento actualizado     
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'Put de categoria',
        categoria: producto
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