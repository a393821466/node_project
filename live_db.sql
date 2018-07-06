-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 06 日 12:40
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `live_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `live_group`
--

CREATE TABLE IF NOT EXISTS `live_group` (
  `id` bigint(20) NOT NULL COMMENT '用户组id',
  `name` varchar(32) NOT NULL COMMENT '用户组名称',
  `introduce` varchar(255) DEFAULT NULL COMMENT '用户组介绍',
  `icon` text COMMENT '用户组标志',
  `create_time` varchar(64) NOT NULL COMMENT '用户组创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `live_me`
--

CREATE TABLE IF NOT EXISTS `live_me` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `merchant` varchar(48) NOT NULL COMMENT '品牌名字',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `live_user`
--

CREATE TABLE IF NOT EXISTS `live_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `groupId` int(11) NOT NULL COMMENT '用户角色',
  `nicename` varchar(50) DEFAULT NULL COMMENT '昵称',
  `merchant` varchar(32) DEFAULT NULL,
  `avator` text COMMENT '用户头像',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态(1:审核,0:未审核)',
  `statusId` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以登录(1:可登录,0:不可登录)',
  `roomId` int(11) DEFAULT NULL COMMENT '房间号',
  `phone` varchar(16) DEFAULT NULL COMMENT '手机号',
  `qq` varchar(16) DEFAULT NULL COMMENT 'QQ',
  `superior_user` varchar(60) DEFAULT NULL COMMENT '开户人',
  `create_time` varchar(64) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=64 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `groupId`, `nicename`, `merchant`, `avator`, `status`, `statusId`, `roomId`, `phone`, `qq`, `superior_user`, `create_time`) VALUES
(47, 'admin4233', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792595495'),
(30, 'name11', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530619637515'),
(31, 'admin11', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530621345867'),
(32, 'test223', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530623485829'),
(33, 'asdsasa', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530624276221'),
(34, 'test222', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530624284326'),
(35, 'test2223', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530626788944'),
(36, 'test2224', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530626911588'),
(37, 'test22341', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530683697151'),
(38, 'test2132', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', '', 0, 1, 0, '', '', '', '1530683797421'),
(39, 'test24', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530708152586'),
(41, 'wrw2223', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530708238791'),
(42, 'wrw2', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530708243169'),
(43, 'w', 'S9uCFVEjsiWy/btpP/zU7w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530708246990'),
(46, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', 1, '', '', '', 1, 1, 0, '', '', '', '1530763723993'),
(48, 'ad3442', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792602377'),
(49, 'ad344211', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792605191'),
(50, 'ad34421144', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792612011'),
(51, 'abc42333', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792618684'),
(52, 'abc4231', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792627509'),
(53, 'abc4466', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792639530'),
(54, 'abc42221', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792643699'),
(55, 'abc4244', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792646980'),
(56, 'abc1113', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792669685'),
(57, 'abc1123', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792707093'),
(58, 'abc1223', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792710122'),
(59, 'abc4223', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792719794'),
(60, 'abc4221', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792724571'),
(61, 'abc4255', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792728332'),
(62, 'abc22667', 'jrGAqhl4nzar/dlRelu0+w==', 0, NULL, '', '', 1, 1, NULL, NULL, NULL, NULL, '1530792734804'),
(63, 'admin6662', 'jrGAqhl4nzar/dlRelu0+w==', 1, '', NULL, '', 0, 1, NULL, '', '', '', '1530877045246');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
