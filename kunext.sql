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
-- Dumping data for table `lect`
--

INSERT INTO `lect` (`lect_id`, `lect_subject`, `lect_title`, `lect_detail`, `lect_file`, `lect_createtime`, `lect_createdate`, `lect_updatetime`, `lect_updatedate`, `lect_status`, `std_code`) VALUES
(12, '', 'จบซักที', 'เย้ๆ', '0.jpg,1.png', '17:30:27', '2024-05-05', '23:11:59', '2024-05-05', 'delete', '6521600435'),
(14, '', 'wer', 'dfgdfg', '0.mp4', '17:35:18', '2024-05-05', '', '', 'delete', '6521600435'),
(18, '', 't', 't', '0.mp4', '18:22:51', '2024-05-05', '', '', 'delete', '6521600435'),
(19, '', 'Data Science', 'อันนี้เป็นเนื้อหาปี 2 เทอม 2 K-means', '0.pptx', '18:40:13', '2024-05-05', '', '', 'delete', '6521600435'),
(20, '', 'กรรม', 'กรรมจริงๆ', '0.pdf', '18:41:16', '2024-05-05', '', '', 'delete', '6521600435'),
(21, '', 'เหนื่อย', 'เหนื่อยใจ', '0.txt', '18:42:31', '2024-05-05', '', '', 'delete', '6521600435'),
(22, '', 'จะได้ไหมหนอ', 'ได้เถอะ', '0.docx', '18:45:26', '2024-05-05', '', '', 'delete', '6521600435'),
(23, '', 'Kuy', 'Chophee', '0.jpeg', '01:03:05', '2024-05-06', '', '', 'delete', '6421650791'),
(24, '', 'Data Science ', '', '0.pptx', '08:15:44', '2024-05-06', '', '', 'delete', '6521651153'),
(25, '02739351', 'Docker และ Docker Compose Mysql และ phpmyadmin', 'อันนี้เป็นไฟล์จดสรุป Docker และ Docker Compose Mysql และ phpmyadmin ตามความเข้าใจ', '0.txt,1.txt', '21:20:13', '2024-05-07', '14:59:39', '2024-12-15', 'post', '6521600435'),
(26, '02739242', 'Data Science Pandas', 'ชีทวิชา Data Science ทำความรู้จัก Pandas', '0.pdf', '07:21:10', '2024-05-08', '22:22:09', '2025-02-17', 'post', '6521600435'),
(27, '', 'ห้ามอ่าน', '?', '0.jpg', '12:51:38', '2024-05-08', '', '', 'delete', '6521604350'),
(28, '', 'test', '', '0.pptx', '19:19:44', '2024-05-08', '', '', 'delete', '6521600435'),
(29, '', 'testpptx', '', '0.pptx', '19:25:27', '2024-05-08', '', '', 'delete', '6521600435'),
(31, '', 'เทคโนโลยีอินเทอร์เน็ต Internet Technology', 'เนื้อหา ปี 2 ภาค ปลาย พาเล่น phpmyadmin คุยกับ MySql', '0.docx', '19:24:15', '2024-05-09', '', '', 'delete', '6521600435'),
(32, '', 'Eng', '', '0.pdf', '22:53:54', '2024-05-09', '', '', 'delete', '6521650777'),
(33, '02739231', 'Data Base', 'ชีทเนื้อหาทั้งหมดของ Data Base', '231_Ch1ReviewC.pdf,231_Ch2Introduction.pdf,231_Ch3Performance.pdf,231_Ch4Array.pdf,231_Ch5Stack.pdf,231_Ch6Queues.pdf,231_Ch7LinkedLists.pdf,231_Ch8Tree.pdf,231_Ch9Graph.pdf', '20:28:57', '2024-05-11', '22:13:02', '2025-02-17', 'post', '6521600435'),
(34, '02739353', 'รายวิชา information technology management  ', 'เป็นไฟล์สรุปจากเนื้อหาสไลด์ ปี 3 เทอม 2 วิชา ITM (ถ้าสรุประหว่างเรียนจะดีหน่อยอาจารย์จะให้ส่งเพิ่มเป็นคะแนนพิเศษได้)', '0.pdf', '16:34:19', '2024-05-17', '16:37:07', '2024-05-17', 'post', '6321652091'),
(35, '02739341', 'Introduction to Artificial Intelligence (AI) ', 'เป็นไฟล์สรุปและโจทย์ที่ทำแบบฝึกหัดในห้องรวมถึงไฟล์ ที่จดเข้าห้องสอบสามารถเอาเข้าได้1แผ่นA4หน้าหลัง', '0.pdf,1.pdf', '16:59:51', '2024-05-17', '', '', 'post', '6321652091'),
(36, '', 'Introduction to Artificial Intelligence (AI) ', 'เป็นไฟล์สรุปและโจทย์ที่ทำแบบฝึกหัดในห้องรวมถึงไฟล์ ที่จดเข้าห้องสอบสามารถเอาเข้าได้1แผ่นA4หน้าหลัง', '0.pdf,1.pdf', '17:00:13', '2024-05-17', '', '', 'delete', '6321652091'),
(37, '02739331', 'Os ชื่อเต็มไม่แน่ใจ Operating System and System Sofware', 'สรุปชีสและแบบฝึกหัด', '0.pdf', '17:37:22', '2024-05-17', '', '', 'post', '6321652091'),
(38, '02739341', 'Machine Learning', 'Supervised Learning และ Unsupervised Learning', '0.pdf', '14:22:23', '2024-06-25', '14:58:53', '2024-12-15', 'post', '6521600435'),
(39, '02739331', 'OS', 'OS Windows NT Server', 'Windows_NT_Server_pdf.pdf', '21:38:31', '2024-11-29', '14:58:29', '2024-12-15', 'post', '6521600435'),
(40, '02739331', 'OS', 'บทที่ 3', 'os_chapter3.pdf', '01:14:45', '2024-11-29', '22:21:06', '2025-02-17', 'post', '6521600000'),
(41, '02739242', 'Data Science', 'Introduction to Data Science', 'Introduction_to_Data_Science.pdf', '23:52:06', '2024-11-30', '22:20:38', '2025-02-17', 'post', '6521600000'),
(42, '02739321-64', 'SE', 'Basic software testing unit1', 'Basic_software_testing_unit1.pdf', '10:12:02', '2024-12-01', '22:18:02', '2025-02-17', 'post', '6521600435'),
(43, '', 'Wisu', 'น้องโดนพี่คนนึงลากให้เข้าเว็บมอเถื่อนนนน', 'art_grff_01122024_0001.jpg', '21:58:26', '2024-12-02', '', '', 'delete', '6621655215'),
(44, '', 'หมวดศึกษาทั่วไป', 'หลักสูตรทั่วไป 64', '_64.pdf', '20:04:08', '2024-12-04', '', '', 'delete', '6521600435'),
(45, '02739212', 'Java', 'Import JAVA', 'import_java.pdf', '01:04:43', '2024-12-04', '22:17:13', '2025-02-17', 'post', '6521600435'),
(46, '', 'sdc', 'sdc', 'DS2.pdf', '02:13:05', '2024-12-04', '', '', 'delete', '6521600435'),
(47, '', 'dfhg', 'sdfg', 'DS2_1_.pdf', '02:20:09', '2024-12-04', '', '', 'delete', '6521600435'),
(48, '02739326-64', 'ERP', 'กระบวนการสร้างคุณค่า Value', 'D2_Value_Add.pdf', '20:34:10', '2024-12-14', '', '', 'post', '6521600435'),
(49, '02739352-64', 'Lect 1', 'Information Assurance and Security: Introduction', 'Lect_1.pdf', '14:09:48', '2024-12-19', '', '', 'post', '6521600435'),
(50, ' 02739352-64', 'Lect 2', 'Confidentiality', 'Lect2.pdf', '17:33:24', '2024-12-27', '', '', 'post', '6521600435'),
(51, '02739352-64', 'Lect 3', 'Firewall', 'lect3.pdf', '15:52:49', '2025-01-09', '15:34:57', '2025-02-01', 'post', '6521600435'),
(52, '02739352-64', 'High Availability Network', 'High Availability Network , Loadbalancing ', 'High_Availability_Network.pdf', '18:03:01', '2025-02-06', '16:32:27', '2025-02-17', 'post', '6521600435'),
(53, '02739352-64', 'Test', 'Tftft', '1_353_M.pdf', '16:48:55', '2025-02-17', '', '', 'delete', '6521600435'),
(54, 'Vfb', 'Bdfbvbdvbfghfghfgh', 'Dvbvdbdvbdv', '1_353_M.pdf', '16:57:36', '2025-02-17', '', '', 'delete', '6521600435'),
(55, '02739354-64', 'Introduction to internet of things', 'พื้นฐาน IOT', '1_Overview_of_IoT.pdf', '22:34:44', '2025-02-17', '', '', 'post', '6521600435'),
(56, '02739354-64', 'IOT', 'พื้นฐานด้านการใช้งานอุปกรณ์', '2_.pdf', '22:36:57', '2025-02-17', '', '', 'post', '6521600435'),
(57, '02739354-64', 'MQTT', 'การเชื่อมต่ออุปกณ์เข้ากับ MQTT', '3_MQTT.pdf', '22:38:02', '2025-02-17', '', '', 'post', '6521600435'),
(58, '02739354-64', 'Cloud Platform', 'การใช้งาน Netpie', '4_IoT_Cloud_Platform.pdf', '22:43:19', '2025-02-17', '', '', 'post', '6521600435'),
(59, '02739354-64', 'IOT', 'การใช้งานอุปกรณ์จากระยะไกล', '5_.pdf', '22:46:07', '2025-02-17', '', '', 'post', '6521600435'),
(60, '02739354-64', 'RestAPI', 'การประยุกต์ใช้ RestAPI ในการสั่งงานอุปกรณ์', '6_RestAPI_.pdf', '22:47:01', '2025-02-17', '', '', 'post', '6521600435');

