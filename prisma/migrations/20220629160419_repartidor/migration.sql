-- AlterTable
ALTER TABLE `Pedido` ADD COLUMN `NumRepartidor` VARCHAR(200) NULL;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_NumRepartidor_fkey` FOREIGN KEY (`NumRepartidor`) REFERENCES `Repartidor`(`Tel`) ON DELETE SET NULL ON UPDATE CASCADE;
