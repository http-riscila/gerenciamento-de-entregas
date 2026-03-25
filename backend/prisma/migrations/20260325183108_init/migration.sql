-- CreateTable
CREATE TABLE `tbRecipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tbRecipients_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbAddresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipient_id` INTEGER NOT NULL,
    `street` VARCHAR(200) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `neighborhood` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'LOGISTICS', 'DRIVER') NOT NULL,

    UNIQUE INDEX `tbUsers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbDeliveries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recipient_id` INTEGER NOT NULL,
    `driver_id` INTEGER NULL,
    `status` ENUM('REQUESTED', 'AWAITING_PICKUP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED') NOT NULL DEFAULT 'REQUESTED',
    `modified_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbDeliveryLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `delivery_id` INTEGER NOT NULL,
    `status_novo` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `modified_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `note` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbAddresses` ADD CONSTRAINT `tbAddresses_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `tbRecipients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbDeliveries` ADD CONSTRAINT `tbDeliveries_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `tbRecipients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbDeliveries` ADD CONSTRAINT `tbDeliveries_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `tbUsers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbDeliveryLog` ADD CONSTRAINT `tbDeliveryLog_delivery_id_fkey` FOREIGN KEY (`delivery_id`) REFERENCES `tbDeliveries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbDeliveryLog` ADD CONSTRAINT `tbDeliveryLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
