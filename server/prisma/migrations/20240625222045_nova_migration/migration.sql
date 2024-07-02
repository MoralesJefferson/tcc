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

-- CreateTable
CREATE TABLE `Medicamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prescricao` INTEGER NOT NULL,
    `nome_medicamento` VARCHAR(255) NOT NULL,
    `forma_usar` TEXT NULL,

    INDEX `id_prescricao`(`id_prescricao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescricoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_medico` INTEGER NOT NULL,
    `data_hora_prescricao` DATETIME(0) NOT NULL,
    `data_hora_dispensacao` DATETIME(0) NULL,
    `status_prescricao` VARCHAR(20) NOT NULL,

    INDEX `id_medico`(`id_medico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Medicamentos` ADD CONSTRAINT `Medicamentos_ibfk_1` FOREIGN KEY (`id_prescricao`) REFERENCES `Prescricoes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Prescricoes` ADD CONSTRAINT `Prescricoes_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
