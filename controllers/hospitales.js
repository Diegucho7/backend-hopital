const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Hospital = require('../models/hospital');


const getHospitales =  async (req, res) =>{
    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre ')
    res.json({
        ok: true,   
        hospitales
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


const actualizarHospitales = async(req, res) =>{

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );
        if(!hospital){
            res.status(500).json({
                ok: false,
                msg: 'Hospital no encontrado'
                                })
                     }
                     
                     const cambiosHopital = {
                        ...req.body,
                        usuario: uid
                     }

                const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHopital,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            hospital: hospitalActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const borrarHospitales = async(req, res) =>{
    
    const id  = req.params.id;

    try {

        const hospital = await Hospital.findById( id );
        if(!hospital){
            res.status(500).json({
                ok: false,
                msg: 'Hospital no encontrado'
                                })
                     }
                     
                    
                await Hospital.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Hospital Eliminado'
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




module.exports = {
    getHospitales,
    creartHospitales,
    actualizarHospitales,
    borrarHospitales
}