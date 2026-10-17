const Experiencia = require('../models/Experiencia');

// C - Crear una experiencia profesional
exports.crearExperiencia = async (req, res) => {
  try {
    const nuevaExperiencia = new Experiencia(req.body);
    const experienciaGuardada = await nuevaExperiencia.save();
    res.status(201).json({
      ok: true,
      data: experienciaGuardada
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    });
  }
};

// R - Obtener todas las experiencias profesionales
exports.obtenerExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.find().sort({ fechaInicio: -1 });
    res.status(200).json({
      ok: true,
      count: experiencias.length,
      data: experiencias
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error al obtener las experiencias'
    });
  }
};

// R - Obtener una experiencia por ID
exports.obtenerExperienciaPorId = async (req, res) => {
  try {
    const experiencia = await Experiencia.findById(req.params.id);
    if (!experiencia) {
      return res.status(404).json({
        ok: false,
        message: 'Experiencia no encontrada'
      });
    }
    res.status(200).json({
      ok: true,
      data: experiencia
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: 'ID no válido o error de servidor'
    });
  }
};

// U - Actualizar una experiencia por ID
exports.actualizarExperiencia = async (req, res) => {
  try {
    const experienciaActualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experienciaActualizada) {
      return res.status(404).json({
        ok: false,
        message: 'Experiencia no encontrada para actualizar'
      });
    }
    res.status(200).json({
      ok: true,
      data: experienciaActualizada
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    });
  }
};

// D - Eliminar una experiencia por ID
exports.eliminarExperiencia = async (req, res) => {
  try {
    const experienciaEliminada = await Experiencia.findByIdAndDelete(req.params.id);
    if (!experienciaEliminada) {
      return res.status(404).json({
        ok: false,
        message: 'Experiencia no encontrada para eliminar'
      });
    }
    res.status(200).json({
      ok: true,
      message: 'Experiencia eliminada correctamente'
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: 'ID no válido o error de servidor'
    });
  }
};