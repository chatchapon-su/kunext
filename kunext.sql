-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 07:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kunext`
--

-- --------------------------------------------------------

--
-- Table structure for table `lect`
--

CREATE TABLE `lect` (
  `lect_id` int(11) NOT NULL,
  `lect_subject` varchar(255) NOT NULL,
  `lect_title` varchar(255) NOT NULL,
  `lect_detail` varchar(255) NOT NULL,
  `lect_file` varchar(255) NOT NULL,
  `lect_createtime` varchar(255) NOT NULL,
  `lect_createdate` varchar(255) NOT NULL,
  `lect_updatetime` varchar(255) NOT NULL,
  `lect_updatedate` varchar(255) NOT NULL,
  `lect_status` enum('post','delete') NOT NULL,
  `std_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `loglect`
--

CREATE TABLE `loglect` (
  `loglect_id` int(11) NOT NULL,
  `lect_id` int(255) NOT NULL,
  `lect_subject` varchar(255) NOT NULL,
  `lect_title` varchar(255) NOT NULL,
  `lect_detail` varchar(255) NOT NULL,
  `lect_file` varchar(255) NOT NULL,
  `lect_status` enum('create','update','delete') NOT NULL,
  `std_code` varchar(255) NOT NULL,
  `lectlogdate` varchar(255) NOT NULL,
  `lectlogtime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `lognews`
--

CREATE TABLE `lognews` (
  `lognews_id` int(11) NOT NULL,
  `news_id` int(255) NOT NULL,
  `news_title` varchar(255) NOT NULL,
  `news_detail` varchar(255) NOT NULL,
  `news_status` enum('create','update','delete') NOT NULL,
  `std_code` varchar(255) NOT NULL,
  `newslogdate` varchar(255) NOT NULL,
  `newslogtime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `news_title` varchar(255) NOT NULL,
  `news_detail` varchar(255) NOT NULL,
  `newsdatecreate` varchar(255) NOT NULL,
  `newstimecreate` varchar(255) NOT NULL,
  `std_code` varchar(255) NOT NULL,
  `news_status` enum('show','delete') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `std_code` varchar(255) NOT NULL,
  `std_fname` varchar(255) NOT NULL,
  `std_lname` varchar(255) NOT NULL,
  `std_password` varchar(255) NOT NULL,
  `std_year` varchar(255) NOT NULL,
  `std_type` enum('normal','special') NOT NULL,
  `std_rank` enum('superadmin','admin','user') NOT NULL,
  `std_status` enum('study','out') NOT NULL,
  `std_email` varchar(255) NOT NULL,
  `std_verifytoken` varchar(255) NOT NULL,
  `std_otp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `year`
--

CREATE TABLE `year` (
  `years` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lect`
--
ALTER TABLE `lect`
  ADD PRIMARY KEY (`lect_id`);

--
-- Indexes for table `loglect`
--
ALTER TABLE `loglect`
  ADD PRIMARY KEY (`loglect_id`);

--
-- Indexes for table `lognews`
--
ALTER TABLE `lognews`
  ADD PRIMARY KEY (`lognews_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`std_code`),
  ADD UNIQUE KEY `std_email` (`std_email`);

--
-- Indexes for table `year`
--
ALTER TABLE `year`
  ADD PRIMARY KEY (`years`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lect`
--
ALTER TABLE `lect`
  MODIFY `lect_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `loglect`
--
ALTER TABLE `loglect`
  MODIFY `loglect_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `lognews`
--
ALTER TABLE `lognews`
  MODIFY `lognews_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
