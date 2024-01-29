const {getUsuarios,creartUsuarios} = require('../controllers/usuarios')
const {Router} = require('express');

const router = Router();

// Ruta = ./api/usuarios

router.get( '/', getUsuarios);
router.post( '/', creartUsuarios);




module.exports = router;