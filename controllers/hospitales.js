const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Hospital = require('../models/hospital');


const getHospitales = (req, res) =>{
    res.json({
        ok: true,
        msg: 'getHospitales'
    })
}


const creartHospitales = async(req, res) =>{

    const uid =  req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

   
}


const actualizarHospitales = (req, res) =>{
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}


const borrarHospitales = (req, res) =>{
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}




module.exports = {
    getHospitales,
    creartHospitales,
    actualizarHospitales,
    borrarHospitales
}