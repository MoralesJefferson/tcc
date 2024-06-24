-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(180) NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `crm` VARCHAR(20) NULL,
    `crf` VARCHAR(20) NULL,
    `administrador` BOOLEAN NULL DEFAULT false,
    `senha` VARCHAR(180) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
