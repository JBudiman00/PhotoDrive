/*
  Warnings:

  - Added the required column `img` to the `Photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Photos` ADD COLUMN `img` VARCHAR(255) NOT NULL;