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
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntuaciones`
--

LOCK TABLES `puntuaciones` WRITE;
/*!40000 ALTER TABLE `puntuaciones` DISABLE KEYS */;
INSERT INTO `puntuaciones` VALUES (140,1,94,820),(146,1,95,212),(148,4,93,240),(149,2,95,78),(152,2,94,96),(154,1,101,112),(155,1,99,173),(156,1,100,48),(157,2,100,78),(158,2,99,96),(159,2,101,69),(160,3,99,195),(161,3,100,200),(162,4,99,165),(163,3,101,190),(164,4,100,205),(165,4,101,215),(166,1,103,48),(167,1,102,120),(168,1,106,146),(169,1,105,131),(170,1,104,116),(171,2,102,74),(172,2,104,69),(173,2,106,60),(174,2,105,70),(175,2,103,96),(176,3,102,175),(177,3,106,255),(178,4,102,203),(179,3,104,170),(180,3,105,220),(181,4,106,175),(182,4,104,237),(183,4,105,222),(184,1,107,160),(185,3,103,115),(186,4,103,210),(187,1,113,101),(188,1,108,87),(189,1,114,98),(190,2,113,42),(191,1,116,131),(192,2,108,33),(193,2,114,128),(194,1,117,110),(195,3,108,220),(196,3,113,210),(197,2,116,88),(198,3,114,240),(199,4,113,216),(200,4,108,193),(201,2,117,88),(202,4,114,218),(203,3,116,185),(204,4,116,221),(205,3,117,95),(206,1,119,132),(207,4,117,180),(208,1,118,91),(209,2,119,60),(210,1,121,130),(211,2,118,51),(212,1,120,83);
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
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'superAdmin','$2y$12$XU/WCkYOXupc.l9/nmAFUeYzh8mI7Crf.DMVKilJzBiemE38fhOxy',3,4),(2,'oscar','$2y$12$6D02wMtP2Bf2vlRqtEJgsubnP2/KfFsdWSRC89OfwIqneuPgLPr2W',2,4),(3,'mcarvajal','0',2,4),(8,'josueqm','$2y$12$ouzYnS9a/2//aNfsRvH8NuccYzZltynfVzg1xTKbiMRLfABgy6Qvi',2,4),(54,'Sanguinius','0',1,4),(58,'Roboute Guilliman','0',1,2),(60,'joel','$2y$12$M7OGfwGqY.7P85d4HelRROgejtaYg5ZxZ.5hZmaWwNtdE9KNpO2dq',2,4),(61,'gerardo','0',1,2),(62,'usuario62','0',1,4),(65,'usuario65','0',1,2),(68,'usuario68','0',1,4),(69,'usuario69','0',1,3),(70,'usuario70','0',1,2),(71,'usuario71','0',1,4),(72,'usuario72','0',1,4),(76,'josue','0',1,1),(77,'.net','0',1,2),(78,'oscarA','0',1,2),(79,'pepinillos','0',1,4),(80,'lauri','0',1,4),(81,'gisi','0',1,2),(82,'Patron','0',1,3),(83,'bruno','0',1,4),(84,'Moheto22','0',1,4),(85,'Sergi','0',1,4),(86,'clexs','0',1,1),(87,'ivan','0',2,4),(88,'Erfan','0',1,1),(89,'rebeca','0',1,4),(90,'Alba','0',1,3),(91,'Rey Exanime','0',1,4),(92,'uu','0',1,1),(93,'ee','0',1,4),(94,'Marcelo','0',1,3),(95,'Martin','0',1,4),(96,'raul','0',1,1),(97,'tonto el que lo lea','0',1,2),(98,'Alvaro','0',1,1),(99,'Mireia','0',1,4),(100,'Daniela','0',1,4),(101,'Carla','0',1,4),(102,'Nora','0',1,4),(103,'Katy','0',1,4),(104,'HUGO','0',1,4),(105,'Ian','0',1,4),(106,'12xavier.rull@tfc.cat','0',1,4),(107,'Max','0',1,2),(108,'ariiii','0',1,4),(109,'Júlia.M','0',1,1),(110,'Júlia.M1','0',1,1),(111,'Júlia','0',1,1),(112,'jj','0',1,1),(113,'guillem','0',1,4),(114,'Estefania','0',1,4),(116,'Julia_M','0',1,4),(117,'Maria','0',1,4),(118,'David','0',1,3),(119,'RYAN','0',1,3),(120,'adam','0',1,2),(121,'Janotiii','0',1,2);
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

-- Dump completed on 2023-12-19 12:16:41
