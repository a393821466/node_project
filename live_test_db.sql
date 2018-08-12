-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 08 月 12 日 08:18
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `live_test_db`
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- 转存表中的数据 `live_group`
--

INSERT INTO `live_group` (`id`, `name`, `introduce`, `merchant`, `icon`, `power`, `create_time`) VALUES
(42, '超级管理员', '你们都是我小弟', 'system', '', 1, '1534061589422');

-- --------------------------------------------------------

--
-- 表的结构 `live_menu`
--

CREATE TABLE IF NOT EXISTS `live_menu` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT '子级路由id',
  `parent_id` bigint(20) DEFAULT NULL,
  `name` varchar(48) DEFAULT NULL,
  `path` varchar(68) DEFAULT NULL COMMENT '路径',
  `component` varchar(48) DEFAULT NULL COMMENT '视图',
  `redirect` varchar(255) DEFAULT NULL COMMENT '重定向',
  `title` varchar(32) DEFAULT NULL COMMENT '标题',
  `icon` varchar(48) DEFAULT NULL COMMENT 'icon',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '导航是否显示',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `live_menu`
--

INSERT INTO `live_menu` (`id`, `parent_id`, `name`, `path`, `component`, `redirect`, `title`, `icon`, `hidden`) VALUES
(1, 0, 'login', '/login', 'login/index', '', NULL, NULL, 1),
(2, 0, '404', '/404', '404', NULL, NULL, NULL, 1),
(3, 0, ' ', '/', 'Layout', 'home', '系统概述', 'example', NULL),
(6, 5, 'CallBoard', 'callBoard', 'systemModule/callBoard/index', '', '公告板', 'announcement', NULL),
(7, 5, 'ChatRecord', 'chatRecord', 'systemModule/chatRecord/index', NULL, '聊天记录', 'chatManagement', NULL),
(8, 5, 'Logger', 'logger', 'systemModule/logger/index', NULL, '日志管理', 'logger', NULL),
(9, 5, 'QuickReply', 'quickReply', 'systemModule/quickReply/index', NULL, '快捷回复', 'quickreply', NULL),
(4, 3, '', 'home', 'home/index', '', '系统概述', 'example', 0),
(5, 0, 'System', '/systemModule', 'Layout', 'callBoard', '系统设置', 'setup', NULL),
(21, 0, NULL, '*', NULL, '/404', '', '', 1),
(10, 5, 'CustomerService', 'customerService', 'systemModule/customerService/index', NULL, '在线客服', 'service', NULL),
(11, 0, 'Room', '/roomModule', 'Layout', 'roomSetup', '房间管理', 'roomManagement', NULL),
(12, 11, 'RoomSetup', 'roomSetup', 'roomModule/roomSetup/index', NULL, '房间设置', 'roomSetup', NULL),
(13, 11, 'AdminSetup', 'adminSetup', 'roomModule/adminSetup/index', NULL, '管理员设置', 'adminSetup', NULL),
(14, 11, 'ServiceSetup', 'serviceSetup', 'roomModule/serviceSetup/index', NULL, '客服设置', 'roomService', NULL),
(15, 0, 'User', '/userModule', 'Layout', 'UserSetup', '用户管理', 'userManagement', NULL),
(16, 15, 'MerchantSetup', 'merchantSetup', 'userModule/merchant/index', NULL, '品牌设置', 'merchant', NULL),
(17, 15, 'GroupSetup', 'groupSetup', 'userModule/group/index', NULL, '用户组管理', 'group', NULL),
(18, 15, 'UserSetup', 'userSetup', 'userModule/user/index', NULL, '用户设置', 'userSetup', NULL),
(19, 15, 'RobotSetup', 'robotSetup', 'userModule/robot/index', NULL, '机器人管理', 'robot', NULL);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=175 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `merchant`, `avator`, `status`, `f_status`, `a_status`, `roomId`, `create_time`) VALUES
(174, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', 'system', NULL, 1, 1, 1, NULL, '1534061589659');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=64 ;

--
-- 转存表中的数据 `live_usergroup`
--

INSERT INTO `live_usergroup` (`id`, `userid`, `groupid`) VALUES
(63, 174, 42);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
