-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cineprime
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Actor1','2024-04-18 05:57:24','2024-04-18 05:57:24'),(2,'Actor2','2024-04-18 05:57:24','2024-04-18 05:57:24');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `showtime_seat_id` int NOT NULL,
  `status` enum('pending','confirmed','cancelled','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_code` (`booking_code`),
  KEY `user_id` (`user_id`),
  KEY `showtime_seat_id` (`showtime_seat_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`showtime_seat_id`) REFERENCES `showtime_seats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'12312',1,19,'confirmed','2024-04-19 03:28:51','2024-04-19 03:28:51'),(2,'-5C4u-djb',1,19,'pending','2024-04-19 03:29:09','2024-04-19 03:29:09'),(3,'sf5IfP0WX',1,19,'pending','2024-04-19 03:36:01','2024-04-19 03:36:01'),(4,'TP3F57G9H',1,19,'pending','2024-04-19 03:43:26','2024-04-19 03:43:26'),(5,'2gWK_58zK',1,19,'pending','2024-04-19 03:44:08','2024-04-19 03:44:08'),(6,'IGzVFwpJQ',1,19,'pending','2024-04-19 03:51:15','2024-04-19 03:51:15'),(7,'teGDn7vuL',1,19,'pending','2024-04-19 03:51:49','2024-04-19 03:51:49'),(8,'DwRmOLzH3',1,19,'pending','2024-04-19 03:52:55','2024-04-19 03:52:55'),(9,'7F4sD5ZCD',1,19,'pending','2024-04-19 03:55:43','2024-04-19 03:55:43'),(10,'NDaRFbTMn',1,19,'pending','2024-04-19 03:56:57','2024-04-19 03:56:57'),(11,'DnSIXPHct',1,20,'pending','2024-04-20 13:25:03','2024-04-20 13:25:03');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_casts`
--

DROP TABLE IF EXISTS `movie_casts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_casts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `actor_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `actor_id` (`actor_id`),
  CONSTRAINT `movie_casts_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  CONSTRAINT `movie_casts_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_casts`
--

LOCK TABLES `movie_casts` WRITE;
/*!40000 ALTER TABLE `movie_casts` DISABLE KEYS */;
INSERT INTO `movie_casts` VALUES (1,1,1,'2024-04-18 05:57:28','2024-04-18 05:57:28'),(2,1,2,'2024-04-18 05:57:28','2024-04-18 05:57:28'),(3,2,1,'2024-04-18 05:57:28','2024-04-18 05:57:28'),(4,15,1,'2024-04-18 06:29:10','2024-04-18 06:29:10'),(5,15,2,'2024-04-18 06:29:10','2024-04-18 06:29:10'),(6,16,1,'2024-04-18 06:29:47','2024-04-18 06:29:47'),(8,17,1,'2024-04-18 06:34:45','2024-04-18 06:34:45'),(10,18,1,'2024-04-18 06:35:05','2024-04-18 06:35:05'),(12,19,1,'2024-04-18 06:35:57','2024-04-18 06:35:57'),(14,20,1,'2024-04-18 06:37:01','2024-04-18 06:37:01'),(16,21,1,'2024-04-18 06:37:46','2024-04-18 06:37:46'),(18,22,1,'2024-04-18 06:39:01','2024-04-18 06:39:01'),(20,23,1,'2024-04-18 06:39:23','2024-04-18 06:39:23'),(22,24,1,'2024-04-18 06:39:55','2024-04-18 06:39:55'),(24,25,1,'2024-04-18 06:40:24','2024-04-18 06:40:24'),(26,26,1,'2024-04-18 06:40:44','2024-04-18 06:40:44'),(28,27,1,'2024-04-18 06:40:58','2024-04-18 06:40:58'),(30,28,1,'2024-04-18 06:41:05','2024-04-18 06:41:05'),(32,29,1,'2024-04-18 06:41:19','2024-04-18 06:41:19'),(34,30,1,'2024-04-18 06:41:41','2024-04-18 06:41:41'),(36,31,1,'2024-04-18 06:43:17','2024-04-18 06:43:17'),(38,32,1,'2024-04-18 06:43:33','2024-04-18 06:43:33'),(40,33,1,'2024-04-18 06:44:21','2024-04-18 06:44:21'),(41,34,1,'2024-04-18 06:46:07','2024-04-18 06:46:07'),(42,35,1,'2024-04-18 06:46:23','2024-04-18 06:46:23'),(44,36,1,'2024-04-18 06:46:45','2024-04-18 06:46:45'),(45,37,1,'2024-04-18 06:47:20','2024-04-18 06:47:20'),(47,38,1,'2024-04-18 06:47:31','2024-04-18 06:47:31'),(49,39,1,'2024-04-18 06:48:17','2024-04-18 06:48:17'),(51,40,1,'2024-04-18 06:48:36','2024-04-18 06:48:36'),(52,41,1,'2024-04-21 10:28:44','2024-04-21 10:28:44'),(53,42,2,'2024-04-21 10:29:05','2024-04-21 10:29:05'),(54,42,1,'2024-04-21 10:29:05','2024-04-21 10:29:05'),(55,43,1,'2024-04-21 10:40:56','2024-04-21 10:40:56'),(56,43,2,'2024-04-21 10:40:56','2024-04-21 10:40:56'),(57,44,1,'2024-04-21 14:37:43','2024-04-21 14:37:43'),(58,44,2,'2024-04-21 14:37:43','2024-04-21 14:37:43'),(59,45,1,'2024-04-23 23:42:13','2024-04-23 23:42:13'),(60,45,2,'2024-04-23 23:42:13','2024-04-23 23:42:13');
/*!40000 ALTER TABLE `movie_casts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_shows`
--

DROP TABLE IF EXISTS `movie_shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_shows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `price` int NOT NULL,
  `show_time` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `status` enum('upcoming','now_showing','finished') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `movie_shows_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_shows`
--

LOCK TABLES `movie_shows` WRITE;
/*!40000 ALTER TABLE `movie_shows` DISABLE KEYS */;
INSERT INTO `movie_shows` VALUES (1,1,10,'2024-04-19 14:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(2,1,15,'2022-03-01 18:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(3,2,12,'2022-03-02 16:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(4,1,10,'2024-04-19 14:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(5,1,12,'2022-04-29 18:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(6,1,12,'2022-04-10 16:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(7,2,10,'2024-04-19 14:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(8,1,12,'2022-04-29 18:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(9,1,12,'2022-04-10 16:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(10,2,10,'2024-04-19 14:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(11,1,12,'2022-04-29 18:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(12,1,12,'2022-04-30 16:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(13,2,10,'2024-04-19 20:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(14,1,12,'2022-04-29 18:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(15,1,12,'2022-04-30 16:00:00','2022-02-28 10:00:00','2022-02-28 10:00:00',NULL,NULL),(16,1,20,'2022-02-28 10:00:00','2024-04-18 15:12:08','2024-04-18 15:12:08',NULL,NULL),(17,5,20,'2022-02-28 01:00:00','2024-04-19 08:30:58','2024-04-19 08:30:58',NULL,NULL),(18,5,20,'2022-02-28 01:00:00','2024-04-19 08:36:30','2024-04-19 08:36:30',NULL,NULL),(19,5,20,'2022-02-28 01:00:00','2024-04-19 09:56:36','2024-04-19 09:56:36',NULL,NULL),(20,1,20,'2022-02-28 01:00:00','2024-04-19 09:59:46','2024-04-19 09:59:46',NULL,NULL),(21,43,20,'2024-04-28 01:00:00','2024-04-21 18:01:54','2024-04-21 18:01:54',NULL,NULL);
/*!40000 ALTER TABLE `movie_shows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `overview` text NOT NULL,
  `duration` int NOT NULL,
  `director` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `release_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Movie1','This is a great movie',120,'Director1','Action','PG-13','2022-01-01','2024-04-18 05:57:21','2024-04-18 05:57:21',NULL),(2,'Movie2','This is another great movie',150,'Director2','Comedy','R','2022-02-01','2024-04-18 05:57:21','2024-04-18 05:57:21','2024-04-18 21:58:26'),(3,'Adaptive coherent supportyyyy','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:19:03','2024-04-18 06:19:03',NULL),(4,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:20:26','2024-04-18 06:20:26',NULL),(5,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:20:43','2024-04-18 06:20:43','2024-04-19 08:45:12'),(6,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:21:14','2024-04-18 06:21:14',NULL),(7,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:21:27','2024-04-18 06:21:27',NULL),(8,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:22:09','2024-04-18 06:22:09',NULL),(9,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:22:28','2024-04-18 06:22:28',NULL),(10,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:24:26','2024-04-18 06:24:26',NULL),(11,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:27:52','2024-04-18 06:27:52',NULL),(12,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:28:26','2024-04-18 06:28:26',NULL),(13,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:28:41','2024-04-18 06:28:41',NULL),(14,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:28:52','2024-04-18 06:28:52',NULL),(15,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:29:10','2024-04-18 06:29:10',NULL),(16,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:29:47','2024-04-18 06:29:47',NULL),(17,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:34:45','2024-04-18 06:34:45',NULL),(18,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:35:05','2024-04-18 06:35:05',NULL),(19,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:35:57','2024-04-18 06:35:57',NULL),(20,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:37:01','2024-04-18 06:37:01',NULL),(21,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:37:46','2024-04-18 06:37:46',NULL),(22,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:39:01','2024-04-18 06:39:01',NULL),(23,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:39:23','2024-04-18 06:39:23',NULL),(24,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:39:55','2024-04-18 06:39:55',NULL),(25,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:40:24','2024-04-18 06:40:24',NULL),(26,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:40:44','2024-04-18 06:40:44',NULL),(27,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:40:58','2024-04-18 06:40:58',NULL),(28,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:41:05','2024-04-18 06:41:05',NULL),(29,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:41:19','2024-04-18 06:41:19',NULL),(30,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:41:41','2024-04-18 06:41:41',NULL),(31,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:43:17','2024-04-18 06:43:17',NULL),(32,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:43:33','2024-04-18 06:43:33',NULL),(33,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:44:21','2024-04-18 06:44:21',NULL),(34,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:46:07','2024-04-18 06:46:07',NULL),(35,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:46:23','2024-04-18 06:46:23',NULL),(36,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:46:45','2024-04-18 06:46:45',NULL),(37,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:47:20','2024-04-18 06:47:20',NULL),(38,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:47:31','2024-04-18 06:47:31',NULL),(39,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:48:17','2024-04-18 06:48:17',NULL),(40,'Adaptive coherent support','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-18 06:48:36','2024-04-18 06:48:36',NULL),(41,'Dune','In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission',130,'James Cameroon','Fantasy','PG','2024-03-26','2024-04-21 10:28:44','2024-04-21 10:28:44',NULL),(42,'Dune','In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission',130,'James Cameroon','Fantasy','PG','2024-03-26','2024-04-21 10:29:05','2024-04-21 10:29:05',NULL),(43,'Dune: Part Two','In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission',130,'James Cameroon','Fantasy','PG','2024-03-26','2024-04-21 10:40:56','2024-04-21 10:40:56',NULL),(44,'Dune: Part Two','In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission',130,'James Cameroon','Fantasy','PG','2024-03-26','2024-04-21 14:37:43','2024-04-21 14:37:43',NULL),(45,'Pengabdi Setannnn','Difference of describe time peace goal. Those concern pretty force most which bring.\nBlue leg allow company series. Season bank individual guy west per local. Heart trade produce economy.',106,'Kari Pollard','rest','PG','2022-10-26','2024-04-23 23:42:13','2024-04-23 23:42:13',NULL);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (10,'A1','2024-04-19 02:54:59','2024-04-19 02:54:59',NULL),(11,'A2','2024-04-19 02:54:59','2024-04-19 02:54:59',NULL),(12,'A3','2024-04-19 02:54:59','2024-04-19 02:54:59',NULL),(13,'A4','2024-04-19 02:54:59','2024-04-19 02:54:59',NULL),(14,'A5','2024-04-19 02:54:59','2024-04-19 02:54:59',NULL);
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtime_seats`
--

DROP TABLE IF EXISTS `showtime_seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime_seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_show_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `status` enum('available','booked') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `movie_show_id` (`movie_show_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `showtime_seats_ibfk_1` FOREIGN KEY (`movie_show_id`) REFERENCES `movie_shows` (`id`),
  CONSTRAINT `showtime_seats_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtime_seats`
--

LOCK TABLES `showtime_seats` WRITE;
/*!40000 ALTER TABLE `showtime_seats` DISABLE KEYS */;
INSERT INTO `showtime_seats` VALUES (19,19,10,'booked','2024-04-19 02:56:36','2024-04-19 02:56:36'),(20,19,11,'booked','2024-04-19 02:56:36','2024-04-19 02:56:36'),(21,19,12,'available','2024-04-19 02:56:36','2024-04-19 02:56:36'),(22,19,13,'available','2024-04-19 02:56:36','2024-04-19 02:56:36'),(23,19,14,'available','2024-04-19 02:56:36','2024-04-19 02:56:36'),(24,20,10,'available','2024-04-19 02:59:46','2024-04-19 02:59:46'),(25,20,11,'available','2024-04-19 02:59:46','2024-04-19 02:59:46'),(26,20,12,'available','2024-04-19 02:59:46','2024-04-19 02:59:46'),(27,20,13,'available','2024-04-19 02:59:46','2024-04-19 02:59:46'),(28,20,14,'available','2024-04-19 02:59:46','2024-04-19 02:59:46'),(29,21,10,'available','2024-04-21 11:01:54','2024-04-21 11:01:54'),(30,21,11,'available','2024-04-21 11:01:54','2024-04-21 11:01:54'),(31,21,12,'available','2024-04-21 11:01:54','2024-04-21 11:01:54'),(32,21,13,'available','2024-04-21 11:01:54','2024-04-21 11:01:54'),(33,21,14,'available','2024-04-21 11:01:54','2024-04-21 11:01:54');
/*!40000 ALTER TABLE `showtime_seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user 1','$2b$10$FPrLUL08IIUdDFOLzqf1/.c/rSo4MRRbnJmzQLAKGoemUUBHP.eYy','user1@mail.com',0,'2024-04-18 05:56:46','2024-04-18 05:56:46'),(2,'user 10','$2b$10$78DgADGd7ihgpDL5H9YKeOsnRZJy7HDHViVIE/puefVH/eX1GDBLu','user10@mail.com',0,'2024-04-21 10:03:03','2024-04-21 10:03:03'),(3,'user 10','$2b$10$tCh1JlcRap/eFFWlT2E1geVVTaDzD/jGvVhkQQPTH4PUzA5X.ko/u','user10@mail.com',0,'2024-04-21 10:05:21','2024-04-21 10:05:21'),(4,'user 10','$2b$10$x0v0dOvPbDeVGnKhlCyL6eucMBYK5VTbPmJFhjz1eYn/GHb7ZVxd.','user10@mail.com',0,'2024-04-21 10:06:11','2024-04-21 10:06:11'),(5,'user 11','$2b$10$F8isQMICtS4e/DhMQpN.ZeGQCtZqaqo25ju6H8mcg8rMPYqPfyG9S','user11@mail.com',0,'2024-04-21 10:10:20','2024-04-21 10:10:20'),(6,'user 5','$2b$10$OK8nUVNq2MdropQ63h0toOhpDTQSyyIxKMZfWUS0KwJhUB7aFNu42','user5@mail.com',0,'2024-04-23 23:35:40','2024-04-23 23:35:40'),(7,'user admin','$2b$10$Gt4rLbvq8i0bDitotKCTwumWuNcSVmk7CilJz/VSgtXR4JfKBugem','useradmin@mail.com',0,'2024-04-23 23:39:12','2024-04-23 23:39:12'),(8,'user admin1','$2b$10$FkfT7CbwHe2g8VPHCY49zeY/9yuOgsMmatwwXenVFK7tyirCYwgQ2','useradmin1@mail.com',1,'2024-04-23 23:41:43','2024-04-23 23:41:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cineprime'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 21:02:09
