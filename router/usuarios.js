const {getUsuarios,creartUsuarios, actualizarUsuario, borrarUsuarios} = require('../controllers/usuarios')
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');


const router = Router();

// Ruta = ./api/usuarios

router.get( '/', getUsuarios);
router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
] 
,creartUsuarios);

router.put( '/:id',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
]
,actualizarUsuario);

router.delete( '/:id',borrarUsuarios);




module.exports = router;