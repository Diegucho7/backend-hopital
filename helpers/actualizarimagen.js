const fs = require('fs')
const { model } = require("mongoose");
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const hospital = require('../models/hospital');

let pathViejo = '';
const borarImagen = (path) =>{
    
    
    // const pathViejo = `./uploads/medicos/${medico.img}`;
            if(fs.existsSync(path)){
                //borrar la imagen anterior
                fs.unlinkSync(path);
            }
}

const actualizarImagen = async(tipo, id, nombreArchivo) =>{


    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No es un médico por id');
                return false;
            }            
             pathViejo = `./uploads/medicos/${medico.img}`;
            
            borarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No es un usuario por id');
                return false;
            }        

             pathViejo = `./uploads/usuario/${usuario.img}`;
            
            borarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No es un hospital por id');
                return false;
            }        

             pathViejo = `./uploads/hospital/${hospital.img}`;
            
            borarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
    
        default:
            break;
    }


}






module.exports = {
    actualizarImagen
}