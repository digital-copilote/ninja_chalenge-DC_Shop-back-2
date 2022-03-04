/*
  Warnings:

  - Added the required column `color` to the `Themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconUrl` to the `Themes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Draws` DROP FOREIGN KEY `Draws_idOrganization_fkey`;

-- AlterTable
ALTER TABLE `Draws` MODIFY `idOrganization` INTEGER NULL;

-- AlterTable
ALTER TABLE `Themes` ADD COLUMN `color` VARCHAR(15) NOT NULL,
    ADD COLUMN `iconUrl` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_idOrganization_fkey` FOREIGN KEY (`idOrganization`) REFERENCES `Organizations`(`idOrganization`) ON DELETE SET NULL ON UPDATE CASCADE;
