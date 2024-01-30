const { response } = require("express")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt')

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
    
    const token = await generarJwt(usuarioDB.id);

        res.json({
            ok:true,
            token
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