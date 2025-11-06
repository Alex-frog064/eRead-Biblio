const Rol = require('../models/Rol');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.getAll();
    res.json({
      success: true,
      data: roles,
      count: roles.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los roles',
      message: error.message
    });
  }
};

const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.getById(id);

    if (!rol) {
      return res.status(404).json({
        success: false,
        error: 'Rol no encontrado'
      });
    }

    res.json({
      success: true,
      data: rol
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el rol',
      message: error.message
    });
  }
};

const createRol = async (req, res) => {
  try {
    const { nombre_rol } = req.body;

    if (!nombre_rol) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del rol es requerido'
      });
    }

    const newId = await Rol.create({ nombre_rol });
    const newRol = await Rol.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Rol creado exitosamente',
      data: newRol
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el rol',
      message: error.message
    });
  }
};

const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_rol } = req.body;

    const exists = await Rol.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Rol no encontrado'
      });
    }

    if (!nombre_rol) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del rol es requerido'
      });
    }

    const updatedRol = await Rol.update(id, { nombre_rol });

    res.json({
      success: true,
      message: 'Rol actualizado exitosamente',
      data: updatedRol
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el rol',
      message: error.message
    });
  }
};

const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Rol.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Rol no encontrado'
      });
    }

    await Rol.delete(id);

    res.json({
      success: true,
      message: 'Rol eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el rol',
      message: error.message
    });
  }
};

module.exports = {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};

