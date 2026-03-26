/*
  Warnings:

  - You are about to alter the column `status_novo` on the `tbDeliveryLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `tbDeliveries` MODIFY `status` ENUM('REQUESTED', 'AWAITING_PICKUP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED') NOT NULL DEFAULT 'REQUESTED';

-- AlterTable
ALTER TABLE `tbDeliveryLog` MODIFY `status_novo` ENUM('REQUESTED', 'AWAITING_PICKUP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED') NOT NULL;
