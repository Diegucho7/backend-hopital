const {response} = require('express')
const Usuario = require('../models/usuario')

const getUsuarios = async (req, res) =>{

    // En el caso que quiera filtrar detos de mi consulta

    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const usuario = await Usuario.find();

    res.json({
        ok:true,
        usuario
    })

}
const creartUsuarios = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
    
    
        // Guardar usuario
        await usuario.save();

 


        res.json({
            ok: true,
            usuario
            
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


module.exports = {
    getUsuarios,
    creartUsuarios
}