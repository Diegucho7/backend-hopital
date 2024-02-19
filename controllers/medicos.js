const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Medicos = require('../models/medico');

const getMedicos = async (req, res) =>{

    const medicos = await Medicos.find()
                                    .populate('usuario','nombre apellido  ')
                                    .populate('hospital','nombre  ')
    res.json({
        ok: true,
        medicos
    })

}


const creartMedicos = async (req, res) =>{
    const uid =  req.uid;
    const medico = new Medicos({
        usuario:uid,
        ...req.body
    });
    

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarMedicos = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medicos.findById( id );
        if(!medico){
            res.status(500).json({
                ok: false,
                msg: 'Medico no encontrado'
                                })
                     }
                     
                     const cambiosMedico = {
                        ...req.body,
                        usuario: uid
                     }

                const medicoActualizado = await Medicos.findByIdAndUpdate( id, cambiosMedico,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Medico: medicoActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarMedicos = async(req, res) =>{

    const id  = req.params.id;

    try {

        const medico = await Medicos.findById( id );
        if(!medico){
            res.status(500).json({
                ok: false,
                msg: 'Hospital no encontrado'
                                })
                     }
                     
                    
                await Medicos.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Medico Eliminado'
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


    
}


const getMedicoById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const medico = await Medicos.findById(id)
                                        .populate('usuario','nombre apellido')
                                        .populate('hospital','nombre img');
        res.json({
            ok: true,
            medico
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador, médico no encontrado',
            error:error
        })
        }

}

module.exports = {
    getMedicos,
    creartMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
}