-- --------------------------------------------------------

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
-- Dumping data for table `loglect`
--

INSERT INTO `loglect` (`loglect_id`, `lect_id`, `lect_subject`, `lect_title`, `lect_detail`, `lect_file`, `lect_status`, `std_code`, `lectlogdate`, `lectlogtime`) VALUES
(1, 44, '', 'หมวดศึกษาทั่วไป', 'หลักสูตรทั่วไป 64', '_64.pdf', 'create', '6521600435', '2024-12-04', '20:04:08'),
(2, 44, '', 'หมวดศึกษาทั่วไป', 'หลักสูตรทั่วไป 64', '_64.pdf', 'delete', '6521600435', '2024-12-04', '22:13:48'),
(4, 45, '', 'Java', 'Import JAVA', '', 'create', '6521600435', '2024-12-04', '01:04:43'),
(5, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:05:43'),
(6, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:09:48'),
(7, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:14:07'),
(8, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:17:39'),
(9, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:17:43'),
(10, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:17:55'),
(11, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:21:31'),
(12, 45, '', 'Java', 'โพยสรุป Import JAVA', 'DS3.pdf,import_java.pdf', 'delete', '6521600435', '2024-12-05', '01:21:53'),
(13, 45, '', 'Java', 'โพยสรุป Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:22:17'),
(14, 45, '', 'Java', 'Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:22:36'),
(15, 45, '', 'Java', 'Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:22:52'),
(16, 45, '', 'Java', 'Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:26:51'),
(17, 45, '', 'Java', 'Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:27:49'),
(18, 45, '', 'Java', 'Import JAVA', '', 'update', '6521600435', '2024-12-04', '01:28:07'),
(19, 46, '', 'sdc', 'sdc', '', 'create', '6521600435', '2024-12-04', '02:13:05'),
(20, 46, '', 'sdc', 'sdc', 'DS2.pdf', 'delete', '6521600435', '2024-12-05', '02:13:09'),
(21, 45, '', 'Java', 'Import JAVA', 'DS3.pdf,import_java.pdf', 'update', '6521600435', '2024-12-04', '02:16:30'),
(22, 45, '', 'Java', 'Import JAVA', 'import_java.pdf', 'update', '6521600435', '2024-12-04', '02:16:38'),
(23, 47, '', 'dfhg', 'sdfg', 'DS2_1_.pdf', 'create', '6521600435', '2024-12-04', '02:20:09'),
(24, 47, '', 'dfhg', 'sdfg', 'DS2_1_.pdf', 'delete', '6521600435', '2024-12-05', '02:20:15'),
(25, 48, '02739326-64', 'ERP', 'กระบวนการสร้างคุณค่า Value', 'D2_Value_Add.pdf', 'create', '6521600435', '2024-12-14', '20:34:10'),
(26, 48, '02739326-65', 'ERP', 'กระบวนการสร้างคุณค่า Value', 'D2_Value_Add.pdf', 'update', '6521600435', '2024-12-14', '20:48:09'),
(27, 48, '02739326-64', 'ERP', 'กระบวนการสร้างคุณค่า Value', 'D2_Value_Add.pdf', 'update', '6521600435', '2024-12-14', '20:48:19'),
(28, 48, '02739326-64', 'ERP', 'กระบวนการสร้างคุณค่า Value', 'D2_Value_Add.pdf', 'delete', '6521600435', '2024-12-14', '20:53:10'),
(29, 19, '', 'Data Science', 'อันนี้เป็นเนื้อหาปี 2 เทอม 2 K-means', '0.pptx', 'delete', '6521600435', '2024-12-14', '20:53:52'),
(30, 31, '', 'เทคโนโลยีอินเทอร์เน็ต Internet Technology', 'เนื้อหา ปี 2 ภาค ปลาย พาเล่น phpmyadmin คุยกับ MySql', '0.docx', 'delete', '6521600435', '2024-12-14', '20:53:56'),
(31, 39, '02739331', 'OS', 'OS Windows NT Server', 'Windows_NT_Server_pdf.pdf', 'update', '6521600435', '2024-12-15', '14:58:29'),
(32, 38, '02739341', 'Machine Learning', 'Supervised Learning และ Unsupervised Learning', '0.pdf', 'update', '6521600435', '2024-12-15', '14:58:53'),
(33, 25, '02739351', 'Docker และ Docker Compose Mysql และ phpmyadmin', 'อันนี้เป็นไฟล์จดสรุป Docker และ Docker Compose Mysql และ phpmyadmin ตามความเข้าใจ', '0.txt,1.txt', 'update', '6521600435', '2024-12-15', '14:59:39'),
(34, 49, '02739352-64', 'Lect 1', 'Information Assurance and Security: Introduction', 'Lect_1.pdf', 'create', '6521600435', '2024-12-19', '14:09:48'),
(35, 50, ' 02739352-64', 'Lect 2', 'Confidentiality', 'Lect2.pdf', 'create', '6521600435', '2024-12-27', '17:33:24'),
(36, 51, '02739352-64', 'Lect 3', 'Firewall', 'lect3.pdf', 'create', '6521600435', '2025-01-09', '15:52:49'),
(37, 51, '02739352-64', 'Lect 3 test', 'Firewall', 'lect3.pdf', 'update', '6521600435', '2025-02-01', '15:34:20'),
(38, 51, '02739352-64', 'Lect 3', 'Firewall', 'lect3.pdf', 'update', '6521600435', '2025-02-01', '15:34:57'),
(39, 52, '02739352-64', 'High Availability Network', 'High Availability Network , Loadbalancing ', 'High_Availability_Network.pdf', 'create', '6521600435', '2025-02-06', '18:03:01'),
(40, 52, '02739352-64yy', 'High Availability Network', 'High Availability Network , Loadbalancing ', 'High_Availability_Network.pdf', 'update', '6521600435', '2025-02-17', '16:32:19'),
(41, 52, '02739352-64', 'High Availability Network', 'High Availability Network , Loadbalancing ', 'High_Availability_Network.pdf', 'update', '6521600435', '2025-02-17', '16:32:27'),
(42, 53, '02739352-64', 'Ftft', 'Tftft', '1_353_M.pdf', 'create', '6521600435', '2025-02-17', '16:48:55'),
(43, 53, '02739352-64', 'Test', 'Tftft', '1_353_M.pdf', 'update', '6521600435', '2025-02-17', '16:49:10'),
(44, 53, '02739352-64', 'Test', 'Tftft', '1_353_M.pdf', 'delete', '6521600435', '2025-02-17', '16:49:14'),
(45, 54, 'Vfb', 'Bdfbvbdvb', 'Dvbvdbdvbdv', '1_353_M.pdf', 'create', '6521600435', '2025-02-17', '16:57:36'),
(46, 54, 'Vfb', 'Bdfbvbdvbfghfghfgh', 'Dvbvdbdvbdv', '1_353_M.pdf', 'update', '6521600435', '2025-02-17', '16:57:44'),
(47, 54, 'Vfb', 'Bdfbvbdvbfghfghfgh', 'Dvbvdbdvbdv', '1_353_M.pdf', 'delete', '6521600435', '2025-02-17', '16:57:47'),
(48, 33, '02739231', 'Data Base', 'ชีทเนื้อหาทั้งหมดของ Data Base', '231_Ch1ReviewC.pdf,231_Ch2Introduction.pdf,231_Ch3Performance.pdf,231_Ch4Array.pdf,231_Ch5Stack.pdf,231_Ch6Queues.pdf,231_Ch7LinkedLists.pdf,231_Ch8Tree.pdf,231_Ch9Graph.pdf', 'update', '6521600435', '2025-02-17', '22:13:02'),
(49, 45, '02739212', 'Java', 'Import JAVA', 'import_java.pdf', 'update', '6521600435', '2025-02-17', '22:17:13'),
(50, 42, '02739321-64', 'SE', 'Basic software testing unit1', 'Basic_software_testing_unit1.pdf', 'update', '6521600435', '2025-02-17', '22:18:02'),
(51, 41, '02739242', 'Data Science', 'Introduction to Data Science', 'Introduction_to_Data_Science.pdf', 'update', '6521600000', '2025-02-17', '22:20:38'),
(52, 40, '02739331', 'OS', 'บทที่ 3', 'os_chapter3.pdf', 'update', '6521600000', '2025-02-17', '22:21:06'),
(53, 26, '02739242', 'Data Science Pandas', 'ชีทวิชา Data Science ทำความรู้จัก Pandas', '0.pdf', 'update', '6521600435', '2025-02-17', '22:22:09'),
(54, 32, '', 'Eng', '', '0.pdf', 'delete', '6521650777', '2025-02-17', '22:29:05'),
(55, 55, '02739354-64', 'Introduction to internet of things', 'พื้นฐาน IOT', '1_Overview_of_IoT.pdf', 'create', '6521600435', '2025-02-17', '22:34:44'),
(56, 56, '02739354-64', 'IOT', 'พื้นฐานด้านการใช้งานอุปกรณ์', '2_.pdf', 'create', '6521600435', '2025-02-17', '22:36:57'),
(57, 57, '02739354-64', 'MQTT', 'การเชื่อมต่ออุปกณ์เข้ากับ MQTT', '3_MQTT.pdf', 'create', '6521600435', '2025-02-17', '22:38:02'),
(58, 58, '02739354-64', 'Cloud Platform', 'การใช้งาน Netpie', '4_IoT_Cloud_Platform.pdf', 'create', '6521600435', '2025-02-17', '22:43:19'),
(59, 59, '02739354-64', 'IOT', 'การใช้งานอุปกรณ์จากระยะไกล', '5_.pdf', 'create', '6521600435', '2025-02-17', '22:46:07'),
(60, 60, '02739354-64', 'RestAPI', 'การประยุกต์ใช้ RestAPI ในการสั่งงานอุปกรณ์', '6_RestAPI_.pdf', 'create', '6521600435', '2025-02-17', '22:47:01');

-- --------------------------------------------------------

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
-- Dumping data for table `lognews`
--

INSERT INTO `lognews` (`lognews_id`, `news_id`, `news_title`, `news_detail`, `news_status`, `std_code`, `newslogdate`, `newslogtime`) VALUES
(1, 10, 'หกด', 'กหด', 'create', '6521600435', '2024-11-29', '14:56:03'),
(2, 10, 'Test Edit log news', 'test', 'update', '6521600435', '2024-11-29', '15:02:40'),
(3, 9, '', '', 'delete', '6521600435', '2024-11-29', '15:04:35'),
(4, 8, '', '', 'delete', '6521600435', '2024-11-29', '15:04:37'),
(5, 5, '', '', 'delete', '6521600435', '2024-11-29', '15:04:42'),
(6, 6, '', '', 'delete', '6521600435', '2024-11-29', '15:04:44'),
(7, 7, '', '', 'delete', '6521600435', '2024-11-29', '15:04:47'),
(8, 10, '', '', 'delete', '6521600435', '2024-11-29', '15:05:06'),
(9, 11, 'Uadate Lecture post and search', 'You can only post pdf files.', 'create', '6521600435', '2024-12-01', '10:14:36'),
(10, 11, 'Update Lecture post and search', 'You can only post pdf files.', 'update', '6521600435', '2024-12-01', '10:14:49'),
(11, 11, 'Update Lecture post and search', 'สามารถโพสได้เฉพาะไฟล์ PDF\nเพิ่มประสิทธิภาพในการค้นหา Lect ให้ดียิ่งขึ้น', 'update', '6521600435', '2024-12-01', '12:57:13'),
(12, 12, 'Uasd', 'asd', 'create', '6521600435', '2024-12-05', '01:54:33'),
(13, 12, 'Uasd', 'asdsdf', 'update', '6521600435', '2024-12-05', '01:54:37'),
(14, 12, 'Uasd', 'asdsdfdsf', 'update', '6521600435', '2024-12-05', '01:54:53'),
(15, 12, 'Uasd', 'asdsdfdsfdfgs', 'update', '6521600435', '2024-12-05', '01:54:55'),
(16, 12, 'Uasd', 'asdsdfdsfdfgsaert', 'update', '6521600435', '2024-12-05', '01:54:57'),
(17, 12, 'Uasd', 'asdsdfdsfdfgsaertsdfghdgh', 'update', '6521600435', '2024-12-05', '01:54:59'),
(18, 12, 'Update Lecture Edit and Delete', 'สามารถแก้ไขและลบ Post Lecture ที่เคย Post', 'update', '6521600435', '2024-12-05', '01:56:28'),
(19, 13, 'ประกาศ ปิดปรับปรุง', 'วันที่ 19 ธันวาคม 2567 - 21 ธันวาคม 2567 จะทำการปิดปรับปรุง เพื่ออัพเดตระบบความปลอดภัย', 'create', '6521600435', '2024-12-19', '12:51:23'),
(20, 14, 'Rddr', 'Crrcc', 'create', '6521600435', '2025-02-17', '16:33:45'),
(21, 14, '', '', 'delete', '6521600435', '2025-02-17', '16:33:48'),
(22, 15, 'Rddr', 'Crrcc', 'create', '6521600435', '2025-02-17', '16:33:50'),
(23, 15, 'Rddrftfttv', 'Crrcc', 'update', '6521600435', '2025-02-17', '16:33:54'),
(24, 15, '', '', 'delete', '6521600435', '2025-02-17', '16:33:57'),
(25, 16, 'Update New URL', 'มีการเปลี่ยนแปลง URL ใหม่จากเดิม คือ http://kunext.online:3000 เป็น https://kunext.anasaki.live แทนเพื่อเพิ่มมาตรฐานด้านความปลอดภัย', 'create', '6521600435', '2025-02-17', '23:25:12'),
(26, 17, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', 'create', '6521600435', '2025-02-18', '15:04:41'),
(27, 17, '', '', 'delete', '6521600435', '2025-02-18', '15:04:55'),
(28, 18, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', 'create', '6521600435', '2025-02-18', '15:05:08'),
(29, 18, '', '', 'delete', '6521600435', '2025-02-18', '15:05:15'),
(30, 19, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', 'create', '6521600435', '2025-02-18', '15:05:38'),
(31, 19, '', '', 'delete', '6521600435', '2025-02-18', '15:05:48'),
(32, 20, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', 'create', '6521600435', '2025-02-18', '15:16:09'),
(33, 20, '', '', 'delete', '6521600435', '2025-02-18', '15:16:23'),
(34, 21, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', 'create', '6521600435', '2025-02-18', '17:02:04'),
(35, 21, '', '', 'delete', '6521600435', '2025-02-18', '17:02:15');

-- --------------------------------------------------------

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
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `news_title`, `news_detail`, `newsdatecreate`, `newstimecreate`, `std_code`, `news_status`) VALUES
(1, 'Update new path KU next new version', 'Update New UI ด้วย Tailwind.css\nFix Feature Issues\nRun ด้วย Next.js แทน React.js', '2024-11-29', '12:07:37', '6521600435', 'show'),
(2, 'Update Beta 0.2', 'ปรับโครงสร้างการจัดการภายในให้ดียิ่งขึ้น', '2024-11-29', '00:30:01', '6521600435', 'show'),
(3, 'test', 'test news feature', '2024-11-29', '12:49:10', '6521600435', 'delete'),
(4, 'test', 'test news feature 2', '2024-11-29', '12:48:22', '6521600435', 'delete'),
(5, 'test News log create', 'Test', '2024-11-29', '15:04:42', '6521600435', 'delete'),
(6, 'test News log create', 'Test', '2024-11-29', '15:04:44', '6521600435', 'delete'),
(7, 'test News log create', 'Test', '2024-11-29', '15:04:47', '6521600435', 'delete'),
(8, 'หกด', 'กหด', '2024-11-29', '15:04:37', '6521600435', 'delete'),
(9, 'หกด', 'กหด', '2024-11-29', '15:04:35', '6521600435', 'delete'),
(10, 'Test Edit log news', 'test', '2024-11-29', '15:05:06', '6521600435', 'delete'),
(11, 'Update Lecture post and search', 'สามารถโพสได้เฉพาะไฟล์ PDF\nเพิ่มประสิทธิภาพในการค้นหา Lect ให้ดียิ่งขึ้น', '2024-12-01', '12:57:13', '6521600435', 'show'),
(12, 'Update Lecture Edit and Delete', 'สามารถแก้ไขและลบ Post Lecture ที่เคย Post', '2024-12-05', '01:56:28', '6521600435', 'show'),
(13, 'ประกาศ ปิดปรับปรุง', 'วันที่ 19 ธันวาคม 2567 - 21 ธันวาคม 2567 จะทำการปิดปรับปรุง เพื่ออัพเดตระบบความปลอดภัย', '2024-12-19', '12:51:23', '6521600435', 'show'),
(14, 'Rddr', 'Crrcc', '2025-02-17', '16:33:48', '6521600435', 'delete'),
(15, 'Rddrftfttv', 'Crrcc', '2025-02-17', '16:33:57', '6521600435', 'delete'),
(16, 'Update New URL', 'มีการเปลี่ยนแปลง URL ใหม่จากเดิม คือ http://kunext.online:3000 เป็น https://kunext.anasaki.live แทนเพื่อเพิ่มมาตรฐานด้านความปลอดภัย', '2025-02-17', '23:25:12', '6521600435', 'show'),
(17, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', '2025-02-18', '15:04:55', '6521600435', 'delete'),
(18, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', '2025-02-18', '15:05:15', '6521600435', 'delete'),
(19, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', '2025-02-18', '15:05:48', '6521600435', 'delete'),
(20, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', '2025-02-18', '15:16:23', '6521600435', 'delete'),
(21, 'Automate Testing', 'ทดสอบการใช้งาน automate testing', '2025-02-18', '17:02:15', '6521600435', 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `pay_check`
--

CREATE TABLE `pay_check` (
  `pay_check_id` int(11) NOT NULL,
  `pay_id` varchar(255) NOT NULL,
  `std_code` varchar(255) NOT NULL,
  `pay_time` varchar(255) NOT NULL,
  `pay_date` varchar(255) NOT NULL,
  `pay_status` varchar(255) NOT NULL,
  `pay_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pay_list`
--

CREATE TABLE `pay_list` (
  `pay_id` int(11) NOT NULL,
  `pay_title` varchar(255) NOT NULL,
  `pay_detail` varchar(255) NOT NULL,
  `pay_year` varchar(255) NOT NULL,
  `pay_type` enum('normal','special') NOT NULL,
  `std_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`std_code`, `std_fname`, `std_lname`, `std_password`, `std_year`, `std_type`, `std_rank`, `std_status`, `std_email`, `std_verifytoken`, `std_otp`) VALUES
('6221600001', 'Mofu', 'Anasaki', '330fe82cb0e6b100710260f826229520f7dd133aaee3eccdcae3c493978fafa8', '62', 'normal', 'user', 'study', 'hanekawaneko46@gmail.com', '', ''),
('6321652091', 'ศิริรักษ์', 'ทับทิมทองไพสิฐ', 'c4dd2d36f060442416cf9f2b06e5a653aa1f7ef5e6012b94f2a353d8e95ac24c', '63', 'special', 'user', 'study', 'sirirak.tab@ku.th', '', ''),
('6421650791', 'สัณห์พิชญ์', 'ภูวไพศาลกิจ', '59ac71b529574e8d054ba32f9c13f620ec0a94ba1fe1b7e563d33a00f6e9a8f8', '64', 'special', 'admin', 'study', 'Sanpitch.p@ku.th', '', ''),
('6521600000', 'Chitchat', 'Anasaki', '580999b1d107cf86fbf694e5938da9e09e76b32ae89bf9f18bb07c5e178dfc46', '65', 'special', 'admin', 'study', 'kirorianasaki@gmail.com', '', ''),
('6521600001', 'M', 'M', 'f70a7301179d3754a3195c3149b710d568a831247e1acf29ac4704b26e5c66fd', '65', 'normal', 'user', 'study', 'artoriasak4210@gmail.com', '', ''),
('6521600401', 'เก้ากานต์', 'นาครธรรม', 'a5295c038be217c6805a947b2ec0d7ff0a2c13b31238cf964be592b0d761acdb', '65', 'normal', 'user', 'study', 'kawkan.n@ku.th', '', ''),
('6521600419', 'เจตพังคี', 'คล้ายเข็ม', 'cc3d1e5f505f34fe51c1632dab82998894261b20b7d3a965ac51f4d932a9587b', '65', 'normal', 'user', 'study', 'Jedtapungkee.c@ku.th', '', ''),
('6521600435', 'ชัชภณ', 'สุขโสมนัส', '330fe82cb0e6b100710260f826229520f7dd133aaee3eccdcae3c493978fafa8', '65', 'normal', 'superadmin', 'study', 'chatchapon.s@ku.th', '', ''),
('6521600460', 'ถิรวัฒน์', 'ณ ลำปาง', 'ca7384919deb65fe6235b8998799a147f9eabce1042684c845152649d8ae4fbf', '65', 'normal', 'user', 'study', 'thirawat.na@ku.th', '', ''),
('6521600478', 'ทัชชกร', 'รษามณีโชค', '6cf96a82e80af72d8d6e0d86011f0ec570228c9d6f44b1a0fad0eb18556b2136', '65', 'normal', 'user', 'study', 'thatchakorn.r@ku.th', '', ''),
('6521600486', 'ธนทรัพย์', 'สงสว่าง', '070344d987f61e9e37987ef1bd9c9406297ef723725a978c6d61976880840f20', '65', 'normal', 'user', 'study', 'tanasap.s@ku.th', '', ''),
('6521600524', 'พันชั่ง', 'ไชยโยธา', '36bdd58e4f1262ccaceb0c01079bc2b557c8c14df69aff845e5e19c184ce0893', '65', 'normal', 'user', 'study', 'punchung.k@ku.th', '', ''),
('6521600532', 'พีรภัทร', 'โรจน์วิภาภรณ์', 'b2a2d7ad7f9c9a5ff921720d178b62b783f047b61f621b4a9309544eed485975', '65', 'normal', 'user', 'study', 'mrpeerapat.r@ku.th ', '', ''),
('6521600541', 'ภวิษย์พร', 'แย้มสุวรรณ', '2718304804e325a2ea47b5b0eefec61a73a8ff333b246e9839133de07ce2e212', '65', 'normal', 'user', 'study', 'pavitporn.y@ku.th', '', ''),
('6521600567', 'สรณ์ชนก', 'วงศ์นาเคนทร์', '1b36136521352a0771c995681df8c66782c60b9229ff964e000bb1e4903c235a', '65', 'normal', 'user', 'study', 'sornchanok.v@ku.th', '', ''),
('6521600575', 'อติพนธ์', 'สาธุเสน', '5bd0e083c1602e524522545ebcb5fca32a701318f4d645be6996a397cd6dc600', '65', 'normal', 'user', 'study', 'atipon.sa@ku.th', '', ''),
('6521601989', 'ชนกานต์', 'ศรีเหรา', 'ac055d0d651bed00d1d0baca5227e6c49032e9e53396d873c815ea0c53761efc', '65', 'normal', 'user', 'study', 'chanakarn.srih@ku.th', '', ''),
('6521601997', 'โชติวัฒน์', 'เหลืองรุ่งไพศาล', 'f5a10c9c9e1815ba37cad8a920af4bd0cf357908101983759c8f3f4fc5eb1d2e', '65', 'normal', 'user', 'study', 'chotiwat.l@ku.th', '', ''),
('6521602004', 'ณัฐมน', 'เหล่าพราหมณ์', '0a4d9945511c2864f5585bbd0bf35253a41acdeb4c504fde3fa7a8ce71deeb91', '65', 'normal', 'user', 'study', 'nattamon.la@ku.th', '', ''),
('6521602012', 'ณัฐวัชร', 'เที่ยงธรรม', '5f1f3fd301f6dbd7f98d9e9f98efbde5fd7005380480a268070e47a4b88ea568', '65', 'normal', 'user', 'study', 'nattahawat.t@ku.th', '', ''),
('6521602021', 'ธเนศ', 'ศรีเจริญการกิจ', '7fcb2ba8114fa0a04c77947de34e16a7ec2a2c57762af53904bc6f047871b080', '65', 'normal', 'user', 'study', 'tanet.si@ku.th', '', ''),
('6521602039', 'ธัญชนิต', 'หงษาภิรมย์', 'd9aa67c5793bcc39d1d981bb79c6a977b46dc3947baa525d0c63729d574e5687', '65', 'normal', 'user', 'study', 'thanchanit.h@ku.th', '', ''),
('6521602047', 'ปรัตตกร', 'สมุลไพร', '169c45e1175036c640ac61ef06d7bd5393955292e7cd6548a7d32a1cf8365dd3', '65', 'normal', 'admin', 'study', 'parattakorn.s@ku.th ', '', ''),
('6521604201', 'กุลภัทร', 'กนกรัตนนุกูล', '35a54355223f74806b426f001fc2b412fb5615b6bdd4222708fc4c325c2e6a46', '65', 'normal', 'user', 'study', 'kulrapat.ka@ku.th', '', ''),
('6521604210', 'ญาณภัทร', 'จินดากุล', 'f70a7301179d3754a3195c3149b710d568a831247e1acf29ac4704b26e5c66fd', '65', 'normal', 'user', 'study', 'yannapat.c@ku.th', '', ''),
('6521604236', 'เนตรนภา', 'วระอ่อน', '712ce24f3b4dbcaea54bccb762aca83334097e3f88172000f28a5910205f6b39', '65', 'normal', 'admin', 'study', 'netnapa.v@ku.th', '', ''),
('6521604244', 'ปธานิน', 'ศิริองอาจ', '2668173b1a609f7addb1185be06993f8db0d19c51ab9a30a47bc954c086a28c3', '65', 'normal', 'user', 'study', 'phatanin.s@ku.th', '', ''),
('6521604309', 'สมเกียรติ', 'ช่วยเกิด', 'f4cfad3cd54f9c28fe08710d0b9eb68f174318b331e3f84b91a1b297772cfd54', '65', 'normal', 'user', 'study', 'somkiad.c@ku.th', '', ''),
('6521604325', 'สุพัฒน์', 'ยาโด', 'b1a6672f39a492913159edad5939af7952e96e815a769b46254219024d47f3e5', '65', 'normal', 'user', 'study', 'supat.ya@ku.th', '', ''),
('6521604350', 'อภิชาติ', 'เปลี่ยนรูป', 'c5967a216663114c5479e5e19b8e0221e004d8efce9fe4b1e6cc6823991f207a', '65', 'normal', 'user', 'study', 'aphichat.pl@ku.th', '', ''),
('6521604368', 'อรไท', 'วิลัยทอง', 'ec1a6823b831cb49a0cb412a135925e92e494a7e23869f95774a0baf1590abc2', '65', 'normal', 'user', 'study', 'orathai.wi@ku.th', '', ''),
('6521604376', 'อาภาศิริ', 'สีสม', '199e652f6afe2a6327af8bda153f24658f9e89b71b2671287b377b2623bdc27d', '65', 'normal', 'user', 'study', 'arpasiri.se@ku.th', '', ''),
('6521604392', 'อารีรัตน์', 'วรทวีทรัพย์', '5f9b952c2205ec72ccbcb3ef5b7a314bd507f2b6fd017549a73cd36e9738709f', '65', 'normal', 'user', 'study', 'areerat.v@ku.th', '', ''),
('6521650777', 'กุลธิดา', 'ทับทิมศรี', '706de1ae32a39ab0361c6471eac44a7dcf7807e0615d5e2d627b4e66467302b3', '65', 'special', 'user', 'study', 'kunthida.th@ku.th ', '', ''),
('6521650955', 'พัชรพล', 'ยอดราช', 'f69c4d9229fe0c90c69106dc821f76deffbe7998634a4ecf3ca7f579a1f642a5', '65', 'special', 'user', 'study', 'Phatcharaphon.y@ku.th', '', ''),
('6521650963', 'พัทธนันท์', 'แสงทับ', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', '65', 'special', 'user', 'study', 'pattanan.sae@ku.th', '', ''),
('6521651153', 'สรณ์ศิริ', 'ชาตรี', 'd368f83937254a85d90951c5c6760361daab840045c4a09390aafe7b6445e81a', '65', 'special', 'admin', 'study', 'sornsiri.c@ku.th', '', ''),
('6621601123', 'พิริยาภรณ์', 'แย้มสำรวล', '36f2ef0d8c33283ee3f48078c23d5cc9484bed6cc7f2af42e10dc423cc884eb3', '66', 'normal', 'admin', 'study', 'phiriyaporn.y@ku.th ', '', ''),
('6621655215', 'ณชล', 'นุชนิยม', '05f613d821e86beded55ac4b4a7735dc72f431e6aa149ae04fd8e368e2982819', '66', 'special', 'user', 'study', 'nachol.n@ku.th', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `year`
--

CREATE TABLE `year` (
  `years` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `year`
--

INSERT INTO `year` (`years`) VALUES
('62'),
('63'),
('64'),
('65'),
('66'),
('67');

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
-- Indexes for table `pay_check`
--
ALTER TABLE `pay_check`
  ADD PRIMARY KEY (`pay_check_id`);

--
-- Indexes for table `pay_list`
--
ALTER TABLE `pay_list`
  ADD PRIMARY KEY (`pay_id`);

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

--
-- AUTO_INCREMENT for table `pay_check`
--
ALTER TABLE `pay_check`
  MODIFY `pay_check_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pay_list`
--
ALTER TABLE `pay_list`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
