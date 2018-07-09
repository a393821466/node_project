-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 09 日 18:56
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
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户组id',
  `name` varchar(32) NOT NULL COMMENT '用户组名称',
  `introduce` varchar(255) DEFAULT NULL COMMENT '用户组介绍',
  `merchant` varchar(48) DEFAULT NULL COMMENT '品牌名',
  `icon` text COMMENT '用户组标志',
  `power` int(11) DEFAULT NULL COMMENT '权限',
  `create_time` varchar(64) NOT NULL COMMENT '用户组创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `live_group`
--

INSERT INTO `live_group` (`id`, `name`, `introduce`, `merchant`, `icon`, `power`, `create_time`) VALUES
(4, '超级管理员', '我就是超级管理员', '', '', 1, '1531128271399'),
(9, '普通用户', '按时打卡时间', 'dele', NULL, 0, '1531134247120'),
(8, '管理员', '按时打卡时间', 'dele', NULL, 0, '1531132635173');

-- --------------------------------------------------------

--
-- 表的结构 `live_merchant`
--

CREATE TABLE IF NOT EXISTS `live_merchant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `merchant` varchar(48) NOT NULL COMMENT '品牌名字',
  `create_time` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `live_merchant`
--

INSERT INTO `live_merchant` (`id`, `merchant`, `create_time`) VALUES
(4, 'dele', '1531121705870');

-- --------------------------------------------------------

--
-- 表的结构 `live_user`
--

CREATE TABLE IF NOT EXISTS `live_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=124 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `merchant`, `avator`, `status`, `statusId`, `roomId`, `phone`, `qq`, `superior_user`, `create_time`) VALUES
(99, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', NULL, NULL, 1, 1, NULL, NULL, '85029642', NULL, '1531128271549'),
(115, 'a1343332', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153047153'),
(109, 'lili22245', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139546453'),
(108, 'lili2224', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139544335'),
(107, 'lili222', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139540234'),
(119, 'aaa222432', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153074102'),
(116, 'a432432', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153061886'),
(117, 'a4xxaa', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153065196'),
(118, '342aaa', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153069698'),
(120, 'aaasdxwe', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153077732'),
(121, 'asx2422', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153083373'),
(122, 'awww23214', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153087125'),
(123, 'asww2242', 'UkI668l+MPIkcKs+FVBv5g==', '', '', '', 0, 1, NULL, '', '', '', '1531153091482');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- 转存表中的数据 `live_usergroup`
--

INSERT INTO `live_usergroup` (`id`, `userid`, `groupid`) VALUES
(4, 99, 4),
(8, 107, 9),
(9, 108, 9),
(10, 109, 9),
(16, 115, 9),
(18, 117, 9),
(17, 116, 9),
(20, 119, 9),
(19, 118, 9),
(21, 120, 9),
(22, 121, 9),
(23, 122, 9),
(24, 123, 9);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
