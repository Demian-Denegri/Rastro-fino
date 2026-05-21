USE [Rastro-Fino]

CREATE TABLE Categorias(
IdCategoria INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nombre VARCHAR (60) NOT NULL,
);
CREATE TABLE Genero (
IdGenero INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
Genero VARCHAR(30) NOT NULL,
);
CREATE TABLE Productos (
IdProducto INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nombre VARCHAR(90) NOT NULL,
Descripcion VARCHAR(200),
Precio Decimal(16,2) NOT NULL,
Stock INT NOT NULL,
Imagen VARCHAR(500),
IdCategoria INT NOT NULL REFERENCES Categorias(IdCategoria),
IdGenero INT NULL REFERENCES Genero(IdGenero),
Ml INT NULL, -- Mililitros del Producto
Activo BIT NOT NULL DEFAULT 1,-- si esta activo o no el producto
);
CREATE TABLE Clientes (
IdCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
Nombre VARCHAR(30)NOT NULL,
Apellido VARCHAR(50)NOT NULL,
Email VARCHAR (70) UNIQUE,
Telefono VARCHAR (20) NOT NULL,
Direccion VARCHAR(100),
)
CREATE TABLE Pedidos(
IdPedido INT PRIMARY KEY IDENTITY(1,1)  NOT NULL,
IdCliente INT NOT NULL REFERENCES Clientes(IdCliente),
Fecha DATETIME NOT NULL DEFAULT GETDATE(),
Estado VARCHAR(50) NOT NULL,
Total DECIMAL(16,2) NOT NULL,
)
CREATE TABLE DetallePedido (
IdDetalle INT IDENTITY PRIMARY KEY NOT NULL,
IdPedido INT REFERENCES Pedidos(IdPedido) NOT NULL,
IdProducto INT REFERENCES Productos(IdProducto) NOT NULL,
Cantidad INT NOT NULL,
PrecioUnitario DECIMAL(16,2) NOT NULL,

)

CREATE TABLE AdminUsuarios (
IdUsuario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
Email VARCHAR(50)  UNIQUE NOT NULL,
PasswordHash VARCHAR(50) NOT NULL,
Rol VARCHAR(30) NOT NULL DEFAULT('Admin'),
)

--------------------------------------------------------
-------------------VALORES DE PRUEBA--------------------
--------------------------------------------------------
INSERT INTO Categorias (Nombre) VALUES 
('Perfumes'),
('Decants'),
('Belleza y Cuidado Personal');

INSERT INTO Genero (Genero) VALUES 
('Hombre'),
('Mujer'),
('Mixto');

INSERT INTO AdminUsuarios (Email, PasswordHash, Rol) VALUES 
('admin@tienda.com', '1234', 'Admin');

INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, Imagen, IdCategoria, IdGenero, Ml, Activo) VALUES
('Acqua di Gio', 'Fragancia fresca y acuática', 85000.00, 10, NULL, 1, 1, 100, 1),
('Black Opium', 'Fragancia dulce e intensa', 92000.00, 8, NULL, 1, 2, 100, 1),
('Crema Hidratante', 'Crema corporal nutritiva', 15000.00, 20, NULL, 3, NULL, NULL, 1);

INSERT INTO Clientes (Nombre, Apellido, Email, Telefono, Direccion) VALUES
('Juan', 'Perez', 'juan@gmail.com', '1145678901', 'Av. Corrientes 1234');

INSERT INTO Pedidos (IdCliente, Estado, Total) VALUES
(1, 'Pendiente', 85000.00);

INSERT INTO DetallePedido (IdPedido, IdProducto, Cantidad, PrecioUnitario) VALUES
(1, 1, 1, 85000.00);

SELECT * FROM AdminUsuarios
SELECT * FROM Categorias
SELECT * FROM Clientes
SELECT * FROM DetallePedido
SELECT * FROM Genero
SELECT * FROM Pedidos
SELECT * FROM Productos
