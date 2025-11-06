const RegistroLibro = require('../models/RegistroLibro');

const getAllRegistros = async (req, res) => {
  try {
    const registros = await RegistroLibro.getAll();
    res.json({
      success: true,
      data: registros,
      count: registros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los registros',
      message: error.message
    });
  }
};

const getRegistroById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await RegistroLibro.getById(id);

    if (!registro) {
      return res.status(404).json({
        success: false,
        error: 'Registro no encontrado'
      });
    }

    res.json({
      success: true,
      data: registro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el registro',
      message: error.message
    });
  }
};

const createRegistro = async (req, res) => {
  try {
    const { id_libro, id_usuario, accion, fecha_accion } = req.body;

    if (!id_libro || !id_usuario || !accion) {
      return res.status(400).json({
        success: false,
        error: 'El ID del libro, ID del usuario y la acción son requeridos'
      });
    }

    // Validar que la acción sea válida (prestado, devuelto, reservado, etc.)
    const accionesValidas = ['prestado', 'devuelto', 'reservado', 'cancelado'];
    if (!accionesValidas.includes(accion.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `La acción debe ser una de: ${accionesValidas.join(', ')}`
      });
    }

    const newId = await RegistroLibro.create({
      id_libro,
      id_usuario,
      accion: accion.toLowerCase(),
      fecha_accion
    });

    const newRegistro = await RegistroLibro.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Registro creado exitosamente',
      data: newRegistro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el registro',
      message: error.message
    });
  }
};

const updateRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_libro, id_usuario, accion, fecha_accion } = req.body;

    const exists = await RegistroLibro.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Registro no encontrado'
      });
    }

    if (accion) {
      const accionesValidas = ['prestado', 'devuelto', 'reservado', 'cancelado'];
      if (!accionesValidas.includes(accion.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: `La acción debe ser una de: ${accionesValidas.join(', ')}`
        });
      }
    }

    const updatedRegistro = await RegistroLibro.update(id, {
      id_libro,
      id_usuario,
      accion: accion ? accion.toLowerCase() : undefined,
      fecha_accion
    });

    res.json({
      success: true,
      message: 'Registro actualizado exitosamente',
      data: updatedRegistro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el registro',
      message: error.message
    });
  }
};

const deleteRegistro = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await RegistroLibro.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Registro no encontrado'
      });
    }

    await RegistroLibro.delete(id);

    res.json({
      success: true,
      message: 'Registro eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el registro',
      message: error.message
    });
  }
};

const getRegistrosByLibro = async (req, res) => {
  try {
    const { id_libro } = req.params;
    const registros = await RegistroLibro.getByLibro(id_libro);
    res.json({
      success: true,
      data: registros,
      count: registros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los registros del libro',
      message: error.message
    });
  }
};

const getRegistrosByUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const registros = await RegistroLibro.getByUsuario(id_usuario);
    res.json({
      success: true,
      data: registros,
      count: registros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los registros del usuario',
      message: error.message
    });
  }
};

module.exports = {
  getAllRegistros,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
  getRegistrosByLibro,
  getRegistrosByUsuario
};

