const {getUsuarios,creartUsuarios, actualizarUsuario, borrarUsuarios} = require('../controllers/usuarios')
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');


const router = Router();

// Ruta = ./api/usuarios

router.get( '/',validarJWT ,getUsuarios);
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
] 
,creartUsuarios);

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