const hotel = require("../models/hotel");
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

const esHotelValido = async(nombre = '') =>{
    const existeHotelDB = await hotel.findOne({nombre});
    if (!existeHotelDB) {
        throw new Error(`El hotel ${nombre} no existe`);
    }
}

const hotelExiste = async(nombre = '') => {
    const existeHotel = await hotel.findOne({nombre});
    if (existeHotel) {
        throw new Error(`${nombre} ya esta registrado en la base de datos`);
    }
}

module.exports = {
    emailExiste,
    RolValido,
    existeUserPorId,
    esHotelValido,
    hotelExiste
}