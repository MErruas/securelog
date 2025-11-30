-- Create database
CREATE DATABASE IF NOT EXISTS PROJECT;

USE PROJECT;

-- Create COMPANY table first (referenced by other tables)
CREATE TABLE IF NOT EXISTS COMPANY
(
    CompanyID       INT NOT NULL AUTO_INCREMENT,
    CompanyName     VARCHAR(100),
    PRIMARY KEY(CompanyID)
);

-- Create MEMBERS table
CREATE TABLE IF NOT EXISTS MEMBERS
(
    MemberID        INT NOT NULL AUTO_INCREMENT,
    LastName        VARCHAR(50),
    FirstName       VARCHAR(50) NOT NULL,
    CompanyID       INT NOT NULL,
    PRIMARY KEY(MemberID),
    FOREIGN KEY(CompanyID) REFERENCES COMPANY(CompanyID)
);

-- Create ASSET table
CREATE TABLE IF NOT EXISTS ASSET
(
    AssetID         INT NOT NULL AUTO_INCREMENT,
    AssetName       VARCHAR(100),
    AssetType       VARCHAR(50) NOT NULL,
    IP              VARCHAR(15) NOT NULL,
    AssetOwner      INT NOT NULL,
    PRIMARY KEY(AssetID),
    FOREIGN KEY(AssetOwner) REFERENCES MEMBERS(MemberID)
);

-- Create INCIDENT table with updated schema for the dashboard
CREATE TABLE IF NOT EXISTS INCIDENT
(
    IncidentID              INT NOT NULL AUTO_INCREMENT,
    Date                    DATE NOT NULL,
    ThreatType              VARCHAR(50) NOT NULL,
    SeverityLevel           VARCHAR(20) NOT NULL,
    Company                 VARCHAR(100) NOT NULL,
    Country                 VARCHAR(5) NOT NULL,
    Latitude                DECIMAL(10,8),
    Longitude               DECIMAL(11,8),
    ResponseTime            VARCHAR(50),
    DataBreached            VARCHAR(100),
    MitigationStrategy      VARCHAR(200),
    AffectedIndustry        VARCHAR(100),
    FinancialImpact         VARCHAR(50),
    PRIMARY KEY(IncidentID)
);

-- ============================================
-- REAL DATA FROM CSV (3000+ records)
-- ============================================


-- ============================================
-- DATA IMPORT INSTRUCTIONS
-- ============================================
-- To populate the INCIDENT table with data, run:
-- mysql -u root -p -P3306 project < all_incidents_data.sql
-- ============================================
