const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Medicos = require('../models/medicos');

const getMedicos = (req, res) =>{
    res.json({
        ok: true,
        msg: 'getMedicos'
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


const actualizarMedicos = (req, res) =>{
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}


const borrarMedicos = (req, res) =>{
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })
}




module.exports = {
    getMedicos,
    creartMedicos,
    actualizarMedicos,
    borrarMedicos
}