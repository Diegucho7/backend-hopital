const {getUsuarios,creartUsuarios} = require('../controllers/usuarios')
const {Router} = require('express');
const {check} = require('express-validator');

const router = Router();

// Ruta = ./api/usuarios

router.get( '/', getUsuarios);
router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
] 
,creartUsuarios);




module.exports = router;