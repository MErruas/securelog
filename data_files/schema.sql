-- SecureLog Database Schema
-- Created: 2025
-- Description: Database schema for incident tracking system

CREATE DATABASE IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `project`;

-- ============================================
-- Table structure for table `INCIDENT`
-- ============================================

DROP TABLE IF EXISTS `INCIDENT`;
CREATE TABLE `INCIDENT` (
  `IncidentID` int NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `ThreatType` varchar(100) DEFAULT NULL,
  `SeverityLevel` varchar(50) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL,
  `Country` varchar(10) DEFAULT NULL,
  `Latitude` decimal(10,6) DEFAULT NULL,
  `Longitude` decimal(10,6) DEFAULT NULL,
  `ResponseTime` varchar(100) DEFAULT NULL,
  `DataBreached` varchar(255) DEFAULT NULL,
  `MitigationStrategy` varchar(255) DEFAULT NULL,
  `AffectedIndustry` varchar(100) DEFAULT NULL,
  `FinancialImpact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IncidentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- ============================================
-- DATA IMPORT INSTRUCTIONS
-- ============================================
-- To populate the INCIDENT table with data, run:
-- mysql -u root -p -P3306 project < all_incidents_data.sql
-- ============================================
