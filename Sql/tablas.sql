CREATE TABLE `Articulo` (
  `idArt` mediumint NOT NULL AUTO_INCREMENT,
  `Ingredientes` varchar(500) DEFAULT NULL,
  `Nombre` varchar(200) DEFAULT NULL,
  `Disponible` tinyint(1) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Foto` mediumblob,
  PRIMARY KEY (`idArt`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Cliente` (
  `Tel` varchar(200) NOT NULL,
  `Dir` varchar(500) DEFAULT NULL,
  `Nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Extra` (
  `idE` mediumint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  PRIMARY KEY (`idE`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Pedido` (
  `NumPedido` mediumint NOT NULL AUTO_INCREMENT,
  `Tel` varchar(200) DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `Total` double DEFAULT NULL,
  `HoraPedido` time DEFAULT NULL,
  `HoraAceptado` time DEFAULT NULL,
  `HoraPreparado` time DEFAULT NULL,
  `HoraLlegada` time DEFAULT NULL,
  PRIMARY KEY (`NumPedido`),
  KEY `Tel` (`Tel`),
  CONSTRAINT `Pedido_ibfk_1` FOREIGN KEY (`Tel`) REFERENCES `Cliente` (`Tel`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Pidio` (
  `idPidio` mediumint NOT NULL AUTO_INCREMENT,
  `idArt` mediumint DEFAULT NULL,
  `idPE` mediumint DEFAULT NULL,
  `NumPedido` mediumint DEFAULT NULL,
  PRIMARY KEY (`idPidio`),
  KEY `idArt_idx` (`idArt`),
  KEY `idPE_idx` (`idPE`),
  KEY `NumPedido_idx` (`NumPedido`),
  CONSTRAINT `idArt` FOREIGN KEY (`idArt`) REFERENCES `Articulo` (`idArt`),
  CONSTRAINT `idPE` FOREIGN KEY (`idPE`) REFERENCES `PidioExtra` (`idPE`),
  CONSTRAINT `NumPedido` FOREIGN KEY (`NumPedido`) REFERENCES `Pedido` (`NumPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PidioExtra` (
  `idPE` mediumint NOT NULL AUTO_INCREMENT,
  `Cant` int DEFAULT NULL,
  `idE` mediumint DEFAULT NULL,
  PRIMARY KEY (`idPE`),
  CONSTRAINT `idE` FOREIGN KEY (`idPE`) REFERENCES `Extra` (`idE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PuedeTenerExtra` (
  `idArt` mediumint NOT NULL,
  `idE` mediumint NOT NULL,
  PRIMARY KEY (`idArt`,`idE`),
  KEY `idE` (`idE`),
  CONSTRAINT `PuedeTenerExtra_ibfk_1` FOREIGN KEY (`idArt`) REFERENCES `Articulo` (`idArt`),
  CONSTRAINT `PuedeTenerExtra_ibfk_2` FOREIGN KEY (`idE`) REFERENCES `Extra` (`idE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Usuario` (
  `username` varchar(500) NOT NULL,
  `pass` varchar(500) DEFAULT NULL,
  `roll` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
