/*
  Warnings:

  - The primary key for the `estoques` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estoque_id` on the `estoques` table. All the data in the column will be lost.
  - You are about to drop the `medicamentos_falta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescricao_medicamentos_falta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forma_uso` to the `prescricao_medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `prescricao_medicamentos_falta` DROP FOREIGN KEY `prescricao_medicamentos_falta_ibfk_1`;

-- DropForeignKey
ALTER TABLE `prescricao_medicamentos_falta` DROP FOREIGN KEY `prescricao_medicamentos_falta_ibfk_2`;

-- AlterTable
ALTER TABLE `estoques` DROP PRIMARY KEY,
    DROP COLUMN `estoque_id`,
    ADD PRIMARY KEY (`farmacia_id`, `medicamento_id`);

-- AlterTable
ALTER TABLE `prescricao_medicamentos` ADD COLUMN `forma_uso` TEXT NOT NULL;

-- DropTable
DROP TABLE `medicamentos_falta`;

-- DropTable
DROP TABLE `prescricao_medicamentos_falta`;
