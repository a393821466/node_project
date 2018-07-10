-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 10 日 14:23
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `live_group`
--

INSERT INTO `live_group` (`id`, `name`, `introduce`, `merchant`, `icon`, `power`, `create_time`) VALUES
(11, '超级管理员', '你们都是我小弟', '', '', 1, '1531224331931'),
(9, '普通用户', '按时打卡时间', 'dele', NULL, 0, '1531134247120'),
(8, '管理员', '按时打卡时间', 'dele', NULL, 0, '1531132635173');

-- --------------------------------------------------------

--
-- 表的结构 `live_merchant`
--

CREATE TABLE IF NOT EXISTS `live_merchant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `merchant` varchar(48) NOT NULL COMMENT '品牌名字',
  `code` varchar(48) NOT NULL COMMENT '品牌别名',
  `create_time` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `live_merchant`
--

INSERT INTO `live_merchant` (`id`, `merchant`, `code`, `create_time`) VALUES
(4, 'dele', '', '1531121705870');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=119 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `merchant`, `avator`, `status`, `statusId`, `roomId`, `phone`, `qq`, `superior_user`, `create_time`) VALUES
(118, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, '1531224332097'),
(110, 'lili22245112', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139549152'),
(109, 'lili22245', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139546453'),
(108, 'lili2224', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139544335'),
(107, 'lili222', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139540234'),
(111, 'aaa2312', 'su0eb66xQWdctWrd/spi8Q==', NULL, NULL, '', 0, 1, NULL, NULL, NULL, NULL, '1531139554203');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `live_usergroup`
--

INSERT INTO `live_usergroup` (`id`, `userid`, `groupid`) VALUES
(13, 118, 11),
(8, 107, 9),
(9, 108, 9),
(10, 109, 9),
(11, 110, 9),
(12, 111, 9);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
