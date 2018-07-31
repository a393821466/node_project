-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 31 日 19:50
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `live_domain`
--

INSERT INTO `live_domain` (`id`, `domainlink`, `code`) VALUES
(20, '', 'samsung'),
(22, '', 'apple'),
(23, '', 'huawei'),
(24, '', 'sony'),
(25, '', 'oppo'),
(27, '', 'taobao');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

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
(36, '讲师', '索尼大法集团', 'sony', 'saa', 0, '1531902724704'),
(41, '管理员', '淘宝111', 'taobao', '13131', 0, '1532635232610');

-- --------------------------------------------------------

--
-- 表的结构 `live_menu`
--

CREATE TABLE IF NOT EXISTS `live_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '子级路由id',
  `parent_id` bigint(20) NOT NULL,
  `name` varchar(48) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `live_menu`
--

INSERT INTO `live_menu` (`id`, `parent_id`, `name`) VALUES
(1, 0, '系统设置'),
(2, 1, '新增设置'),
(3, 1, '修改设置'),
(4, 1, '删除设置'),
(5, 2, '修改密码'),
(6, 2, '找回密码'),
(7, 3, '家啊哈哈'),
(8, 3, '嗡嗡嗡');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `live_merchant`
--

INSERT INTO `live_merchant` (`id`, `merchant`, `code`, `status`, `create_time`) VALUES
(20, '三星', 'samsung', 1, '1531805219075'),
(22, '苹果', 'apple', 1, '1531814405064'),
(23, '华为', 'huawei', 0, '1531819604041'),
(24, '索尼', 'sony', 1, '1531888488498'),
(25, 'oppo', 'oppo', 1, '1531915582708'),
(27, ' 淘宝电商平台', 'taobao', 0, '1532633659023');

-- --------------------------------------------------------

--
-- 表的结构 `live_notice`
--

CREATE TABLE IF NOT EXISTS `live_notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `title` varchar(48) NOT NULL COMMENT '公告标题',
  `types` int(11) NOT NULL COMMENT '公告类型(0:保持不变,1:弹窗,2:广告)',
  `number` bigint(20) DEFAULT NULL COMMENT '编号',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `context` text NOT NULL COMMENT '公告内容',
  `create_time` varchar(64) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `live_privilege`
--

CREATE TABLE IF NOT EXISTS `live_privilege` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  `powerid` bigint(20) NOT NULL COMMENT '操作权id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  `f_status` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以登录(0:限时冻结,1:可登录,-1:永久状态)',
  `a_status` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以发言(0:限时禁言,1:可发言,-1:永久禁言)',
  `roomId` int(11) DEFAULT NULL COMMENT '房间号',
  `create_time` varchar(64) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=173 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `merchant`, `avator`, `status`, `f_status`, `a_status`, `roomId`, `create_time`) VALUES
(151, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', 'system', NULL, 1, 1, 1, NULL, '1531809775409'),
(152, 'admin666', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, 1, NULL, '1531810215026'),
(159, 'a222222', '1LbC5qTJd5z2yU3e/nCWAA==', '', 'oppo', '', 0, 1, 1, NULL, '1531916381062'),
(154, 'adm34356', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, 1, NULL, '1531810234274'),
(155, 'ad335543', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, 1, NULL, '1531810240413'),
(156, 'a23435534', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, 1, NULL, '1531810245077'),
(157, 'a111222', 'rz5+Jk6Xa4L7yKqrV681hw==', '', 'samsung', '', 0, 1, 1, NULL, '1531810249616'),
(160, 'a2222223', '1LbC5qTJd5z2yU3e/nCWAA==', '', 'oppo', '', 0, 1, 1, NULL, ''),
(161, 'a2225262', '1LbC5qTJd5z2yU3e/nCWAA==', '', 'oppo', '', 0, 1, 1, NULL, '1531991306422'),
(162, 'a222252624', '1LbC5qTJd5z2yU3e/nCWAA==', '', 'oppo', '', 0, 1, 1, NULL, '1531993607954'),
(172, 'admin54343', 'J/pxBuzR2StTyENGpkemJg==', NULL, 'taobao', '', 1, 1, 1, NULL, '1532635585325'),
(170, 'admin123', 'J/pxBuzR2StTyENGpkemJg==', '', 'oppo', '', 1, 1, 1, NULL, '1532282533415'),
(171, 'a8658145', 'UkI668l+MPIkcKs+FVBv5g==', '', 'oppo', '', 0, 1, 1, NULL, '1532630528864');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=62 ;

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
(51, 158, 35),
(53, 160, 40),
(54, 161, 40),
(55, 162, 40),
(56, 167, 38),
(57, 168, 38),
(58, 169, 38),
(59, 170, 40),
(60, 171, 40),
(61, 172, 41);

-- --------------------------------------------------------

--
-- 表的结构 `live_usersubset`
--

CREATE TABLE IF NOT EXISTS `live_usersubset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `phone` varchar(16) DEFAULT NULL COMMENT '手机号码',
  `qq` varchar(16) DEFAULT NULL COMMENT 'qq',
  `superior_user` varchar(60) DEFAULT NULL COMMENT '开户人',
  `end_anexcuse_time` varchar(64) DEFAULT '0' COMMENT '禁言结束时间',
  `end_freeze_time` varchar(64) DEFAULT '0' COMMENT '冻结结束时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `live_usersubset`
--

INSERT INTO `live_usersubset` (`id`, `userid`, `phone`, `qq`, `superior_user`, `end_anexcuse_time`, `end_freeze_time`) VALUES
(1, 151, '', '', '', '0', '0'),
(2, 168, '', '', '', '0', '0'),
(3, 169, '', '', '', '0', '0'),
(4, 170, '', '', '', '0', '0'),
(5, 171, '', '', '', '0', '0'),
(6, 172, NULL, NULL, NULL, '0', '0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
