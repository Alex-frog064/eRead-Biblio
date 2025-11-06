const Categoria = require('../models/Categoria');

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.json({
      success: true,
      data: categorias,
      count: categorias.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las categorías',
      message: error.message
    });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.getById(id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada'
      });
    }

    res.json({
      success: true,
      data: categoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la categoría',
      message: error.message
    });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;

    if (!nombre_categoria) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de la categoría es requerido'
      });
    }

    const newId = await Categoria.create({ nombre_categoria });
    const newCategoria = await Categoria.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: newCategoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear la categoría',
      message: error.message
    });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_categoria } = req.body;

    const exists = await Categoria.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada'
      });
    }

    if (!nombre_categoria) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de la categoría es requerido'
      });
    }

    const updatedCategoria = await Categoria.update(id, { nombre_categoria });

    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: updatedCategoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la categoría',
      message: error.message
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Categoria.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada'
      });
    }

    await Categoria.delete(id);

    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la categoría',
      message: error.message
    });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};

