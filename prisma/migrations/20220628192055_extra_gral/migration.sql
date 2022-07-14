/*
  Warnings:

  - Added the required column `General` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Extra` ADD COLUMN `General` BOOLEAN NOT NULL;
