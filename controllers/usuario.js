const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) =>{

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ]);

    res.json({
        msg: 'GET users',
        listaUsuarios
    });
 }

 const postUsuario = async (req = request, res = response) => {
    if (req.body.rol == "") {
        req.body.rol = "HUÉSPED"
    }

    const {nombre, correo, password, rol} = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST user',
        usuarioDB
    });
 }

 const putUsuario = async (req = request, res = response) => {
    const {id} = req.params;
    const user = req.usuario._id;
    const idUser = user.toString();

    if (id === idUser) {
        const {_id, role,...resto} = req.body;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
        const userEditado = await Usuario.findByIdAndUpdate(id, resto, {new: true});
        res.status(200).json({
            msg: 'User updated',
            userEditado
        })
    } else{
        res.status(401).json({
            msg: 'Unauthorized you can only update your own account'

        })
    }
 }

 const deleteUsuario = async(req = request, res = response) => {
    const {id} = req.params;
    const user = req.usuario._id;
    const idUser = user.toString();

    if(id === idUser){
        const userEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'User deleted',
            userEliminado
        })
    }else{
        res.status(401).json({
            msg: 'Unauthorized you can only delete your own account'

        })
    }
 }

 module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
 }