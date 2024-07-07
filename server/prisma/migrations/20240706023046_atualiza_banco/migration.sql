/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `pessoas` table. All the data in the column will be lost.
  - You are about to drop the `farmaceuticos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reg_profissional]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `funcao_id` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reg_profissional` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nm_pessoa` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `farmaceuticos` DROP FOREIGN KEY `farmaceuticos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `medicos` DROP FOREIGN KEY `medicos_ibfk_1`;

-- AlterTable
ALTER TABLE `funcionarios` ADD COLUMN `funcao_id` INTEGER NOT NULL,
    ADD COLUMN `reg_profissional` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `data_nascimento`,
    ADD COLUMN `cartao_sus` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `pessoas` DROP COLUMN `nome`,
    ADD COLUMN `cpf` VARCHAR(11) NULL,
    ADD COLUMN `dt_nascimento` DATE NULL,
    ADD COLUMN `nm_pessoa` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `farmaceuticos`;

-- DropTable
DROP TABLE `medicos`;

-- CreateTable
CREATE TABLE `funcoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_funcao` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `nm_funcao`(`nm_funcao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `reg_profissional` ON `funcionarios`(`reg_profissional`);

-- CreateIndex
CREATE INDEX `funcao_id` ON `funcionarios`(`funcao_id`);

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_ibfk_2` FOREIGN KEY (`funcao_id`) REFERENCES `funcoes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
