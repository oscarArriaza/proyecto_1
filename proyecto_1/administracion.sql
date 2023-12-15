CREATE DATABASE  IF NOT EXISTS `administracion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `administracion`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: administracion
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'españa'),(2,'brasil'),(3,'kenia'),(4,'india');
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntuaciones`
--

DROP TABLE IF EXISTS `puntuaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntuaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `juego` int NOT NULL,
  `usuario` int NOT NULL,
  `puntuacion` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `juego` (`juego`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `puntuaciones_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `puntuaciones_ibfk_2` FOREIGN KEY (`juego`) REFERENCES `juegos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntuaciones`
--

LOCK TABLES `puntuaciones` WRITE;
/*!40000 ALTER TABLE `puntuaciones` DISABLE KEYS */;
INSERT INTO `puntuaciones` VALUES (61,4,2,205),(62,2,2,10),(71,2,65,15),(72,3,65,20),(73,4,65,25),(74,1,65,15),(75,1,68,15),(76,2,68,20),(77,3,68,25),(78,4,68,30),(79,3,2,5),(80,1,71,5),(81,2,71,10),(82,1,72,5),(83,2,72,10),(84,3,72,5),(85,4,72,5),(86,3,71,5),(87,4,71,15),(88,1,70,5),(89,1,69,5),(90,2,69,5),(91,1,62,5),(92,2,62,5),(93,3,62,5),(94,4,62,5),(95,1,61,215),(96,1,2,165),(97,1,58,167),(98,1,54,5),(99,2,54,5),(100,3,54,5),(101,4,54,5),(102,1,77,184);
/*!40000 ALTER TABLE `puntuaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_de_usuario`
--

DROP TABLE IF EXISTS `tipos_de_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_de_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_de_usuario`
--

LOCK TABLES `tipos_de_usuario` WRITE;
/*!40000 ALTER TABLE `tipos_de_usuario` DISABLE KEYS */;
INSERT INTO `tipos_de_usuario` VALUES (1,'usuario'),(2,'administrador'),(3,'superadministrador');
/*!40000 ALTER TABLE `tipos_de_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `contrasenia` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nivel` int NOT NULL,
  `juegos_desbloqueados` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `nivel` (`nivel`),
  KEY `juegos_desbloqueados` (`juegos_desbloqueados`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`nivel`) REFERENCES `tipos_de_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`juegos_desbloqueados`) REFERENCES `juegos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'superAdmin','$2y$12$XU/WCkYOXupc.l9/nmAFUeYzh8mI7Crf.DMVKilJzBiemE38fhOxy',3,4),(2,'oscar','$2y$12$6D02wMtP2Bf2vlRqtEJgsubnP2/KfFsdWSRC89OfwIqneuPgLPr2W',2,4),(3,'mcarvajal','0',2,4),(8,'josueqm','$2y$12$ouzYnS9a/2//aNfsRvH8NuccYzZltynfVzg1xTKbiMRLfABgy6Qvi',2,4),(54,'Sanguinius','0',1,4),(58,'Roboute Guilliman','0',1,2),(60,'joel','$2y$12$M7OGfwGqY.7P85d4HelRROgejtaYg5ZxZ.5hZmaWwNtdE9KNpO2dq',2,4),(61,'gerardo','0',1,2),(62,'usuario62','0',1,4),(65,'usuario65','0',1,2),(68,'usuario68','0',1,4),(69,'usuario69','0',1,3),(70,'usuario70','0',1,2),(71,'usuario71','0',1,4),(72,'usuario72','0',1,4),(76,'josue','0',1,1),(77,'.net','0',1,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 19:14:14
