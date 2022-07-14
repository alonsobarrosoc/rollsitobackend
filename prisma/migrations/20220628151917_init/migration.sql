-- CreateTable
CREATE TABLE `Articulo` (
    `idArt` INTEGER NOT NULL AUTO_INCREMENT,
    `Ingredientes` VARCHAR(500) NOT NULL,
    `Nombre` VARCHAR(300) NOT NULL,
    `Disponible` BOOLEAN NOT NULL,
    `Precio` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`idArt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




