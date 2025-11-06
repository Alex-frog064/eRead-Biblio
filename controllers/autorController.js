const Autor = require('../models/Autor');

const getAllAutores = async (req, res) => {
  try {
    const autores = await Autor.getAll();
    res.json({
      success: true,
      data: autores,
      count: autores.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los autores',
      message: error.message
    });
  }
};

const getAutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.getById(id);

    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor no encontrado'
      });
    }

    res.json({
      success: true,
      data: autor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el autor',
      message: error.message
    });
  }
};

const createAutor = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;

    if (!nombre || !apellido) {
      return res.status(400).json({
        success: false,
        error: 'El nombre y apellido son requeridos'
      });
    }

    const newId = await Autor.create({ nombre, apellido });
    const newAutor = await Autor.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Autor creado exitosamente',
      data: newAutor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el autor',
      message: error.message
    });
  }
};

const updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;

    const exists = await Autor.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Autor no encontrado'
      });
    }

    if (!nombre || !apellido) {
      return res.status(400).json({
        success: false,
        error: 'El nombre y apellido son requeridos'
      });
    }

    const updatedAutor = await Autor.update(id, { nombre, apellido });

    res.json({
      success: true,
      message: 'Autor actualizado exitosamente',
      data: updatedAutor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el autor',
      message: error.message
    });
  }
};

const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Autor.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Autor no encontrado'
      });
    }

    await Autor.delete(id);

    res.json({
      success: true,
      message: 'Autor eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el autor',
      message: error.message
    });
  }
};

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
};

