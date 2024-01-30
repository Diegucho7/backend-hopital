const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const Usuario = require('../models/usuario');


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

    const { email, password } = req.body;
   
   
    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );    
    
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


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

const actualizarUsuario = async (req, res = response) => {
    
    //TODO: Validar Token y comprobar si es el usuario correcto

    const uid = req.params.id;
    

    try {
        
        const usuarioDB = await Usuario.findById(uid);
        

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });
        }
        // Actualizaciones

        const { password, google, email,  ...campos} = req.body;

        if( usuarioDB.email !== email ){
       
            const existeEmail = await Usuario.findOne({email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        
        res.json({
            ok:true,
            usuario: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    getUsuarios,
    creartUsuarios,
    actualizarUsuario
}