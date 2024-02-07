/*
Hospitales
ruta: '/api/hospitales'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getHospitales,
    creartHospitales,
    actualizarHospitales,
    borrarHospitales
} = require ('../controllers/hospitales')

const router = Router();

router.get( '/',validarJWT ,getHospitales);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
] 
,creartHospitales);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
]
,actualizarHospitales);

router.delete( '/:id',
[
    validarJWT
],
borrarHospitales);




module.exports = router;