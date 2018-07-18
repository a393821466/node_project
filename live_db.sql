-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 18 日 12:27
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
-- 表的结构 `live_domain`
--

CREATE TABLE IF NOT EXISTS `live_domain` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '域名ID',
  `domainlink` varchar(60) NOT NULL COMMENT '域名',
  `code` varchar(48) NOT NULL COMMENT '品牌code',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- 转存表中的数据 `live_domain`
--

INSERT INTO `live_domain` (`id`, `domainlink`, `code`) VALUES
(20, '', 'samsung'),
(22, '', 'apple'),
(23, '', 'huawei'),
(24, '', 'sony'),
(25, '', 'oppo');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=41 ;

--
-- 转存表中的数据 `live_group`
--

INSERT INTO `live_group` (`id`, `name`, `introduce`, `merchant`, `icon`, `power`, `create_time`) VALUES
(26, '超级管理员', '你们都是我小弟', 'system', '', 1, '1531809775247'),
(27, '管理员', '三宋科技股份有限公司会员', 'samsung', NULL, 0, '1531810008089'),
(28, '讲师', '三宋科技股份有限公司会员', 'samsung', NULL, 0, '1531814664331'),
(30, '管理员', '苹果科技有限公司', 'apple', NULL, 0, '1531814477041'),
(40, '普通会员', 'oppo科技', 'oppo', 'saa', 0, '1531916275504'),
(35, '管理员', '索尼大法集团', 'sony', NULL, 0, '1531891823822'),
(39, '管理员', 'oppo科技', 'oppo', 'saa', 0, '1531916248916'),
(38, '普通会员', '索尼大法集团', 'sony', NULL, 0, '1531916132050'),
(36, '讲师', '索尼大法集团', 'sony', 'saa', 0, '1531902724704');

-- --------------------------------------------------------

--
-- 表的结构 `live_merchant`
--

CREATE TABLE IF NOT EXISTS `live_merchant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `merchant` varchar(48) NOT NULL COMMENT '品牌名字',
  `code` varchar(48) NOT NULL COMMENT '品牌别名',
  `status` int(11) NOT NULL COMMENT '品牌状态(1:启动,0:未启动)',
  `create_time` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- 转存表中的数据 `live_merchant`
--

INSERT INTO `live_merchant` (`id`, `merchant`, `code`, `status`, `create_time`) VALUES
(20, '三星', 'samsung', 1, '1531805219075'),
(22, '苹果', 'apple', 1, '1531814405064'),
(23, '华为', 'huawei', 0, '1531819604041'),
(24, '索尼', 'sony', 1, '1531888488498'),
(25, 'oppo', 'oppo', 1, '1531915582708');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=160 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `merchant`, `avator`, `status`, `statusId`, `roomId`, `phone`, `qq`, `superior_user`, `create_time`) VALUES
(151, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', 'system', NULL, 1, 1, NULL, NULL, NULL, NULL, '1531809775409'),
(152, 'admin666', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, NULL, '', '', '', '1531810215026'),
(159, 'a222222', '1LbC5qTJd5z2yU3e/nCWAA==', '', 'oppo', '', 0, 1, NULL, '', '', '', '1531916381062'),
(154, 'adm34356', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, NULL, '', '', '', '1531810234274'),
(155, 'ad335543', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, NULL, '', '', '', '1531810240413'),
(156, 'a23435534', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, NULL, '', '', '', '1531810245077'),
(157, 'a111222', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, NULL, '', '', '', '1531810249616'),
(158, 'admin123', 'J/pxBuzR2StTyENGpkemJg==', '苗人凤666', 'sony', '', 1, 1, NULL, NULL, NULL, NULL, '1531903386879');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=53 ;

--
-- 转存表中的数据 `live_usergroup`
--

INSERT INTO `live_usergroup` (`id`, `userid`, `groupid`) VALUES
(44, 151, 26),
(45, 152, 28),
(52, 159, 40),
(47, 154, 28),
(48, 155, 28),
(49, 156, 28),
(50, 157, 28),
(51, 158, 35);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
