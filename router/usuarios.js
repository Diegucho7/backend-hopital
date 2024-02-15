/*
    Usuarios
    Ruta = './api/usuarios'
*/

const {getUsuarios,crearUsuarios, actualizarUsuario, borrarUsuarios} = require('../controllers/usuarios')
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const router = Router();

router.get( '/',validarJWT ,getUsuarios);
router.post( '/', [
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
] 
,crearUsuarios);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
]
,actualizarUsuario);

router.delete( '/:id',
validarJWT,
borrarUsuarios);




module.exports = router;