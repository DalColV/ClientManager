CREATE TABLE `Client` (
    `client_id` VARCHAR(191) NOT NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Asset` (
    `asset_id` VARCHAR(191) NOT NULL,
    `asset_name` VARCHAR(191) NOT NULL,
    `currentValue` DOUBLE NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`asset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Asset` ADD CONSTRAINT `Asset_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
