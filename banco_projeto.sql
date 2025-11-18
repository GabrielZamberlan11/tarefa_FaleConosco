-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para rota_certa
DROP DATABASE IF EXISTS `rota_certa`;
CREATE DATABASE IF NOT EXISTS `rota_certa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `rota_certa`;

-- Copiando estrutura para tabela rota_certa.fale_conosco
DROP TABLE IF EXISTS `fale_conosco`;
CREATE TABLE IF NOT EXISTS `fale_conosco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `assunto` varchar(150) NOT NULL,
  `mensagem` varchar(255) NOT NULL,
  `horario` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela rota_certa.fale_conosco: ~3 rows (aproximadamente)
DELETE FROM `fale_conosco`;
INSERT INTO `fale_conosco` (`id`, `nome`, `email`, `telefone`, `assunto`, `mensagem`, `horario`) VALUES
	(1, 'Maximus', 'felipe@gmail.com', '', 'entrega regional', 'ocorreu um erro 121', '2025-11-13 19:49:22'),
	(2, 'Maximus', 'felipe@gmail.com', '', 'entrega regional', 'ocorreu um erro 121', '2025-11-13 19:49:35'),
	(3, 'Gabriel Vilela Zamberlan', 'gabriel.zamberlan@portalseisisp.org.br', '', 'entrega regional', 'ocorreu um erro 121', '2025-11-13 19:50:34');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
