-- CreateTable
CREATE TABLE `Users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `birthday` DATE NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'user',
    `bio` TEXT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id_order` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisations` (
    `id_organisation` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_organisation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Themes` (
    `id_theme` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_theme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Draws` (
    `id_draw` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_organisation` INTEGER NOT NULL,
    `id_theme` INTEGER NOT NULL,

    PRIMARY KEY (`id_draw`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shirts` (
    `id_shirt` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `id_draw` INTEGER NOT NULL,
    `id_size` INTEGER NOT NULL,

    PRIMARY KEY (`id_shirt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sizes` (
    `id_size` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id_size`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id_orders_has_shirts` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `id_shirt` INTEGER NOT NULL,
    `id_order` INTEGER NOT NULL,

    PRIMARY KEY (`id_orders_has_shirts`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisations` ADD CONSTRAINT `Organisations_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_id_organisation_fkey` FOREIGN KEY (`id_organisation`) REFERENCES `Organisations`(`id_organisation`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Draws` ADD CONSTRAINT `Draws_id_theme_fkey` FOREIGN KEY (`id_theme`) REFERENCES `Themes`(`id_theme`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shirts` ADD CONSTRAINT `Shirts_id_draw_fkey` FOREIGN KEY (`id_draw`) REFERENCES `Draws`(`id_draw`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shirts` ADD CONSTRAINT `Shirts_id_size_fkey` FOREIGN KEY (`id_size`) REFERENCES `Sizes`(`id_size`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `Orders`(`id_order`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_id_shirt_fkey` FOREIGN KEY (`id_shirt`) REFERENCES `Shirts`(`id_shirt`) ON DELETE RESTRICT ON UPDATE CASCADE;
