SET FOREIGN_KEY_CHECKS=0;
-- CreateTable
CREATE TABLE `AccountUser` (
    `id` VARCHAR(72) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `nationalIdNumber` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountUser_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlgerianWilaya` (
    `id` VARCHAR(72) NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `nameAr` VARCHAR(255) NOT NULL,
    `communes` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AlgerianWilaya_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TireStock` (
    `id` VARCHAR(72) NOT NULL,
    `brand` ENUM('CONTINENTAL', 'IRIS') NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `category` ENUM('TOURISM', 'UTILITY', 'SUV') NOT NULL,
    `priceDzd` DECIMAL(12, 2) NOT NULL,
    `availableStock` INTEGER NOT NULL DEFAULT 0,
    `reservedStock` INTEGER NOT NULL DEFAULT 0,
    `minThreshold` INTEGER NOT NULL DEFAULT 0,
    `speedIndex` VARCHAR(255) NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformFaq` (
    `id` VARCHAR(72) NOT NULL,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `category` ENUM('ORDERS', 'PAYMENT', 'DELIVERY', 'WARRANTY') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupportChannel` (
    `id` VARCHAR(72) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TireOrder` (
    `id` VARCHAR(72) NOT NULL,
    `orderNumber` VARCHAR(64) NOT NULL,
    `customerName` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(32) NOT NULL,
    `secondaryPhone` VARCHAR(32) NOT NULL,
    `wilaya` VARCHAR(255) NOT NULL,
    `commune` VARCHAR(255) NOT NULL,
    `brand` ENUM('CONTINENTAL', 'IRIS') NOT NULL,
    `tireSize` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPriceDzd` DECIMAL(12, 2) NOT NULL,
    `totalPriceDzd` DECIMAL(12, 2) NOT NULL,
    `nationalIdNumber` VARCHAR(64) NOT NULL,
    `dahabiaCardNumber` VARCHAR(64) NOT NULL,
    `dahabiaExpiry` VARCHAR(16) NOT NULL,
    `status` ENUM('NEW', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'NEW',
    `notes` TEXT NULL,
    `customerId` VARCHAR(72) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TireOrder_orderNumber_key`(`orderNumber`),
    INDEX `TireOrder_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TireOrder` ADD CONSTRAINT `TireOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `AccountUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;