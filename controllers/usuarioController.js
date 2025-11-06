const Usuario = require('../models/Usuario');

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los usuarios',
      message: error.message
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.getById(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el usuario',
      message: error.message
    });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nombre_usuario, correo, contrasena, id_rol } = req.body;

    if (!nombre_usuario || !correo || !contrasena) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de usuario, correo y contraseña son requeridos'
      });
    }

    // Verificar si el correo ya existe
    const existingUser = await Usuario.findByEmail(correo);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'El correo ya está registrado'
      });
    }

    const newId = await Usuario.create({
      nombre_usuario,
      correo,
      contrasena,
      id_rol: id_rol || null
    });

    const newUsuario = await Usuario.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUsuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el usuario',
      message: error.message
    });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_usuario, correo, contrasena, id_rol } = req.body;

    const exists = await Usuario.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    if (!nombre_usuario || !correo) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de usuario y correo son requeridos'
      });
    }

    // Verificar si el correo ya existe en otro usuario
    const existingUser = await Usuario.findByEmail(correo);
    if (existingUser && existingUser.id_usuario !== parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: 'El correo ya está registrado por otro usuario'
      });
    }

    const updatedUsuario = await Usuario.update(id, {
      nombre_usuario,
      correo,
      contrasena,
      id_rol
    });

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUsuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el usuario',
      message: error.message
    });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Usuario.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    await Usuario.delete(id);

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el usuario',
      message: error.message
    });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};

