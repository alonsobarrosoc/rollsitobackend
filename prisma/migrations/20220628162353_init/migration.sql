/*
  Warnings:

  - You are about to alter the column `HoraPedido` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Pedido` MODIFY `HoraPedido` DATETIME(3) NULL;
