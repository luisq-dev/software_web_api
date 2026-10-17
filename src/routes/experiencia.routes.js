const express = require('express');
const router = express.Router();
const experienciaController = require('../controllers/experiencia.controller');

router.post('/', experienciaController.crearExperiencia);
router.get('/', experienciaController.obtenerExperiencias);
router.get('/:id', experienciaController.obtenerExperienciaPorId);
router.put('/:id', experienciaController.actualizarExperiencia);
router.delete('/:id', experienciaController.eliminarExperiencia);

module.exports = router;
