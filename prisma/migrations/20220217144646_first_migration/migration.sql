-- CreateTable
CREATE TABLE `Users` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `birthday` DATE NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'user',
    `bio` TEXT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `idOrder` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`idOrder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizations` (
    `idOrganization` INTEGER NOT NULL AUTO_INCREMENT,
    `siret` VARCHAR(14) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `idUser` INTEGER NOT NULL,

    UNIQUE INDEX `Organizations_siret_key`(`siret`),
    UNIQUE INDEX `Organizations_email_key`(`email`),
    PRIMARY KEY (`idOrganization`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Themes` (
    `idTheme` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idTheme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Draws` (
    `idDraw` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `idUser` INTEGER NOT NULL,
    `urlDraw` VARCHAR(255) NOT NULL,
    `idOrganization` INTEGER NOT NULL,
    `idTheme` INTEGER NOT NULL,

    PRIMARY KEY (`idDraw`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shirts` (
    `idShirt` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `idDraw` INTEGER NOT NULL,
    `idSize` INTEGER NOT NULL,

    PRIMARY KEY (`idShirt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sizes` (
    `idSize` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`idSize`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdersItems` (
    `idOrderItem` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `idShirt` INTEGER NOT NULL,
    `idOrder` INTEGER NOT NULL,

    PRIMARY KEY (`idOrderItem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizations` ADD CONSTRAINT `Organizations_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_idOrganization_fkey` FOREIGN KEY (`idOrganization`) REFERENCES `Organizations`(`idOrganization`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_idTheme_fkey` FOREIGN KEY (`idTheme`) REFERENCES `Themes`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shirts` ADD CONSTRAINT `Shirts_idDraw_fkey` FOREIGN KEY (`idDraw`) REFERENCES `Draws`(`idDraw`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shirts` ADD CONSTRAINT `Shirts_idSize_fkey` FOREIGN KEY (`idSize`) REFERENCES `Sizes`(`idSize`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersItems` ADD CONSTRAINT `OrdersItems_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `Orders`(`idOrder`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersItems` ADD CONSTRAINT `OrdersItems_idShirt_fkey` FOREIGN KEY (`idShirt`) REFERENCES `Shirts`(`idShirt`) ON DELETE RESTRICT ON UPDATE CASCADE;
