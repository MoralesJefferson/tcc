-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tcc1
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('262ae0cf-6829-4359-9a12-4bef5c6e0cff','6db3540a5ebdc123f1427a5ac0eaf9d9d354ac66d8409eb5f9f2e0a51b9ef73d','2024-06-12 23:50:23.503','20240602054152_migracao',NULL,NULL,'2024-06-12 23:50:23.433',1),('ce2ade87-b7c4-445d-af3a-9231fdf19cef','0297500992df2779deeef1d432d2eb874b04edb8c8556d9e4bdccd65aedba017','2024-06-12 23:50:23.658','20240602123159_migracao2',NULL,NULL,'2024-06-12 23:50:23.600',1),('d5d149d3-0b1b-4b99-bef4-1ac21d8be582','8a8e0159edf9557c3745fd8855cd61e7324f4957ab5a93da6f211bad5bd7e554','2024-06-13 00:03:33.154','20240613000333_alter_senha',NULL,NULL,'2024-06-13 00:03:33.128',1),('e5c025f3-feac-4556-965c-5a8655301a1c','3b3a3c010e6784f64e653b58fa9d05f6d01c7b60e5aa6a24b49944f809408e43','2024-06-12 23:50:23.594','20240602060406_migracao1',NULL,NULL,'2024-06-12 23:50:23.512',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(180) NOT NULL,
  `email` varchar(180) NOT NULL,
  `crm` varchar(20) DEFAULT NULL,
  `crf` varchar(20) DEFAULT NULL,
  `administrador` tinyint(1) DEFAULT 0,
  `senha` varchar(180) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'jeff','morallllles@gmail.com',NULL,'10093-PR',1,'$2b$08$vSf4677iuB6TQevMk7QSN.OkjPddaL3ZoHD4S4v2njTDaR66HPJJi'),(2,'jefferson','jef@gmail.com',NULL,'10093-SP',0,'$2b$08$Rl6qW.7yqF.mHyyytVG6luVkgK.dYpqi2Dltn42B1j42Dcg4Gf4z2'),(4,'morales','morales@gmail.com',NULL,'10093-SP',0,'$2b$08$SQcHBr1Xf6Lv7b5xAZNSLulxNPpUbzHipoBQlSbrOUAW876D/OxCm'),(5,'erson','gis@gmail.com','10093-PR',NULL,0,'$2b$08$9vsbp8bc8NcauRizeZqRl.vwZzFQi2AOUiOBFEhelmjLC0R55PbsO'),(6,'jefferson','jsdsddef@gmail.com',NULL,'10093-SP',0,'$2b$08$fZu3CZyC5vsQWeibR6faa.Gpgu8l84bR05NUGIfjrVMtto8NM.r3e'),(7,'jefferson','gimorales17s0607@gmail.com','10193-MG',NULL,0,'$2b$08$ptpRg7Pm00k8mVpgiyBvNe2yzwr3HXL0EpRjCHVc5qwxusYGjMBy2'),(8,'JEFFERSON MORALES','gimorgvghvghhvghales170607@gmail.com','10193-PR',NULL,0,'$2b$08$WUeXbj6mk/6rwxzrF7MHBe0eCx9JJb3zYr9C.7qtFHcy8SVc744dC'),(9,'JEFFERSON MORALES','gimorgvgdsfhvghhvghales170607@gmail.com','10193-PR',NULL,0,'$2b$08$3gLrlD.ILyM8.N.2yOfh1uLNx9I3bWJb76ZgnNnNFMw0Xjkau3mAy');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 21:51:45
