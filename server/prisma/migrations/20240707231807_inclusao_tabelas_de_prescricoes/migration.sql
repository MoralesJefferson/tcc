-- CreateTable
CREATE TABLE `estoques` (
    `estoque_id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmacia_id` INTEGER NOT NULL,
    `medicamento_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    INDEX `farmacia_id`(`farmacia_id`),
    INDEX `medicamento_id`(`medicamento_id`),
    PRIMARY KEY (`estoque_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `farmacias` (
    `farmacia_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(200) NULL,
    `telefone` VARCHAR(15) NULL,

    PRIMARY KEY (`farmacia_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos` (
    `medicamento_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `fabricante` VARCHAR(100) NULL,

    PRIMARY KEY (`medicamento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos_falta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `fabricante` VARCHAR(100) NULL,
    `quantidade` INTEGER NULL,
    `data_registro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescricao_medicamentos` (
    `prescricao_medicamento_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescricao_id` INTEGER NOT NULL,
    `medicamento_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    INDEX `medicamento_id`(`medicamento_id`),
    INDEX `prescricao_id`(`prescricao_id`),
    PRIMARY KEY (`prescricao_medicamento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescricao_medicamentos_falta` (
    `prescricao_medicamento_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescricao_id` INTEGER NOT NULL,
    `medicamento_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    INDEX `medicamento_id`(`medicamento_id`),
    INDEX `prescricao_id`(`prescricao_id`),
    PRIMARY KEY (`prescricao_medicamento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescricoes` (
    `prescricao_id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionario_id` INTEGER NOT NULL,
    `paciente_id` INTEGER NOT NULL,
    `data_prescricao` DATETIME(0) NOT NULL,
    `status` VARCHAR(80) NOT NULL,

    INDEX `funcionario_id`(`funcionario_id`),
    INDEX `paciente_id`(`paciente_id`),
    PRIMARY KEY (`prescricao_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_prescricao_historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescricao_id` INTEGER NOT NULL,
    `funcionario_id` INTEGER NOT NULL,
    `status` VARCHAR(80) NOT NULL,
    `data_alteracao` DATETIME(0) NOT NULL,

    INDEX `funcionario_id`(`funcionario_id`),
    INDEX `prescricao_id`(`prescricao_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estoques` ADD CONSTRAINT `estoques_ibfk_1` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias`(`farmacia_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estoques` ADD CONSTRAINT `estoques_ibfk_2` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`medicamento_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricao_medicamentos` ADD CONSTRAINT `prescricao_medicamentos_ibfk_1` FOREIGN KEY (`prescricao_id`) REFERENCES `prescricoes`(`prescricao_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricao_medicamentos` ADD CONSTRAINT `prescricao_medicamentos_ibfk_2` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`medicamento_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricao_medicamentos_falta` ADD CONSTRAINT `prescricao_medicamentos_falta_ibfk_1` FOREIGN KEY (`prescricao_id`) REFERENCES `prescricoes`(`prescricao_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricao_medicamentos_falta` ADD CONSTRAINT `prescricao_medicamentos_falta_ibfk_2` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`medicamento_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricoes` ADD CONSTRAINT `prescricoes_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`pessoa_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prescricoes` ADD CONSTRAINT `prescricoes_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes`(`pessoa_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `status_prescricao_historico` ADD CONSTRAINT `status_prescricao_historico_ibfk_1` FOREIGN KEY (`prescricao_id`) REFERENCES `prescricoes`(`prescricao_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `status_prescricao_historico` ADD CONSTRAINT `status_prescricao_historico_ibfk_2` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`pessoa_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
