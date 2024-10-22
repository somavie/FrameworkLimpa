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

 Date: 22/10/2024 10:53:03
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
-- Records of contato
-- ----------------------------
INSERT INTO `contato` VALUES (1, 3, 'Telefone', '926547598', 1, '2024-09-17 10:57:36', NULL, '2024-09-17 10:57:36');
INSERT INTO `contato` VALUES (2, 4, 'Telefone', '926545852', 1, '2024-09-17 11:48:37', NULL, '2024-09-17 11:48:37');
INSERT INTO `contato` VALUES (3, 6, 'Telefone', '95326354', 1, '2024-09-17 11:50:30', NULL, '2024-09-17 11:50:30');
INSERT INTO `contato` VALUES (4, 7, 'Telefone', '983884455', 1, '2024-09-24 02:32:31', NULL, '2024-09-24 02:32:31');
INSERT INTO `contato` VALUES (5, 8, 'Telefone', '983884455', 1, '2024-09-24 02:47:06', NULL, '2024-09-24 02:47:06');
INSERT INTO `contato` VALUES (6, 8, 'Telefone', '933445566', 1, '2024-09-24 02:47:06', NULL, '2024-09-24 02:47:06');
INSERT INTO `contato` VALUES (7, 9, 'Telefone', '983884455', 1, '2024-09-24 23:22:22', NULL, '2024-09-24 23:22:22');
INSERT INTO `contato` VALUES (8, 9, 'Email', 'aaaaa@gmail.com', 1, '2024-09-24 23:22:23', NULL, '2024-09-24 23:22:23');
INSERT INTO `contato` VALUES (9, 11, 'Telefone', '92658458', 1, '2024-09-25 22:38:17', NULL, '2024-09-25 22:38:17');
INSERT INTO `contato` VALUES (10, 13, 'Telefone', '96855522', 1, '2024-09-25 22:39:22', NULL, '2024-09-25 22:39:22');
INSERT INTO `contato` VALUES (11, 15, 'Telefone', '926547853', 1, '2024-09-25 22:40:11', NULL, '2024-09-25 22:40:11');
INSERT INTO `contato` VALUES (12, 17, 'Telefone', '926547598', 1, '2024-09-25 22:40:55', NULL, '2024-09-25 22:40:55');
INSERT INTO `contato` VALUES (13, 19, 'Telefone', '9568556544', 1, '2024-09-25 22:42:06', NULL, '2024-09-25 22:42:06');
INSERT INTO `contato` VALUES (14, 21, 'Telefone', '95645855', 1, '2024-09-25 22:43:26', NULL, '2024-09-25 22:43:26');
INSERT INTO `contato` VALUES (15, 23, 'Telefone', '95645855', 1, '2024-09-25 22:43:40', NULL, '2024-09-25 22:43:40');
INSERT INTO `contato` VALUES (16, 25, 'Telefone', '95654522', 1, '2024-09-25 22:44:46', NULL, '2024-09-25 22:44:46');
INSERT INTO `contato` VALUES (17, 27, 'Telefone', '9564585', 1, '2024-09-25 22:45:30', NULL, '2024-09-25 22:45:30');
INSERT INTO `contato` VALUES (18, 29, 'Telefone', '92654878', 1, '2024-09-25 22:47:14', NULL, '2024-09-25 22:47:14');
INSERT INTO `contato` VALUES (19, 31, 'Telefone', '5646541656', 1, '2024-09-25 22:48:01', NULL, '2024-09-25 22:48:01');
INSERT INTO `contato` VALUES (20, 33, 'Telefone', '96485498', 1, '2024-09-25 22:49:01', NULL, '2024-09-25 22:49:01');
INSERT INTO `contato` VALUES (21, 35, 'Telefone', '58489798', 1, '2024-09-25 22:50:24', NULL, '2024-09-25 22:50:24');
INSERT INTO `contato` VALUES (22, 37, 'Telefone', '456635445', 1, '2024-09-25 22:51:17', NULL, '2024-09-25 22:51:17');
INSERT INTO `contato` VALUES (23, 39, 'Telefone', '51654168418486', 1, '2024-09-25 22:52:14', NULL, '2024-09-25 22:52:14');
INSERT INTO `contato` VALUES (24, 41, 'Telefone', '9265487888', 1, '2024-09-26 19:43:22', NULL, '2024-09-26 19:43:22');
INSERT INTO `contato` VALUES (25, 43, 'Telefone', '954626415641', 1, '2024-09-26 19:44:54', NULL, '2024-09-26 19:44:54');
INSERT INTO `contato` VALUES (26, 45, 'Telefone', '956545545', 1, '2024-09-26 19:46:01', NULL, '2024-09-26 19:46:01');
INSERT INTO `contato` VALUES (27, 48, 'Telefone', '92654759867', 1, '2024-09-27 12:56:38', NULL, '2024-09-27 12:56:38');
INSERT INTO `contato` VALUES (28, 49, 'Telefone', '983884455', 1, '2024-09-27 16:07:55', NULL, '2024-09-27 16:07:55');
INSERT INTO `contato` VALUES (29, 50, 'Telefone', '983884455', 1, '2024-09-27 16:19:20', NULL, '2024-09-27 16:19:20');
INSERT INTO `contato` VALUES (30, 51, 'Telefone', '983884455', 1, '2024-09-27 16:22:31', NULL, '2024-09-27 16:22:31');
INSERT INTO `contato` VALUES (31, 52, 'Telefone', '56456353', 1, '2024-09-29 00:47:34', NULL, '2024-09-29 00:47:34');
INSERT INTO `contato` VALUES (32, 55, 'Telefone', '1111111', 1, '2024-09-30 01:07:28', NULL, '2024-09-30 01:07:28');

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
-- Records of endereco
-- ----------------------------
INSERT INTO `endereco` VALUES (1, 9, '2500', 'Sagrada Familia', 1, '2024-09-17 09:35:56', NULL, '2024-09-17 09:35:56');
INSERT INTO `endereco` VALUES (2, 3, '8528', 'Grafanil', 1, '2024-09-17 10:57:36', NULL, '2024-09-17 10:57:36');
INSERT INTO `endereco` VALUES (3, 6, '12', 'Angola', 1, '2024-09-24 02:32:30', NULL, '2024-09-24 02:32:30');
INSERT INTO `endereco` VALUES (4, 6, '92', 'Angola', 1, '2024-09-24 02:47:05', NULL, '2024-09-24 02:47:05');
INSERT INTO `endereco` VALUES (5, 1, '12', 'Angola', 1, '2024-09-24 23:22:22', NULL, '2024-09-24 23:22:22');
INSERT INTO `endereco` VALUES (6, 3, '6651132', 'Mulenvos', 1, '2024-09-26 20:11:22', NULL, '2024-09-26 20:11:22');
INSERT INTO `endereco` VALUES (7, 11, '123', 'golf 2', 1, '2024-09-27 12:18:37', NULL, '2024-09-27 12:18:37');
INSERT INTO `endereco` VALUES (8, 14, '92', 'chipipa', 1, '2024-09-27 12:56:37', NULL, '2024-09-27 12:56:37');
INSERT INTO `endereco` VALUES (9, 14, '12', 'chipipa', 1, '2024-09-27 16:07:54', NULL, '2024-09-27 16:07:54');
INSERT INTO `endereco` VALUES (10, 24, '1234', 'chipipa', 1, '2024-09-27 16:19:20', NULL, '2024-09-27 16:19:20');
INSERT INTO `endereco` VALUES (11, 6, '23', 'camama', 1, '2024-09-27 16:22:30', NULL, '2024-09-27 16:22:30');
INSERT INTO `endereco` VALUES (12, 6, '668799', 'Dangeroux', 1, '2024-09-29 00:47:34', NULL, '2024-09-29 00:47:34');
INSERT INTO `endereco` VALUES (13, 4, '8888', 'Kikuxi', 1, '2024-09-30 01:03:52', NULL, '2024-09-30 01:03:52');
INSERT INTO `endereco` VALUES (14, 5, '122121', 'Dangeroux', 1, '2024-09-30 01:06:27', NULL, '2024-09-30 01:06:27');
INSERT INTO `endereco` VALUES (15, 6, '1111122', 'Dangeroux', 1, '2024-09-30 01:07:28', NULL, '2024-09-30 01:07:28');
INSERT INTO `endereco` VALUES (16, 14, NULL, NULL, 1, '2024-09-30 13:35:03', NULL, '2024-09-30 13:35:03');
INSERT INTO `endereco` VALUES (17, 10, '', 'Boa Vista', 1, '2024-10-01 05:53:04', NULL, '2024-10-01 05:53:04');

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
-- Records of municipio
-- ----------------------------
INSERT INTO `municipio` VALUES (1, 'Belas', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (2, 'Cacuaco', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (3, 'Cazenga', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (4, 'Ícolo e Bengo', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (5, 'Kilamba Kiaxi', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (6, 'Luanda', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (7, 'Quissama', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (8, 'Talatona', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (9, 'Viana', 1, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (10, 'Bailundo', 9, 1, '2024-09-17 09:35:16', NULL, '2024-09-30 13:56:50');
INSERT INTO `municipio` VALUES (11, 'Caála', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (12, 'Catchiungo', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (13, 'Ecunha', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (14, 'Huambo', 9, 1, '2024-09-17 09:35:16', NULL, '2024-09-30 13:57:01');
INSERT INTO `municipio` VALUES (15, 'Londuimbali', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (16, 'Longonjo', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (17, 'Mungo', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (18, 'Tchicala-Tcholoanga', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (19, 'Ucuma', 2, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (20, 'Caconda', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (21, 'Cacula', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (22, 'Caluquembe', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (23, 'Chibia', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (24, 'Chicomba', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (25, 'Chipindo', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (26, 'Gambos', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (27, 'Humpata', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (28, 'Jamba', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (29, 'Lubango', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (30, 'Matala', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (31, 'Quilengues', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (32, 'Quipungo', 8, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (33, 'Balombo', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (34, 'Benguela', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (35, 'Baía Farta', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (36, 'Bocoio', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (37, 'Caimbambo', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (38, 'Catumbela', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (39, 'Chongoroi', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (40, 'Cubal', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (41, 'Ganda', 4, 1, '2024-09-17 09:35:16', NULL, NULL);
INSERT INTO `municipio` VALUES (42, 'Lobito', 4, 1, '2024-09-17 09:35:16', NULL, NULL);

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
-- Records of pessoa
-- ----------------------------
INSERT INTO `pessoa` VALUES (1, 'Bruno Somavie ACVF', '2020-12-29', 'Masculino', '1726562225334.png', 1, '2024-09-17 09:37:05', NULL, '2024-10-01 09:50:59', 1, 1);
INSERT INTO `pessoa` VALUES (2, 'Paulo Almeida', '1989-02-07', 'Masculino', '1726566254192.png', 1, '2024-09-17 10:44:14', NULL, '2024-09-27 00:04:01', 1, 1);
INSERT INTO `pessoa` VALUES (3, 'Almeida Pereira Torres', '2024-09-03', 'Masculino', '1726567056689.png', 1, '2024-09-17 10:57:36', NULL, '2024-09-27 00:04:01', 2, 1);
INSERT INTO `pessoa` VALUES (4, 'Daniel vaz', '2024-09-19', 'Masculino', NULL, 1, '2024-09-17 11:48:37', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (5, 'Filipe Mbassi', '1997-01-06', 'Masculino', '1726570230408.png', 1, '2024-09-17 11:50:30', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (6, 'Pedro VAZ', '2009-12-29', 'Masculino', NULL, 1, '2024-09-17 11:50:30', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (7, 'Ivone Calelesa Antonio', '1998-05-21', 'Masculino', '1727141550875.png', 1, '2024-09-24 02:32:30', NULL, '2024-09-27 00:04:01', 3, 1);
INSERT INTO `pessoa` VALUES (8, 'Sebastião Lisboa', '1997-04-19', 'Masculino', '1727142425750.png', 1, '2024-09-24 02:47:05', NULL, '2024-09-27 00:04:01', 4, 1);
INSERT INTO `pessoa` VALUES (9, 'Ivone Lisboa', '1989-09-22', 'Feminino', '1727216542801.png', 1, '2024-09-24 23:22:22', NULL, '2024-09-27 00:04:01', 5, 1);
INSERT INTO `pessoa` VALUES (10, 'Pedro Filipe Mukenga', '2024-09-19', 'Masculino', '1727300297769.jpg', 1, '2024-09-25 22:38:17', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (11, 'Filipe Mukenga', '2024-09-23', 'Masculino', NULL, 1, '2024-09-25 22:38:17', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (12, 'Osvaldo Japao', '2024-09-18', 'Masculino', '1727300362200.png', 1, '2024-09-25 22:39:22', NULL, '2024-10-09 22:46:26', 2, 1);
INSERT INTO `pessoa` VALUES (13, 'Spriano Japão', '2024-09-26', 'Masculino', NULL, 1, '2024-09-25 22:39:22', NULL, '2024-10-09 22:44:46', 2, 1);
INSERT INTO `pessoa` VALUES (14, 'Carlos Felix Milagre', '2024-09-18', 'Masculino', '1727300411330.png', 1, '2024-09-25 22:40:11', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (15, 'Frliciano Milagre', '2024-09-20', 'Masculino', NULL, 1, '2024-09-25 22:40:11', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (16, 'Marlene Darlynd', '2024-09-20', 'Masculino', '1727300454904.png', 1, '2024-09-25 22:40:54', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (17, 'Marlene Sara Darling', '2024-10-11', 'Masculino', NULL, 1, '2024-09-25 22:40:55', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (18, 'Kamate Mateus', '2024-10-05', 'Masculino', '1727300526464.png', 1, '2024-09-25 22:42:06', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (19, 'OSvaldo Mateus', '2024-09-26', 'Masculino', NULL, 1, '2024-09-25 22:42:06', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (20, 'Serafim Mendes', '2024-09-21', 'Masculino', NULL, 1, '2024-09-25 22:43:26', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (21, 'Sá Mendes', '2024-09-04', 'Feminino', NULL, 1, '2024-09-25 22:43:26', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (22, 'Serafim Mendes', '2024-09-21', 'Masculino', NULL, 1, '2024-09-25 22:43:40', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (23, 'Sá Mendes', '2024-09-04', 'Feminino', NULL, 1, '2024-09-25 22:43:40', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (24, 'Simão Afonso', '2024-09-10', 'Masculino', '1727300686242.jpg', 1, '2024-09-25 22:44:46', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (25, 'Afonso Afonso', '2024-09-21', 'Masculino', NULL, 1, '2024-09-25 22:44:46', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (26, 'Famer Gamba', '2024-09-14', 'Masculino', '1727300730662.jpg', 1, '2024-09-25 22:45:30', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (27, 'Mateus Gamba', '2024-09-30', 'Masculino', NULL, 1, '2024-09-25 22:45:30', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (28, 'Simão Catembo', '2024-09-27', 'Masculino', '1727300834155.png', 1, '2024-09-25 22:47:14', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (29, 'Simao Catembo', '2024-09-26', 'Masculino', NULL, 1, '2024-09-25 22:47:14', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (30, 'Oseias André', '2024-09-08', 'Masculino', '1727300881280.png', 1, '2024-09-25 22:48:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (31, 'Pedro André', '2024-09-28', 'Masculino', NULL, 1, '2024-09-25 22:48:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (32, 'Jonas Dos Santos', '2024-09-19', 'Masculino', '1727300941337.png', 1, '2024-09-25 22:49:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (33, 'Diana dos Santos', '2024-09-25', 'Feminino', NULL, 1, '2024-09-25 22:49:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (34, 'José Alvaro', '2024-09-20', 'Masculino', '1727301024477.png', 1, '2024-09-25 22:50:24', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (35, 'Pdro Alvaro', '2024-09-24', 'Masculino', NULL, 1, '2024-09-25 22:50:24', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (36, 'Orvanda Neto', '2024-09-04', 'Feminino', '1727301077071.png', 1, '2024-09-25 22:51:17', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (37, 'Famer Neto', '2024-09-07', 'Masculino', NULL, 1, '2024-09-25 22:51:17', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (38, 'Omar André', '2024-09-03', 'Masculino', '1727301134457.png', 1, '2024-09-25 22:52:14', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (39, 'Catembo André', '2024-09-22', 'Masculino', NULL, 1, '2024-09-25 22:52:14', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (40, 'Tiago Arão', '2024-09-19', 'Masculino', '1727376202832.png', 1, '2024-09-26 19:43:22', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (41, 'Simao Arão', '2024-09-16', 'Masculino', NULL, 1, '2024-09-26 19:43:22', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (42, 'Arieth Ndonfula', '2024-09-26', 'Feminino', '1727376294332.png', 1, '2024-09-26 19:44:54', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (43, 'Vania Ndofula', '1999-02-22', 'Masculino', NULL, 1, '2024-09-26 19:44:54', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (44, 'Sofia Pedro', '1980-02-24', 'Feminino', '1727376361333.png', 1, '2024-09-26 19:46:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (45, 'Amadeu Pedro', '1989-02-02', 'Masculino', NULL, 1, '2024-09-26 19:46:01', NULL, '2024-09-27 00:04:01', NULL, 1);
INSERT INTO `pessoa` VALUES (46, 'Orvanda', '2024-09-19', 'Feminino', '1727392217670.png', 1, '2024-09-27 00:10:17', NULL, '2024-09-27 00:35:06', 1, 2);
INSERT INTO `pessoa` VALUES (47, 'Sousa Neto', '2024-09-26', 'Masculino', '1727392581646.png', 1, '2024-09-27 00:16:21', NULL, '2024-09-27 00:34:02', 2, 7);
INSERT INTO `pessoa` VALUES (48, 'Maria Lisboa', '1995-05-05', 'Feminino', '1727438197934.jpg', 1, '2024-09-27 12:56:37', NULL, '2024-09-27 12:56:37', 8, 7);
INSERT INTO `pessoa` VALUES (49, 'Sebas Anto Dias', '2020-12-12', 'Masculino', '1727449675116.jpg', 1, '2024-09-27 16:07:55', NULL, '2024-09-27 16:07:55', 9, 1);
INSERT INTO `pessoa` VALUES (50, 'Elisio Jorge Claudio Neto', '1990-12-12', 'Masculino', '1727450360383.jpg', 1, '2024-09-27 16:19:20', NULL, '2024-09-27 16:19:20', 10, 1);
INSERT INTO `pessoa` VALUES (51, 'Sebastião Lisboa', '2024-08-28', 'Masculino', '1727450551154.jpg', 1, '2024-09-27 16:22:31', NULL, '2024-09-27 16:22:31', 11, 1);
INSERT INTO `pessoa` VALUES (52, 'Ricardo Lopes', '2024-09-24', 'Masculino', '1727567254398.png', 1, '2024-09-29 00:47:34', NULL, '2024-09-29 00:47:34', 12, 1);
INSERT INTO `pessoa` VALUES (53, 'Mufema Inês', '1221-02-22', 'Feminino', '1727654099196.png', 1, '2024-09-30 00:54:59', NULL, '2024-09-30 00:58:37', 2, 2);
INSERT INTO `pessoa` VALUES (54, 'gfhfgyjh', '2024-09-14', 'Masculino', '1727654127681.png', 1, '2024-09-30 00:55:27', NULL, '2024-09-30 00:55:27', 3, 4);
INSERT INTO `pessoa` VALUES (55, 'MArilha Mendonça', '1111-02-11', 'Feminino', '1727654848632.png', 1, '2024-09-30 01:07:28', NULL, '2024-09-30 01:07:28', 15, 1);
INSERT INTO `pessoa` VALUES (56, 'ASfgjkn skfnkldnsl', '1998-06-10', 'Masculino', '1727690138448.jpg', 1, '2024-09-30 10:55:38', NULL, '2024-09-30 10:55:38', 6, 2);
INSERT INTO `pessoa` VALUES (57, 'Maria Lisboa Filha', '2003-09-12', 'Feminino', '1727757279588.jpg', 1, '2024-10-01 05:34:39', NULL, '2024-10-01 05:34:39', 16, 10);
INSERT INTO `pessoa` VALUES (58, 'Maria Lisboa Filha', '2012-05-15', 'Feminino', '1727757705276.jpg', 1, '2024-10-01 05:41:45', NULL, '2024-10-01 05:41:45', 16, 10);
INSERT INTO `pessoa` VALUES (59, 'Jerusa Siladas', '2017-04-04', 'Feminino', '1727758384541.webp', 1, '2024-10-01 05:53:04', NULL, '2024-10-01 05:53:04', 17, 14);

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
-- Records of provincia
-- ----------------------------
INSERT INTO `provincia` VALUES (1, 'Bengo', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (2, 'Benguela', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (3, 'Bié', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (4, 'Cabinda', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (5, 'Cuando Cubango', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (6, 'Cuanza Norte', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (7, 'Cuanza Sul', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (8, 'Cunene', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (9, 'Huambo', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (10, 'Huíla', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (11, 'Luanda', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (12, 'Lunda Norte', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (13, 'Lunda Sul', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (14, 'Malanje', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (15, 'Moxico', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (16, 'Namibe', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (17, 'Uíge', 1, '2024-09-17 09:12:58', NULL, NULL);
INSERT INTO `provincia` VALUES (18, 'Zaire', 1, '2024-09-17 09:12:58', NULL, NULL);

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
-- Records of tipousuario
-- ----------------------------
INSERT INTO `tipousuario` VALUES (1, 'Admin', 'pessoa que faz a manutençãoi e configuração do sistema', 1, '2024-09-17 09:37:56', NULL, '2024-09-17 09:37:56');
INSERT INTO `tipousuario` VALUES (2, 'Professor', 'pessoa responsavel por avaliar alunos e dar aulas', 1, '2024-09-17 09:38:34', NULL, '2024-09-17 09:38:34');

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
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 1, 'dias', '$2a$10$vsPH8QlmVRUe0xj2sQhi1uLa3FnKnf7AqIJuyNUQGxc5MWXFu3FZy', 1, 1, 1, 1, 1, 1, '2024-09-17 09:39:03', NULL, '2024-09-23 20:23:20');
INSERT INTO `usuario` VALUES (2, 2, 'isana', '$2a$10$4uKMLmfCPJd94plHQI8fYuPZMH9M4r4pzgKfIZ.bpzXcHlqjwIOMa', 2, 0, 1, 1, 0, 1, '2024-09-23 20:26:21', NULL, '2024-09-23 20:26:21');
INSERT INTO `usuario` VALUES (3, 3, 'APT', '$2a$10$x9GbJzEc.mDCrU8mTuwCB.CFt76bWVooEJkCOHEbREBwdmMP52G0O', 2, 1, 1, 1, 1, 1, '2024-10-03 20:17:31', NULL, '2024-10-03 20:17:31');
INSERT INTO `usuario` VALUES (4, 53, 'ines', '$2a$10$O5cMAqt6WNIIOnXMvUiph.MAokVefN5VQZRU7nXjtJmp3XmuSuoZS', 3, 1, 1, 1, 1, 1, '2024-10-09 07:06:22', NULL, '2024-10-09 07:06:22');

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
