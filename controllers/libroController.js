const Libro = require('../models/Libro');

const getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.getAll();
    res.json({
      success: true,
      data: libros,
      count: libros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los libros',
      message: error.message
    });
  }
};

const getLibroById = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.getById(id);

    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el libro',
      message: error.message
    });
  }
};

const createLibro = async (req, res) => {
  try {
    const { titulo, isbn, id_autor, id_categoria, año, editorial, disponible } = req.body;

    if (!titulo) {
      return res.status(400).json({
        success: false,
        error: 'El título es requerido'
      });
    }

    const newId = await Libro.create({
      titulo,
      isbn: isbn || null,
      id_autor: id_autor || null,
      id_categoria: id_categoria || null,
      año: año || null,
      editorial: editorial || null,
      disponible: disponible !== undefined ? disponible : 1
    });

    const newLibro = await Libro.getById(newId);

    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: newLibro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el libro',
      message: error.message
    });
  }
};

const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, isbn, id_autor, id_categoria, año, editorial, disponible } = req.body;

    const exists = await Libro.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    const updatedLibro = await Libro.update(id, {
      titulo,
      isbn,
      id_autor,
      id_categoria,
      año,
      editorial,
      disponible
    });

    res.json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: updatedLibro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el libro',
      message: error.message
    });
  }
};

const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Libro.exists(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    await Libro.delete(id);

    res.json({
      success: true,
      message: 'Libro eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el libro',
      message: error.message
    });
  }
};

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};

