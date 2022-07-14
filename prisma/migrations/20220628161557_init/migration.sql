-- CreateTable
CREATE TABLE `Articulo` (
    `idArt` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `Ingredientes` VARCHAR(500) NULL,
    `Nombre` VARCHAR(200) NULL,
    `Disponible` BOOLEAN NULL,
    `Precio` DOUBLE NULL,
    `Foto` MEDIUMBLOB NULL,

    PRIMARY KEY (`idArt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `Tel` VARCHAR(200) NOT NULL,
    `Dir` VARCHAR(500) NULL,
    `Nombre` VARCHAR(200) NULL,

    PRIMARY KEY (`Tel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extra` (
    `idE` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(200) NULL,
    `Descripcion` VARCHAR(500) NULL,
    `Precio` DOUBLE NULL,

    PRIMARY KEY (`idE`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `NumPedido` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `Tel` VARCHAR(200) NULL,
    `Estado` VARCHAR(100) NULL,
    `Total` DOUBLE NULL,
    `HoraPedido` TIME(0) NULL,
    `HoraAceptado` TIME(0) NULL,
    `HoraPreparado` TIME(0) NULL,
    `HoraLlegada` TIME(0) NULL,

    INDEX `Tel`(`Tel`),
    PRIMARY KEY (`NumPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pidio` (
    `idPidio` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `idArt` MEDIUMINT NULL,
    `idPE` MEDIUMINT NULL,
    `NumPedido` MEDIUMINT NULL,

    INDEX `NumPedido_idx`(`NumPedido`),
    INDEX `idArt_idx`(`idArt`),
    INDEX `idPE_idx`(`idPE`),
    PRIMARY KEY (`idPidio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PidioExtra` (
    `idPE` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `Cant` INTEGER NULL,
    `idE` MEDIUMINT NULL,

    PRIMARY KEY (`idPE`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PuedeTenerExtra` (
    `idArt` MEDIUMINT NOT NULL,
    `idE` MEDIUMINT NOT NULL,

    INDEX `idE`(`idE`),
    PRIMARY KEY (`idArt`, `idE`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `username` VARCHAR(500) NOT NULL,
    `pass` VARCHAR(500) NULL,
    `roll` VARCHAR(45) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_ibfk_1` FOREIGN KEY (`Tel`) REFERENCES `Cliente`(`Tel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pidio` ADD CONSTRAINT `idArt` FOREIGN KEY (`idArt`) REFERENCES `Articulo`(`idArt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pidio` ADD CONSTRAINT `NumPedido` FOREIGN KEY (`NumPedido`) REFERENCES `Pedido`(`NumPedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pidio` ADD CONSTRAINT `idPE` FOREIGN KEY (`idPE`) REFERENCES `PidioExtra`(`idPE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PidioExtra` ADD CONSTRAINT `idE` FOREIGN KEY (`idPE`) REFERENCES `Extra`(`idE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PuedeTenerExtra` ADD CONSTRAINT `PuedeTenerExtra_ibfk_1` FOREIGN KEY (`idArt`) REFERENCES `Articulo`(`idArt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PuedeTenerExtra` ADD CONSTRAINT `PuedeTenerExtra_ibfk_2` FOREIGN KEY (`idE`) REFERENCES `Extra`(`idE`) ON DELETE NO ACTION ON UPDATE NO ACTION;
