/*
 Navicat Premium Dump SQL

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : sge

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 22/10/2024 10:53:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contato
-- ----------------------------
DROP TABLE IF EXISTS `contato`;
CREATE TABLE `contato`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pessoa_id` int NOT NULL,
  `tipo` enum('Telefone','Email') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `valor` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pessoa_id`(`pessoa_id` ASC) USING BTREE,
  CONSTRAINT `contato_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for endereco
-- ----------------------------
DROP TABLE IF EXISTS `endereco`;
CREATE TABLE `endereco`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `municipio_id` int NOT NULL,
  `numero_casa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bairro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `municipio_id`(`municipio_id` ASC) USING BTREE,
  CONSTRAINT `endereco_ibfk_2` FOREIGN KEY (`municipio_id`) REFERENCES `municipio` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for municipio
-- ----------------------------
DROP TABLE IF EXISTS `municipio`;
CREATE TABLE `municipio`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `provincia_id` int NOT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `provincia_id`(`provincia_id` ASC) USING BTREE,
  CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`provincia_id`) REFERENCES `provincia` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pessoa
-- ----------------------------
DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE `pessoa`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imagem` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endereco_id` int NULL DEFAULT NULL,
  `municipio_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_pessoa_endereco1_idx`(`endereco_id` ASC) USING BTREE,
  INDEX `fk_pessoa_municipio1_idx`(`municipio_id` ASC) USING BTREE,
  CONSTRAINT `fk_pessoa_endereco1` FOREIGN KEY (`endereco_id`) REFERENCES `endereco` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_pessoa_municipio1` FOREIGN KEY (`municipio_id`) REFERENCES `municipio` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for provincia
-- ----------------------------
DROP TABLE IF EXISTS `provincia`;
CREATE TABLE `provincia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for tipousuario
-- ----------------------------
DROP TABLE IF EXISTS `tipousuario`;
CREATE TABLE `tipousuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pessoa_id` int NOT NULL,
  `nomeUsuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_usuario_id` int NOT NULL,
  `delete_permissao` tinyint(1) NULL DEFAULT 0,
  `update_permissao` tinyint(1) NULL DEFAULT 0,
  `view_permissao` tinyint(1) NULL DEFAULT 1,
  `create_permissao` tinyint(1) NULL DEFAULT 0,
  `estado` tinyint(1) NULL DEFAULT 1,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_remocao` timestamp NULL DEFAULT NULL,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pessoa_id`(`pessoa_id` ASC) USING BTREE,
  INDEX `tipo_usuario_id`(`tipo_usuario_id` ASC) USING BTREE,
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipousuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- View structure for prof-turma-disci
-- ----------------------------
DROP VIEW IF EXISTS `prof-turma-disci`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `prof-turma-disci` AS select `turma`.`nome` AS `turma`,`classe`.`nome` AS `classe`,`disciplina`.`nome` AS `disciplina`,`pessoa`.`nome` AS `professor` from ((((((`funcionario` join `professor` on((`funcionario`.`id` = `professor`.`funcionario_id`))) join `professorturma` on((`professorturma`.`professor_id` = `professor`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `turma` on((`professorturma`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `disciplina` on((`professorturma`.`disciplina_id` = `disciplina`.`id`)));

-- ----------------------------
-- View structure for turmabyalunos
-- ----------------------------
DROP VIEW IF EXISTS `turmabyalunos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `turmabyalunos` AS select `disciplina`.`nome` AS `disciplina`,`provas`.`nota` AS `nota`,`aluno`.`nome` AS `aluno`,`turma`.`nome` AS `turma`,`classe`.`nome` AS `classe`,`curso`.`nome` AS `curso`,`tipoprova`.`nome` AS `tipoprova`,`turno`.`descricao` AS `turno`,concat(`epoca`.`numero`,'-',`epoca`.`descricao`) AS `epoca`,`provas`.`data_prova` AS `data_prova` from (((((((((`provas` join `disciplina` on((`provas`.`disciplina_id` = `disciplina`.`id`))) join `matriculas` on((`provas`.`matricula_id` = `matriculas`.`id`))) join `pessoa` `aluno` on((`matriculas`.`pessoa_id` = `aluno`.`id`))) join `turma` on((`matriculas`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) join `tipoprova` on((`provas`.`tipo_prova_id` = `tipoprova`.`id`))) join `epoca` on((`provas`.`epoca_id` = `epoca`.`id`))) join `turno` on((`turma`.`turno_id` = `turno`.`id`)));

-- ----------------------------
-- View structure for view_alunos
-- ----------------------------
DROP VIEW IF EXISTS `view_alunos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_alunos` AS select `matriculas`.`id` AS `id`,`pessoa`.`id` AS `pessoa_id`,`pessoa`.`nome` AS `pessoa`,`pessoa`.`imagem` AS `imagem`,`pessoa`.`genero` AS `genero`,`pessoa`.`data_nascimento` AS `data_nascimento`,timestampdiff(YEAR,`pessoa`.`data_nascimento`,curdate()) AS `idade`,`turma`.`nome` AS `turma`,`turno`.`descricao` AS `turno`,`sala`.`descricao` AS `sala`,`encarregado`.`grau` AS `grau`,`encarregados`.`nome` AS `encarregado`,`contato`.`tipo` AS `tipo`,`contato`.`valor` AS `telefone`,`classe`.`nome` AS `classe`,`curso`.`nome` AS `curso`,`matriculas`.`turma_id` AS `turma_id`,`matriculas`.`data_matricula` AS `data_matricula`,`matriculas`.`estado` AS `estado`,`matriculas`.`data_criacao` AS `data_criacao`,`matriculas`.`data_remocao` AS `data_remocao`,`matriculas`.`data_alteracao` AS `data_alteracao`,`pessoa`.`municipio_id` AS `municipio_id`,`pessoa`.`endereco_id` AS `endereco_id`,`classe`.`id` AS `classe_id`,`turno`.`id` AS `turno_id`,`enderecomunicipio`.`nome` AS `nome`,concat(`enderecomunicipio`.`nome`,', ',coalesce(`endereco`.`bairro`,'bairro: desconhecido'),', ',coalesce(`endereco`.`numero_casa`,'Nº casa: desconhecido')) AS `endereco_completo` from (((((((((((`matriculas` join `pessoa` on((`matriculas`.`pessoa_id` = `pessoa`.`id`))) join `turma` on((`matriculas`.`turma_id` = `turma`.`id`))) join `turno` on((`turma`.`turno_id` = `turno`.`id`))) join `sala` on((`turma`.`sala_id` = `sala`.`id`))) left join `encarregado` on((`matriculas`.`id` = `encarregado`.`matriculas_id`))) left join `pessoa` `encarregados` on((`encarregado`.`pessoa_id` = `encarregados`.`id`))) left join `contato` on((`encarregados`.`id` = `contato`.`pessoa_id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) left join `endereco` on((`pessoa`.`endereco_id` = `endereco`.`id`))) left join `municipio` `enderecomunicipio` on((`endereco`.`municipio_id` = `enderecomunicipio`.`id`)));

-- ----------------------------
-- View structure for view_classe
-- ----------------------------
DROP VIEW IF EXISTS `view_classe`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_classe` AS select `classe`.`id` AS `id`,`classe`.`nome` AS `nome`,`classe`.`curso_id` AS `curso_id`,`curso`.`nome` AS `curso` from (`classe` join `curso` on((`classe`.`curso_id` = `curso`.`id`)));

-- ----------------------------
-- View structure for view_classedisciplina
-- ----------------------------
DROP VIEW IF EXISTS `view_classedisciplina`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_classedisciplina` AS select `classedisciplina`.`classe_id` AS `classe_id`,`classedisciplina`.`disciplina_id` AS `disciplina_id`,`classedisciplina`.`estado` AS `estado`,`classedisciplina`.`data_criacao` AS `data_criacao`,`classedisciplina`.`data_remocao` AS `data_remocao`,`classedisciplina`.`data_alteracao` AS `data_alteracao`,`classedisciplina`.`id` AS `id`,`disciplina`.`nome` AS `disciplina`,concat(`classe`.`nome`,'º') AS `classe` from ((`classedisciplina` join `classe` on((`classedisciplina`.`classe_id` = `classe`.`id`))) join `disciplina` on((`classedisciplina`.`disciplina_id` = `disciplina`.`id`))) where (`classedisciplina`.`estado` = 1);

-- ----------------------------
-- View structure for view_encarregado
-- ----------------------------
DROP VIEW IF EXISTS `view_encarregado`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_encarregado` AS select `encarregado`.`id` AS `id`,`encarregado`.`grau` AS `grau`,`encarregado`.`pessoa_id` AS `pessoa_id`,`encarregado`.`matriculas_id` AS `matriculas_id`,`encarregado`.`estado` AS `estado`,`encarregado`.`data_criacao` AS `data_criacao`,`encarregado`.`data_remocao` AS `data_remocao`,`encarregado`.`data_alteracao` AS `data_alteracao`,`aluno`.`nome` AS `aluno`,`pai`.`nome` AS `pai`,`aluno`.`imagem` AS `imagem`,`aluno`.`genero` AS `genero`,`turma`.`nome` AS `turma`,`classe`.`nome` AS `classe`,`curso`.`nome` AS `curso` from ((((((`encarregado` join `matriculas` on((`encarregado`.`matriculas_id` = `matriculas`.`id`))) join `pessoa` `aluno` on((`matriculas`.`pessoa_id` = `aluno`.`id`))) join `pessoa` `pai` on((`encarregado`.`pessoa_id` = `pai`.`id`))) join `turma` on((`matriculas`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`)));

-- ----------------------------
-- View structure for view_enderecos
-- ----------------------------
DROP VIEW IF EXISTS `view_enderecos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_enderecos` AS select `endereco`.`id` AS `id`,`endereco`.`municipio_id` AS `municipio_id`,concat(`municipio`.`nome`,', ',coalesce(`endereco`.`bairro`,'bairro: desconhecido'),', ',coalesce(`endereco`.`numero_casa`,'Nº casa: desconhecido')) AS `endereco_completo`,coalesce(`endereco`.`numero_casa`,'s/n') AS `numero_casa`,coalesce(`endereco`.`bairro`,'s/n') AS `bairro`,`endereco`.`estado` AS `estado`,`endereco`.`data_criacao` AS `data_criacao`,`endereco`.`data_remocao` AS `data_remocao`,`endereco`.`data_alteracao` AS `data_alteracao`,`municipio`.`nome` AS `municipio`,`provincia`.`nome` AS `provincia` from ((`endereco` join `municipio` on((`endereco`.`municipio_id` = `municipio`.`id`))) join `provincia` on((`municipio`.`provincia_id` = `provincia`.`id`)));

-- ----------------------------
-- View structure for view_epoca
-- ----------------------------
DROP VIEW IF EXISTS `view_epoca`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_epoca` AS select `epoca`.`id` AS `id`,`epoca`.`descricao` AS `descricao`,`epoca`.`numero` AS `numero`,`epoca`.`estado` AS `estado`,`epoca`.`data_criacao` AS `data_criacao`,`epoca`.`data_remocao` AS `data_remocao`,`epoca`.`data_alteracao` AS `data_alteracao`,`epoca`.`anoLetivo_id` AS `anoLetivo_id`,`epoca`.`dataInicio` AS `dataInicio`,`epoca`.`dataFim` AS `dataFim`,`anoletivo`.`descricao` AS `anoletivo`,`anoletivo`.`dataInicio` AS `comeco`,`anoletivo`.`dataFim` AS `fim`,concat(`epoca`.`numero`,'º',' - ',`epoca`.`descricao`,' - ',`anoletivo`.`descricao`) AS `descricao_completa` from (`epoca` join `anoletivo` on((`epoca`.`anoLetivo_id` = `anoletivo`.`id`)));

-- ----------------------------
-- View structure for view_epocaturma
-- ----------------------------
DROP VIEW IF EXISTS `view_epocaturma`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_epocaturma` AS select `epocaturma`.`id` AS `id`,concat(`epoca`.`numero`,' ',`epoca`.`descricao`,'-',`anoletivo`.`descricao`) AS `epoca`,concat(`turma`.`nome`,' - ',`turno`.`descricao`,' - ',`sala`.`descricao`,' - ',`curso`.`nome`,' - ',`classe`.`nome`) AS `turma` from (((((((`epocaturma` join `epoca` on((`epocaturma`.`epoca_id` = `epoca`.`id`))) join `turma` on((`epocaturma`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) join `turno` on((`turma`.`turno_id` = `turno`.`id`))) join `sala` on((`turma`.`sala_id` = `sala`.`id`))) join `anoletivo` on((`epoca`.`anoLetivo_id` = `anoletivo`.`id`)));

-- ----------------------------
-- View structure for view_funcionario
-- ----------------------------
DROP VIEW IF EXISTS `view_funcionario`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_funcionario` AS select `funcionario`.`id` AS `id`,`pessoa`.`nome` AS `nome`,`cargo`.`nome` AS `cargo`,`funcionario`.`data_admissao` AS `data_admissao`,`funcionario`.`pessoa_id` AS `pessoa_id`,`funcionario`.`cargo_id` AS `cargo_id` from ((`funcionario` join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `cargo` on((`funcionario`.`cargo_id` = `cargo`.`id`)));

-- ----------------------------
-- View structure for view_horario
-- ----------------------------
DROP VIEW IF EXISTS `view_horario`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_horario` AS select `horario`.`id` AS `id`,`horario`.`diaSemana` AS `diaSemana`,`horario`.`horaInicial` AS `horaInicial`,`horario`.`horaFinal` AS `horaFinal`,`horario`.`estado` AS `estado`,`horario`.`data_criacao` AS `data_criacao`,`horario`.`data_remocao` AS `data_remocao`,`horario`.`data_alteracao` AS `data_alteracao`,`horario`.`epoca_id` AS `epoca_id`,concat(`epoca`.`numero`,'-',`epoca`.`descricao`,'-',`anoletivo`.`descricao`) AS `epoca` from ((`horario` join `epoca` on((`horario`.`epoca_id` = `epoca`.`id`))) join `anoletivo` on((`epoca`.`anoLetivo_id` = `anoletivo`.`id`)));

-- ----------------------------
-- View structure for view_matriculas
-- ----------------------------
DROP VIEW IF EXISTS `view_matriculas`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_matriculas` AS select `matriculas`.`id` AS `id`,`pessoa`.`nome` AS `pessoa`,`pessoa`.`data_nascimento` AS `data_nascimento`,`pessoa`.`genero` AS `genero`,concat(`provincia`.`nome`,', ',`municipio`.`nome`,', ',`endereco`.`bairro`,', ',`endereco`.`numero_casa`) AS `endereco_completo`,`turma`.`nome` AS `turma`,`classe`.`nome` AS `classe`,`curso`.`nome` AS `curso`,`matriculas`.`data_matricula` AS `data_matricula`,`matriculas`.`turma_id` AS `turma_id`,`matriculas`.`pessoa_id` AS `pessoa_id` from (((((((`classe` join `curso` on((`classe`.`curso_id` = `curso`.`id`))) join `turma` on((`classe`.`id` = `turma`.`classe_id`))) join `matriculas` on((`matriculas`.`turma_id` = `turma`.`id`))) join `pessoa` on((`matriculas`.`pessoa_id` = `pessoa`.`id`))) join `endereco` on((`pessoa`.`endereco_id` = `endereco`.`id`))) join `municipio` on((`endereco`.`municipio_id` = `municipio`.`id`))) join `provincia` on((`municipio`.`provincia_id` = `provincia`.`id`)));

-- ----------------------------
-- View structure for view_municipios
-- ----------------------------
DROP VIEW IF EXISTS `view_municipios`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_municipios` AS select `municipio`.`id` AS `id`,`municipio`.`nome` AS `nome`,`municipio`.`provincia_id` AS `provincia_id`,`provincia`.`nome` AS `provincia` from (`municipio` join `provincia` on((`municipio`.`provincia_id` = `provincia`.`id`)));

-- ----------------------------
-- View structure for view_notas
-- ----------------------------
DROP VIEW IF EXISTS `view_notas`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_notas` AS select `aluno`.`nome` AS `aluno`,concat(`classe`.`nome`,' / ',`curso`.`nome`,' / ',`turma`.`nome`,' / ',`turno`.`descricao`,' / ',`epoca`.`numero`,'-',`epoca`.`descricao`) AS `detalhes_turma`,`disciplina`.`nome` AS `disciplina`,group_concat(concat(`tipoprova`.`nome`,':',`provas`.`nota`) order by `tipoprova`.`nome` ASC separator ', ') AS `provas_notas` from (((((((((`provas` join `disciplina` on((`provas`.`disciplina_id` = `disciplina`.`id`))) join `matriculas` on((`provas`.`matricula_id` = `matriculas`.`id`))) join `pessoa` `aluno` on((`matriculas`.`pessoa_id` = `aluno`.`id`))) join `turma` on((`matriculas`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) join `tipoprova` on((`provas`.`tipo_prova_id` = `tipoprova`.`id`))) join `epoca` on((`provas`.`epoca_id` = `epoca`.`id`))) join `turno` on((`turma`.`turno_id` = `turno`.`id`))) group by `aluno`.`nome`,`detalhes_turma`,`disciplina`.`nome` order by `aluno`.`nome`,`disciplina`.`nome`;

-- ----------------------------
-- View structure for view_pagamentos
-- ----------------------------
DROP VIEW IF EXISTS `view_pagamentos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_pagamentos` AS select `pagamento`.`id` AS `id`,`pagamento`.`matricula_id` AS `matricula_id`,`pagamento`.`servico_id` AS `servico_id`,`pagamento`.`data_pagamento` AS `data_pagamento`,`pagamento`.`valor_pago` AS `valor_pago`,`classe`.`nome` AS `classe`,`turma`.`nome` AS `turma`,`curso`.`nome` AS `curso`,`pessoa`.`nome` AS `pessoa`,`pessoa`.`data_nascimento` AS `data_nascimento`,`pessoa`.`genero` AS `genero`,`matriculas`.`data_matricula` AS `data_matricula`,`servico`.`nome` AS `servico`,`servico`.`preco` AS `preco` from ((((((`pagamento` join `servico` on((`pagamento`.`servico_id` = `servico`.`id`))) join `matriculas` on((`pagamento`.`matricula_id` = `matriculas`.`id`))) join `pessoa` on((`matriculas`.`pessoa_id` = `pessoa`.`id`))) join `turma` on((`matriculas`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on(((`classe`.`curso_id` = `curso`.`id`) and (`classe`.`curso_id` = `curso`.`id`))));

-- ----------------------------
-- View structure for view_permissoes
-- ----------------------------
DROP VIEW IF EXISTS `view_permissoes`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_permissoes` AS select `permissao`.`id` AS `id`,`usuario`.`nomeUsuario` AS `nomeUsuario`,`permissao`.`delete_permissao` AS `delete_permissao`,`permissao`.`update_permissao` AS `update_permissao`,`permissao`.`view_permissao` AS `view_permissao`,`permissao`.`create_permissao` AS `create_permissao` from (`permissao` join `usuario` on((`permissao`.`usuario_id` = `usuario`.`id`)));

-- ----------------------------
-- View structure for view_pessoas
-- ----------------------------
DROP VIEW IF EXISTS `view_pessoas`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_pessoas` AS select `pessoa`.`id` AS `id`,`pessoa`.`nome` AS `nome`,concat(`provincia`.`nome`,', ',`municipio`.`nome`,', ',`endereco`.`bairro`,', ',`endereco`.`numero_casa`) AS `endereco_completo`,`pessoa`.`genero` AS `genero`,`pessoa`.`data_nascimento` AS `data_nascimento`,`pessoa`.`endereco_id` AS `endereco_id`,`pessoa`.`imagem` AS `imagem`,`naturalidade`.`nome` AS `naturalidade` from ((((`pessoa` join `endereco` on((`pessoa`.`endereco_id` = `endereco`.`id`))) join `municipio` on((`endereco`.`municipio_id` = `municipio`.`id`))) join `provincia` on((`municipio`.`provincia_id` = `provincia`.`id`))) join `municipio` `naturalidade` on((`pessoa`.`municipio_id` = `naturalidade`.`id`)));

-- ----------------------------
-- View structure for view_possiveis_encarregados
-- ----------------------------
DROP VIEW IF EXISTS `view_possiveis_encarregados`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_possiveis_encarregados` AS select `p`.`id` AS `id`,concat(`p`.`nome`,' - ',ifnull(`documento`.`numero`,'Sem documento')) AS `nome` from (`pessoa` `p` left join `documento` on((`p`.`id` = `documento`.`pessoa_id`))) where (exists(select 1 from `encarregado` `e` where (`e`.`pessoa_id` = `p`.`id`)) or exists(select 1 from `funcionario` `f` where (`f`.`pessoa_id` = `p`.`id`)));

-- ----------------------------
-- View structure for view_professor
-- ----------------------------
DROP VIEW IF EXISTS `view_professor`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_professor` AS select `professor`.`id` AS `id`,`professor`.`funcionario_id` AS `funcionario_id`,`funcionario`.`pessoa_id` AS `pessoa_id`,`funcionario`.`cargo_id` AS `cargo_id`,`pessoa`.`nome` AS `nome`,`pessoa`.`data_nascimento` AS `data_nascimento`,`pessoa`.`genero` AS `genero`,`pessoa`.`imagem` AS `imagem`,`pessoa`.`endereco_id` AS `endereco_id`,`cargo`.`nome` AS `cargo`,group_concat(concat(`contato`.`id`,' - ',`contato`.`tipo`,': ',`contato`.`valor`) separator '; ') AS `contatos`,`documento`.`tipo` AS `tipo`,`documento`.`numero` AS `numero`,`endereco`.`municipio_id` AS `municipio_id`,`endereco`.`numero_casa` AS `numero_casa`,`endereco`.`bairro` AS `bairro`,`documento`.`data_validade` AS `data_validade`,`funcionario`.`data_admissao` AS `data_admissao`,`documento`.`id` AS `doc_id`,`professor`.`especializacao_id` AS `especializacao_id`,`professor`.`especializacao` AS `especializacao` from ((((((`professor` left join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `cargo` on((`funcionario`.`cargo_id` = `cargo`.`id`))) left join `contato` on((`pessoa`.`id` = `contato`.`pessoa_id`))) join `documento` on((`pessoa`.`id` = `documento`.`pessoa_id`))) left join `endereco` on((`pessoa`.`endereco_id` = `endereco`.`id`))) group by `professor`.`id`,`professor`.`funcionario_id`,`funcionario`.`pessoa_id`,`funcionario`.`cargo_id`,`pessoa`.`nome`,`pessoa`.`data_nascimento`,`pessoa`.`genero`,`pessoa`.`imagem`,`pessoa`.`endereco_id`,`cargo`.`nome`,`documento`.`tipo`,`documento`.`numero`,`endereco`.`municipio_id`,`endereco`.`numero_casa`,`endereco`.`bairro`,`documento`.`data_validade`,`funcionario`.`data_admissao`,`documento`.`id`,`professor`.`especializacao_id`,`professor`.`especializacao`;

-- ----------------------------
-- View structure for view_professordisciplina
-- ----------------------------
DROP VIEW IF EXISTS `view_professordisciplina`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_professordisciplina` AS select `professordisciplina`.`id` AS `id`,`professordisciplina`.`professor_id` AS `professor_id`,`professordisciplina`.`disciplina_id` AS `disciplina_id`,`professordisciplina`.`estado` AS `estado`,`professordisciplina`.`data_criacao` AS `data_criacao`,`professordisciplina`.`data_remocao` AS `data_remocao`,`professordisciplina`.`data_alteracao` AS `data_alteracao`,`pessoa`.`nome` AS `professor`,`professor`.`especializacao` AS `especializacao`,`disciplina`.`nome` AS `disciplina` from ((((`professordisciplina` join `professor` on((`professordisciplina`.`professor_id` = `professor`.`id`))) join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `disciplina` on((`professordisciplina`.`disciplina_id` = `disciplina`.`id`)));

-- ----------------------------
-- View structure for view_professordisciplinabyuser
-- ----------------------------
DROP VIEW IF EXISTS `view_professordisciplinabyuser`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_professordisciplinabyuser` AS select `pessoa`.`nome` AS `professor`,`disciplina`.`nome` AS `disciplina`,`professordisciplina`.`professor_id` AS `professor_id`,`professordisciplina`.`disciplina_id` AS `disciplina_id` from (((((`professordisciplina` join `professor` on((`professordisciplina`.`professor_id` = `professor`.`id`))) join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `disciplina` on((`professordisciplina`.`disciplina_id` = `disciplina`.`id`))) join `usuario` on((`pessoa`.`id` = `usuario`.`pessoa_id`)));

-- ----------------------------
-- View structure for view_professorturma
-- ----------------------------
DROP VIEW IF EXISTS `view_professorturma`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_professorturma` AS select `professorturma`.`id` AS `id`,`professorturma`.`professor_id` AS `professor_id`,`professorturma`.`turma_id` AS `turma_id`,`professorturma`.`estado` AS `estado`,`professorturma`.`data_criacao` AS `data_criacao`,`professorturma`.`data_remocao` AS `data_remocao`,`professorturma`.`data_alteracao` AS `data_alteracao`,`professorturma`.`disciplina_id` AS `disciplina_id`,`pessoa`.`nome` AS `professor`,`disciplina`.`nome` AS `disciplina`,concat('T',`turma`.`nome`,' - ',`turno`.`descricao`,' - ',`sala`.`descricao`,' - ',`curso`.`nome`,' - ',`classe`.`nome`,'º') AS `turma` from (((((((((`professorturma` join `professor` on((`professorturma`.`professor_id` = `professor`.`id`))) join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `turma` on((`professorturma`.`turma_id` = `turma`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `turno` on((`turma`.`turno_id` = `turno`.`id`))) join `sala` on((`turma`.`sala_id` = `sala`.`id`))) join `disciplina` on((`professorturma`.`disciplina_id` = `disciplina`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`)));

-- ----------------------------
-- View structure for view_professorturmabyuser
-- ----------------------------
DROP VIEW IF EXISTS `view_professorturmabyuser`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_professorturmabyuser` AS select `turma`.`nome` AS `turma`,`pessoa`.`nome` AS `professor`,`usuario`.`id` AS `usuario`,`disciplina`.`nome` AS `disciplina` from ((((((`professorturma` join `turma` on((`professorturma`.`turma_id` = `turma`.`id`))) join `professor` on((`professorturma`.`professor_id` = `professor`.`id`))) join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`))) join `usuario` on((`pessoa`.`id` = `usuario`.`pessoa_id`))) join `disciplina` on((`professorturma`.`disciplina_id` = `disciplina`.`id`)));

-- ----------------------------
-- View structure for view_turma
-- ----------------------------
DROP VIEW IF EXISTS `view_turma`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_turma` AS select `turma`.`nome` AS `nome`,`turma`.`id` AS `id`,`turma`.`classe_id` AS `classe_id`,`turma`.`estado` AS `estado`,`turma`.`data_criacao` AS `data_criacao`,`turma`.`data_remocao` AS `data_remocao`,`turma`.`data_alteracao` AS `data_alteracao`,`turma`.`turno_id` AS `turno_id`,`turma`.`sala_id` AS `sala_id`,`turno`.`descricao` AS `turno`,`sala`.`descricao` AS `sala`,`curso`.`nome` AS `curso`,`classe`.`nome` AS `classe`,concat('T',`turma`.`nome`,'- ',`turno`.`descricao`,' - ','S',`sala`.`descricao`,' - ',`curso`.`nome`,' - ',`classe`.`nome`,'º') AS `descricao_completa` from ((((`turma` join `turno` on((`turma`.`turno_id` = `turno`.`id`))) join `sala` on((`turma`.`sala_id` = `sala`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) where (`turma`.`estado` = 1);

-- ----------------------------
-- View structure for view_turmadisciplina
-- ----------------------------
DROP VIEW IF EXISTS `view_turmadisciplina`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_turmadisciplina` AS select `prof`.`nome` AS `professor`,`aluno`.`nome` AS `aluno`,`turma`.`nome` AS `turma`,`classe`.`nome` AS `classe`,`curso`.`nome` AS `curso`,`disciplina`.`nome` AS `disciplina` from (((((((((`professorturma` join `professor` on((`professorturma`.`professor_id` = `professor`.`id`))) join `funcionario` on((`professor`.`funcionario_id` = `funcionario`.`id`))) join `matriculas`) join `turma` on(((`matriculas`.`turma_id` = `turma`.`id`) and (`professorturma`.`turma_id` = `turma`.`id`)))) join `pessoa` `aluno` on((`matriculas`.`pessoa_id` = `aluno`.`id`))) join `pessoa` `prof` on((`funcionario`.`pessoa_id` = `prof`.`id`))) join `classe` on((`turma`.`classe_id` = `classe`.`id`))) join `curso` on((`classe`.`curso_id` = `curso`.`id`))) join `disciplina` on((`professorturma`.`disciplina_id` = `disciplina`.`id`)));

-- ----------------------------
-- View structure for view_turno
-- ----------------------------
DROP VIEW IF EXISTS `view_turno`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_turno` AS select `turno`.`id` AS `id`,`turno`.`descricao` AS `descricao`,`turno`.`funcionario_id` AS `funcionario_id`,`turno`.`estado` AS `estado`,`turno`.`data_criacao` AS `data_criacao`,`turno`.`data_remocao` AS `data_remocao`,`turno`.`data_alteracao` AS `data_alteracao`,`pessoa`.`nome` AS `pessoa`,`cargo`.`nome` AS `cargo` from (((`turno` join `funcionario` on((`turno`.`funcionario_id` = `funcionario`.`id`))) join `cargo` on((`funcionario`.`cargo_id` = `cargo`.`id`))) join `pessoa` on((`funcionario`.`pessoa_id` = `pessoa`.`id`)));

-- ----------------------------
-- View structure for view_user
-- ----------------------------
DROP VIEW IF EXISTS `view_user`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_user` AS select `usuario`.`id` AS `id`,`usuario`.`pessoa_id` AS `pessoa_id`,`usuario`.`nomeUsuario` AS `nomeUsuario`,`usuario`.`senha` AS `senha`,`usuario`.`tipo_usuario_id` AS `tipo_usuario_id`,`usuario`.`delete_permissao` AS `delete_permissao`,`usuario`.`update_permissao` AS `update_permissao`,`usuario`.`view_permissao` AS `view_permissao`,`usuario`.`create_permissao` AS `create_permissao`,`usuario`.`estado` AS `estado`,`usuario`.`data_criacao` AS `data_criacao`,`usuario`.`data_remocao` AS `data_remocao`,`usuario`.`data_alteracao` AS `data_alteracao`,`pessoa`.`nome` AS `pessoa`,`pessoa`.`imagem` AS `imagem`,`tipousuario`.`nome` AS `tipousuario`,`tipousuario`.`descricao` AS `descricao` from ((`usuario` join `pessoa` on((`usuario`.`pessoa_id` = `pessoa`.`id`))) join `tipousuario` on((`usuario`.`tipo_usuario_id` = `tipousuario`.`id`))) where (`usuario`.`estado` = 1);

SET FOREIGN_KEY_CHECKS = 1;
