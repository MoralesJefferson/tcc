/*
  Warnings:

  - You are about to drop the `Medicamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prescricoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Medicamentos` DROP FOREIGN KEY `Medicamentos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Prescricoes` DROP FOREIGN KEY `Prescricoes_ibfk_1`;

-- DropTable
DROP TABLE `Medicamentos`;

-- DropTable
DROP TABLE `Prescricoes`;

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `farmaceuticos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionario_id` INTEGER NOT NULL,
    `crf` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `crf`(`crf`),
    INDEX `funcionario_id`(`funcionario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoa_id` INTEGER NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `administrador` BOOLEAN NOT NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `pessoa_id`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionario_id` INTEGER NOT NULL,
    `crm` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `crm`(`crm`),
    INDEX `funcionario_id`(`funcionario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoa_id` INTEGER NOT NULL,
    `data_nascimento` DATE NOT NULL,

    INDEX `pessoa_id`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pessoas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `farmaceuticos` ADD CONSTRAINT `farmaceuticos_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicos` ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
