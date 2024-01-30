const { response } = require("express")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const login = async(req, res = response)=>{

    const {email, password} = req.body;


    try {

        //verificar Email
        const usuarioDB = await Usuario.findOne({ email });


        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña esta incorrecta'
            });
        }

        // Generar el TOKEN -JWT
        

        res.json({
            ok:true,
            msg: 'Hola mundo'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: ' Hable con el administrador'
        })

    }


}

module.exports = {
    login   
}