-- DropForeignKey
ALTER TABLE `tbAddresses` DROP FOREIGN KEY `tbAddresses_recipient_id_fkey`;

-- DropIndex
DROP INDEX `tbAddresses_recipient_id_fkey` ON `tbAddresses`;

-- AddForeignKey
ALTER TABLE `tbAddresses` ADD CONSTRAINT `tbAddresses_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `tbRecipients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
