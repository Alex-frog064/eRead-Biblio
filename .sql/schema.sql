-- Script SQL para crear todas las tablas de la base de datos
-- Ejecutar este script en tu base de datos MySQL de Clever Cloud

-- Tabla: autor
CREATE TABLE IF NOT EXISTS autor (
  id_autor INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  INDEX idx_nombre (nombre),
  INDEX idx_apellido (apellido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: categoria
CREATE TABLE IF NOT EXISTS categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(255) NOT NULL,
  INDEX idx_nombre_categoria (nombre_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: rol
CREATE TABLE IF NOT EXISTS rol (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre_rol VARCHAR(100) NOT NULL,
  INDEX idx_nombre_rol (nombre_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  id_rol INT,
  INDEX idx_correo (correo),
  INDEX idx_id_rol (id_rol),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: libro
CREATE TABLE IF NOT EXISTS libro (
  id_libro INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  isbn VARCHAR(50),
  id_autor INT,
  id_categoria INT,
  año INT,
  editorial VARCHAR(255),
  disponible TINYINT(1) DEFAULT 1,
  INDEX idx_titulo (titulo),
  INDEX idx_isbn (isbn),
  INDEX idx_id_autor (id_autor),
  INDEX idx_id_categoria (id_categoria),
  INDEX idx_disponible (disponible),
  FOREIGN KEY (id_autor) REFERENCES autor(id_autor) ON DELETE SET NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: registro_libro
CREATE TABLE IF NOT EXISTS registro_libro (
  id_registro INT AUTO_INCREMENT PRIMARY KEY,
  id_libro INT NOT NULL,
  id_usuario INT NOT NULL,
  accion ENUM('prestado', 'devuelto', 'reservado', 'cancelado') NOT NULL,
  fecha_accion DATE NOT NULL,
  INDEX idx_id_libro (id_libro),
  INDEX idx_id_usuario (id_usuario),
  INDEX idx_accion (accion),
  INDEX idx_fecha_accion (fecha_accion),
  FOREIGN KEY (id_libro) REFERENCES libro(id_libro) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo (opcional)
-- Insertar roles básicos
INSERT INTO rol (nombre_rol) VALUES
('Administrador'),
('Bibliotecario'),
('Usuario')
ON DUPLICATE KEY UPDATE nombre_rol=nombre_rol;

-- Insertar categorías de ejemplo
INSERT INTO categoria (nombre_categoria) VALUES
('Novela'),
('Ciencia Ficción'),
('Historia'),
('Biografía'),
('Poesía')
ON DUPLICATE KEY UPDATE nombre_categoria=nombre_categoria;

-- Insertar autores de ejemplo
INSERT INTO autor (nombre, apellido) VALUES
('Gabriel', 'García Márquez'),
('Isabel', 'Allende'),
('Mario', 'Vargas Llosa'),
('Jorge Luis', 'Borges'),
('Pablo', 'Neruda')
ON DUPLICATE KEY UPDATE nombre=nombre, apellido=apellido;
