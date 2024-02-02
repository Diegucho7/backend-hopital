/*
ruta:    /api/uploads/
*/
const {Router} = require ('express');
const expressFileUpload = require('express-fileupload');

const {validarJWT} =require('../middleware/validar-jwt');
const {fileUpload} = require('../controllers/uplaods')

 
const router = Router();

router.use( expressFileUpload() );

router.put( '/:tipo/:id',validarJWT ,fileUpload);


module.exports = router;    