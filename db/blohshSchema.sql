-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: blohsh
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user` (`user_id`),
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,10,'coco','i love billie','2025-04-23 15:31:20'),(7,12,'billieeilish','hi im billie!!!!1111','2025-04-23 22:11:44'),(23,10,'coco','guys just so you know, i may delete your comments any time i want haha','2025-04-25 12:20:59'),(32,10,'coco','yay wordle working','2025-04-28 12:30:46'),(33,10,'coco','switcheed to c#, edited','2025-04-29 10:15:18'),(43,11,'pepsi','oh no','2025-04-29 20:07:55'),(45,10,'coco','i think everything is doneeee','2025-04-29 21:44:46'),(47,10,'coco','i love my interface yall','2025-05-04 14:13:28'),(50,10,'coco','wordle fixed yall','2025-05-05 11:30:03'),(51,11,'pepsi','i love this, me too','2025-05-05 11:55:57'),(53,11,'pepsi','edited','2025-05-05 20:50:11'),(57,10,'coco','my passport is in the uk guys','2025-05-13 15:57:12'),(58,10,'coco','oh nooo i accidentally deleted history comments NOOOO','2025-05-13 15:57:51'),(59,15,'BubbleGumm','salome was here <3','2025-05-13 15:58:56'),(65,10,'coco','hello\ndoing pos logic, cooked lowkeyfsdj','2025-05-25 12:09:35'),(69,10,'coco','hello','2025-06-03 09:15:04'),(70,10,'coco','when i was older','2025-06-03 09:15:13'),(71,10,'coco','i was a sailor','2025-06-03 09:15:18'),(72,10,'coco','on an open sea','2025-06-03 09:15:26'),(73,10,'coco','2 days omg','2025-06-04 12:59:28'),(76,38,'ooo','hello','2025-06-13 09:47:43'),(78,10,'coco','bitch, you passed','2025-06-28 13:39:43');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (121,12,'you should see me in a crown'),(122,12,'8'),(123,12,'listen before i go'),(124,12,'Not My Responsibility'),(125,12,'OverHeated'),(126,12,'SKINNY'),(127,12,'LUNCH'),(140,13,'!!!!!!!'),(141,13,'Halley\'s Comet'),(142,13,'THE GREATEST'),(144,13,'SKINNY'),(145,13,'all the good girls go to hell'),(146,13,'BITTERSUITE'),(147,13,'ilomilo'),(242,14,'xanny'),(244,14,'OverHeated'),(245,14,'SKINNY'),(246,14,'CHIHIRO'),(297,11,'8'),(298,11,'!!!!!!!'),(310,15,'!!!!!!!'),(348,37,'Not My Responsibility'),(352,10,'bad guy'),(355,38,'SKINNY'),(356,10,'wish you were gay');
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `album` varchar(255) NOT NULL,
  `track_number` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'!!!!!!!','When We All Fall Asleep, Where Do We Go?',1),(2,'bad guy','When We All Fall Asleep, Where Do We Go?',2),(3,'xanny','When We All Fall Asleep, Where Do We Go?',3),(4,'you should see me in a crown','When We All Fall Asleep, Where Do We Go?',4),(5,'all the good girls go to hell','When We All Fall Asleep, Where Do We Go?',5),(6,'wish you were gay','When We All Fall Asleep, Where Do We Go?',6),(7,'when the party’s over','When We All Fall Asleep, Where Do We Go?',7),(8,'8','When We All Fall Asleep, Where Do We Go?',8),(9,'my strange addiction','When We All Fall Asleep, Where Do We Go?',9),(10,'bury a friend','When We All Fall Asleep, Where Do We Go?',10),(11,'ilomilo','When We All Fall Asleep, Where Do We Go?',11),(12,'listen before i go','When We All Fall Asleep, Where Do We Go?',12),(13,'i love you','When We All Fall Asleep, Where Do We Go?',13),(14,'goodbye','When We All Fall Asleep, Where Do We Go?',14),(15,'Getting Older','Happier Than Ever',1),(16,'I Didn\'t Change My Number','Happier Than Ever',2),(17,'Billie Bossa Nova','Happier Than Ever',3),(18,'my future','Happier Than Ever',4),(19,'Oxytocin','Happier Than Ever',5),(20,'GOLDWING','Happier Than Ever',6),(21,'Lost Cause','Happier Than Ever',7),(22,'Halley\'s Comet','Happier Than Ever',8),(23,'Not My Responsibility','Happier Than Ever',9),(24,'OverHeated','Happier Than Ever',10),(25,'Everybody Dies','Happier Than Ever',11),(26,'Your Power','Happier Than Ever',12),(27,'NDA','Happier Than Ever',13),(28,'Therefore I Am','Happier Than Ever',14),(29,'Happier Than Ever','Happier Than Ever',15),(30,'Male Fantasy','Happier Than Ever',16),(31,'SKINNY','Hit Me Hard and Soft',1),(32,'LUNCH','Hit Me Hard and Soft',2),(33,'CHIHIRO','Hit Me Hard and Soft',3),(34,'BIRDS OF A FEATHER','Hit Me Hard and Soft',4),(35,'WILDFLOWER','Hit Me Hard and Soft',5),(36,'THE GREATEST','Hit Me Hard and Soft',6),(37,'L\'AMOUR DE MA VIE','Hit Me Hard and Soft',7),(38,'THE DINER','Hit Me Hard and Soft',8),(39,'BITTERSUITE','Hit Me Hard and Soft',9),(40,'BLUE','Hit Me Hard and Soft',10);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `wordleWins` int DEFAULT '0',
  `userRank` varchar(255) DEFAULT 'Newbie',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'billie','$2b$10$m7VAwq7Fhpf.27MbzQgEzOHj558Xcj.EGzStGvVnpbnagB3PYIpN.','user',0,'Newbie'),(2,'hi','$2b$10$qfnza6NMORPs6RnpxEbmMuVLtCCqz5vajnob6bvUvt2niqBxRbxWm','user',0,'Newbie'),(3,'lil','$2b$10$DrnHV.Z6r2DR2SZVTP4ZveeyOPWFpGAcWhIvzlMyIls5odF9v0Nfa','user',0,'Newbie'),(4,'cu','$2b$10$QYPOtcraN8w45TeEq0ZETeAn6p5U5oUXpnoGNEc.2N12PwOCMkf7a','user',0,'Newbie'),(7,'bu','$2b$10$naMHQTEyf/obESg69ZO6NOc6FU9LCsjky1UufqXZ9vxIOcKX4FJ8W','user',0,'Newbie'),(8,'lol','$2b$10$LTjP/Zg.rQImcGLJ2idEHuZvfvK4s1A.MZF6RYbqC1RoOy8xoMWN6','user',0,'Newbie'),(9,'little','$2b$10$e4TYJcCnsd6jTsr/BpEbxuBu4gt1/JetTon2SJomLOAjsLP6/gb4y','user',0,'Newbie'),(10,'coco','$2b$10$kFbg3IR9QGjsqyx3zS8IQOPwhNNYbNFivt/E8ZLSAyMQFCdqr04Ii','admin',54,'Expert'),(11,'pepsi','$2b$10$FpV3E1qRZhx3r9xDRlPJl.zzeiBmGsVoLC05aV9pK3Szj4AbHE94a','user',2,'Newbie'),(12,'billieeilish','$2b$10$FsKBQTOxvrLDwEI4YWYZ5.yObkyi/526N3LLry/FhnWg/RXEleNxO','user',0,'Newbie'),(13,'eva','$2b$10$Kc7wyMORDzWjnY5TTfB/ROVALbAJ8gJzLKRAJu2O.sTARKwRam7.e','user',0,'Newbie'),(14,'shark','$2a$11$oTaKCCTRI2aUa8zjBOQYRurRtBvAakEPkHp.F4aRl2ynVJq3435r6','user',1,'Newbie'),(15,'BubbleGumm','$2a$11$ZWaABQ5Kea3cWJXXaQ/g.uBS82UeB4iksxV71o2VTEQvwUUcia7aG','user',1,'Newbie'),(16,'pass','$2a$11$Pyr949Bghh/pbMkjNcdKj.5oRpcYP225bbAquhJuf38u8ZIkDsIrO','user',0,'Newbie'),(37,'anya','$2a$11$YW.lrkqRDA01Vkae2Ku8n.OcmOWG0QPLLnesqSz3cu25rf8JI7/fK','user',1,'Newbie'),(38,'ooo','$2a$11$yMcDBnAKcCoJK.0ysRA6quMlrIsC5Towjw1emtLDqnrCKiBKF7T6e','user',1,'Newbie');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-19 12:25:30
