/*
  Warnings:

  - The primary key for the `pacientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pacientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`pessoa_id`);
