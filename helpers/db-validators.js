const Role = require("../models/role");
const Usuario = require("../models/usuario")


const emailExiste = async(correo = '') => {
    const existeEmaildeUser = await Usuario.findOne({correo});
    if (existeEmaildeUser) {
        throw new Error(`${correo} ya esta registrado en la base de datos`);
    }
}

const RolValido = async(rol = '') => {
    if (rol != "") {
        const existeRol = await Role.findOne({rol});
        if (!existeRol) {
            throw new Error(`${rol} no es un rol valido`);
        }   
    }
}

const existeUserPorId = async(id) => {
    const existeIdDeUser = await Usuario.findById(id);
    if (!existeIdDeUser) {
        throw new Error(`El id: ${id} no existe en la base de datos`);
    }
}

module.exports = {
    emailExiste,
    RolValido,
    existeUserPorId
}