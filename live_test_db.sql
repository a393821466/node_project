-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 08 月 24 日 13:08
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=142 ;

--
-- 转存表中的数据 `live_domain`
--

INSERT INTO `live_domain` (`id`, `domainlink`, `code`) VALUES
(40, '', 'apple'),
(41, '', 'huawei'),
(42, '', 'oppo'),
(43, '', 'yichala'),
(45, '', 'asds'),
(46, '', 'sdasd'),
(47, '', 'sda'),
(48, '', 'asd'),
(49, '', 'q'),
(96, '', 'asd23131'),
(110, '', 'a31312'),
(126, '', 'a2321'),
(128, '', 'sadas'),
(129, '', 'asdass'),
(130, '', 'dsa3434'),
(131, '', 'asd12'),
(132, '', 'as144213'),
(133, '', 'fdf324');

-- --------------------------------------------------------

--
-- 表的结构 `live_group`
--

CREATE TABLE IF NOT EXISTS `live_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户组id',
  `name` varchar(32) NOT NULL COMMENT '用户组名称',
  `introduce` varchar(255) DEFAULT NULL COMMENT '用户组介绍',
  `group_code` varchar(48) DEFAULT NULL COMMENT '品牌名',
  `icon` text COMMENT '用户组标志',
  `power` int(11) DEFAULT NULL COMMENT '权限',
  `create_time` varchar(64) NOT NULL COMMENT '用户组创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;

--
-- 转存表中的数据 `live_group`
--

INSERT INTO `live_group` (`id`, `name`, `introduce`, `group_code`, `icon`, `power`, `create_time`) VALUES
(42, '超级管理员', '你们都是我小弟', 'system', '', 1, '1534061589422'),
(43, '管理员', '大飒飒我', 'apple', '', 0, '1534139663166'),
(44, '普通用户', '的撒哇哇', 'apple', '', 0, '1534143811991'),
(46, '骑兵', '打完我去', 'apple', 'http://127.0.0.1:3001/uploads/groupIcon/1534218906668.png', 0, '1534219072471'),
(55, '多拉拉', '', 'apple', 'http://127.0.0.1:3001/uploads/groupIcon/1534237749323.png', 0, '1534493068278'),
(56, '我认为', '', 'apple', 'http://127.0.0.1:3001/uploads/groupIcon/1534237860343.png', 0, '1534237860348'),
(57, '我认为啊', '', 'apple', 'http://127.0.0.1:3001/uploads/groupIcon/1534237888595.png', 0, '1534237888600'),
(58, 'uuu', '4113', 'apple', 'http://127.0.0.1:3001/uploads/groupIcon/1534237948914.jpeg', 0, '1534237948918'),
(60, '普通会员', '', 'apple', '', 0, '1534330991641'),
(85, '的撒旦', '', 'asd23131', '', 0, '1534746199379'),
(86, '大飒飒', '', 'asd23131', '', 0, '1534746210676'),
(99, '的撒网', '', 'asd23131', '', 0, '1534758556807');

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
  `row` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `live_menu`
--

INSERT INTO `live_menu` (`id`, `parent_id`, `name`, `path`, `component`, `redirect`, `title`, `icon`, `hidden`, `row`) VALUES
(1, 0, 'login', '/login', 'login/index', '', NULL, NULL, 1, NULL),
(2, 0, '404', '/404', '404', NULL, NULL, NULL, 1, NULL),
(3, 0, ' ', '/', 'Layout', 'home', '系统概述', 'example', NULL, NULL),
(6, 5, 'CallBoard', 'callBoard', 'systemModule/callBoard/index', '', '公告板', 'announcement', NULL, NULL),
(7, 5, 'ChatRecord', 'chatRecord', 'systemModule/chatRecord/index', NULL, '聊天记录', 'chatManagement', NULL, NULL),
(8, 5, 'Logger', 'logger', 'systemModule/logger/index', NULL, '日志管理', 'logger', NULL, NULL),
(9, 5, 'QuickReply', 'quickReply', 'systemModule/quickReply/index', NULL, '快捷回复', 'quickreply', NULL, NULL),
(4, 3, '', 'home', 'home/index', '', '系统概述', 'example', 0, NULL),
(5, 0, 'System', '/systemModule', 'Layout', 'callBoard', '系统设置', 'setup', NULL, NULL),
(21, 0, NULL, '*', NULL, '/404', '', '', 1, NULL),
(10, 5, 'CustomerService', 'customerService', 'systemModule/customerService/index', NULL, '在线客服', 'service', NULL, NULL),
(11, 0, 'Room', '/roomModule', 'Layout', 'roomSetup', '房间管理', 'roomManagement', NULL, NULL),
(12, 11, 'RoomSetup', 'roomSetup', 'roomModule/roomSetup/index', NULL, '房间设置', 'roomSetup', NULL, NULL),
(13, 11, 'AdminSetup', 'adminSetup', 'roomModule/adminSetup/index', NULL, '管理员设置', 'adminSetup', NULL, NULL),
(14, 11, 'ServiceSetup', 'serviceSetup', 'roomModule/serviceSetup/index', NULL, '客服设置', 'roomService', NULL, NULL),
(15, 0, 'User', '/userModule', 'Layout', 'UserSetup', '用户管理', 'userManagement', NULL, NULL),
(16, 15, 'MerchantSetup', 'merchantSetup', 'userModule/merchant/index', NULL, '品牌设置', 'merchant', NULL, 1),
(17, 15, 'GroupSetup', 'groupSetup', 'userModule/group/index', NULL, '角色管理', 'group', NULL, NULL),
(18, 15, 'UserSetup', 'userSetup', 'userModule/user/index', NULL, '用户设置', 'userSetup', NULL, NULL),
(19, 15, 'RobotSetup', 'robotSetup', 'userModule/robot/index', NULL, '机器人管理', 'robot', NULL, NULL);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=143 ;

--
-- 转存表中的数据 `live_merchant`
--

INSERT INTO `live_merchant` (`id`, `merchant`, `code`, `status`, `create_time`) VALUES
(40, '苹果', 'apple', 1, '1534132383313'),
(41, '华为', 'huawei', 1, '1534411750976'),
(42, 'oppo', 'oppo', 1, '1534413583688'),
(43, '一查拉病毒', 'yichala', 1, '1534486163731'),
(45, 'asdas', 'asds', 1, '1534737258969'),
(46, 'asa', 'sdasd', 1, '1534737262603'),
(47, 'dsadas', 'sda', 1, '1534737266622'),
(48, 'wqe', 'asd', 1, '1534737270432'),
(49, 'qa', 'q', 0, '1534737280242'),
(96, '的撒哇哇', 'asd23131', 0, '1534744569335'),
(110, '阿萨德撒网', 'a31312', 1, '1534752809168'),
(126, '的撒网2131', 'a2321', 1, '1534755025819'),
(128, '的撒的撒', 'sadas', 1, '1534757516402'),
(129, 'daas', 'asdass', 1, '1534757665463'),
(130, '大的萨达', 'dsa3434', 1, '1534757670088'),
(131, '的撒打算', 'asd12', 1, '1534757678372'),
(132, '迪瑟尔', 'as144213', 1, '1534757683987'),
(133, '的飒飒', 'fdf324', 1, '1534757689801'),
(142, '超级管理', 'system', 1, '1535005286126');

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
-- 表的结构 `live_room`
--

CREATE TABLE IF NOT EXISTS `live_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '房间id号',
  `room` bigint(20) DEFAULT NULL COMMENT '房间id',
  `code` varchar(60) DEFAULT NULL COMMENT '所属品牌',
  `title` varchar(120) DEFAULT NULL COMMENT '房间标题',
  `logo` text COMMENT '房间logo',
  `icon` text COMMENT '房间icon',
  `bag` text COMMENT '房间背景',
  `qr` text COMMENT '房间二维码',
  `roomStatus` int(11) DEFAULT '0' COMMENT '系统状态0:关闭,1:开启,2:限时,3:加密',
  `chatServerUrl` varchar(128) DEFAULT NULL COMMENT '聊天服务器地址',
  `videoModule` int(11) DEFAULT '0' COMMENT '视频模块0:直播1:广告2:图片',
  `liveService` int(11) DEFAULT '0' COMMENT '直播厂商0:七牛云1:阿里云2:YY',
  `pcCode` text COMMENT 'pc端直播模块代码',
  `mobileCode` text COMMENT 'mobile直播模块代码',
  `robotNum` bigint(20) DEFAULT NULL COMMENT '机器人人数',
  `service` varchar(48) DEFAULT NULL COMMENT '客服号码',
  `statistics` text COMMENT '统计代码',
  `copyright` varchar(68) DEFAULT NULL COMMENT '版权',
  `create_time` varchar(68) NOT NULL COMMENT '房间创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='房间' AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 表的结构 `live_roomsubset`
--

CREATE TABLE IF NOT EXISTS `live_roomsubset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '房间附属表id',
  `roomId` bigint(20) DEFAULT NULL COMMENT '房间id',
  `regfilter` text COMMENT '注册过滤',
  `chatfilter` text COMMENT '聊天过滤',
  `roompwd` varchar(48) DEFAULT NULL COMMENT '房间密码 ',
  `roomkeymsg` varchar(68) DEFAULT NULL COMMENT '房间加密提示',
  `videolooktime` bigint(120) DEFAULT NULL COMMENT '直播限时观看',
  `msgshield` int(11) DEFAULT '0' COMMENT '消息屏蔽0屏蔽,1不屏蔽',
  `msgrecording` int(11) DEFAULT '0' COMMENT '消息记录0记录,1不记录',
  `msgreview` int(11) DEFAULT '0' COMMENT '消息审核0审核1不审核',
  `threeLogin` int(11) DEFAULT '0' COMMENT '第三方登陆0否,1是',
  `regreview` int(11) DEFAULT '0' COMMENT '注册审核',
  `keywords` text COMMENT '关键字',
  `descrip` text COMMENT '描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='房间附表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `live_user`
--

CREATE TABLE IF NOT EXISTS `live_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `nicename` varchar(50) DEFAULT '匿名人士' COMMENT '昵称',
  `user_code` varchar(32) DEFAULT NULL,
  `groupName` varchar(48) NOT NULL COMMENT '用户组名称',
  `avator` text COMMENT '用户头像',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态(1:审核,0:未审核)',
  `f_status` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以登录(0:限时冻结,1:可登录,-1:永久状态)',
  `a_status` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以发言(0:限时禁言,1:可发言,-1:永久禁言)',
  `roomId` int(11) DEFAULT NULL COMMENT '房间号',
  `create_time` varchar(64) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=231 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `nicename`, `user_code`, `groupName`, `avator`, `status`, `f_status`, `a_status`, `roomId`, `create_time`) VALUES
(174, 'admin', 'jrGAqhl4nzar/dlRelu0+w==', '沙拉嘿哟', 'system', '超级管理员', 'http://127.0.0.1:3001/uploads/userAvator/1535088609984.png', 1, 1, 1, NULL, '1534061589659'),
(215, 'a421413', 'J/pxBuzR2StTyENGpkemJg==', 'asdsasa', 'apple', '管理员', '', 1, 1, 1, 0, '1534759933942'),
(216, 'a1234122', 'J/pxBuzR2StTyENGpkemJg==', 'sadsad', 'apple', '管理员', '', 1, 1, 1, 0, '1534759943680'),
(213, 'a132422', 'J/pxBuzR2StTyENGpkemJg==', 'dsadwe11', 'apple', '管理员', '', 0, 1, 1, 0, '1534759787143'),
(212, 'asdasd113', 'J/pxBuzR2StTyENGpkemJg==', 'asda11', 'apple', '管理员', '', 1, 1, 1, 0, '1534759594134'),
(200, 'zhazhahui', 'J/pxBuzR2StTyENGpkemJg==', '的撒旦', 'apple', '普通用户', '', 0, 1, 1, 1324, '1534758925410'),
(201, 'kldka', 'rz5+Jk6Xa4L7yKqrV681hw==', '渣渣辉', 'apple', '骑兵', '', 0, 1, 1, 0, '1534758961001'),
(202, 'jdskjw222', 'J/pxBuzR2StTyENGpkemJg==', '金蛇狂舞', 'apple', '我认为啊', '', 1, 1, 1, 1334, '1534759000480'),
(203, 'akfje333', '8S6NcvuBGOI22xBu9BSrlA==', '渣渣', 'apple', '普通用户', '', 1, 1, 1, 0, '1534759029381'),
(208, 'lala2', 'J/pxBuzR2StTyENGpkemJg==', 'dsa213', 'apple', '骑兵', '', 1, 1, 1, 0, '1534759528209'),
(209, 'asdasdas1131', 'J/pxBuzR2StTyENGpkemJg==', 'dsa131', 'apple', '管理员', '', 1, 1, 1, 0, '1534759541828'),
(210, 'dsa2311', 'J/pxBuzR2StTyENGpkemJg==', '爱你就像老鼠爱大米', 'apple', '管理员', 'http://127.0.0.1:3001/uploads/userAvator/1535031484427.png', 1, 1, 1, 0, '1534759557055'),
(211, 'sdsa2342', 'J/pxBuzR2StTyENGpkemJg==', '的撒网22', 'apple', '普通用户', '', 1, 1, 1, 0, '1534759577687'),
(219, 'a654gfd', 'zCFaeIx0hgvxKvUFRcv1QA==', 'dsadsa4333', 'apple', 'uuu', '', 0, 0, 1, 13332, '1534760238969'),
(229, 'a222222', 'J/pxBuzR2StTyENGpkemJg==', NULL, 'apple', '普通用户', 'http://127.0.0.1:3001/uploads/userAvator/1535084872752.jpeg', 1, 1, 1, 0, '1534933724425'),
(228, 'a111111', 'J/pxBuzR2StTyENGpkemJg==', NULL, 'apple', '管理员', 'http://127.0.0.1:3001/uploads/userAvator/1535084770267.jpeg', 1, 1, 1, 0, '1534908541252');

-- --------------------------------------------------------

--
-- 表的结构 `live_usergroup`
--

CREATE TABLE IF NOT EXISTS `live_usergroup` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `groupid` bigint(20) NOT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=120 ;

--
-- 转存表中的数据 `live_usergroup`
--

INSERT INTO `live_usergroup` (`id`, `userid`, `groupid`) VALUES
(63, 174, 42),
(97, 208, 46),
(92, 203, 44),
(91, 202, 57),
(90, 201, 46),
(89, 200, 44),
(100, 211, 44),
(99, 210, 43),
(76, 187, 43),
(98, 209, 43),
(101, 212, 43),
(102, 213, 43),
(104, 215, 43),
(105, 216, 43),
(108, 219, 58),
(117, 228, 43),
(118, 229, 44);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66 ;

--
-- 转存表中的数据 `live_usersubset`
--

INSERT INTO `live_usersubset` (`id`, `userid`, `phone`, `qq`, `superior_user`, `end_anexcuse_time`, `end_freeze_time`) VALUES
(8, 174, NULL, NULL, NULL, '0', '0'),
(9, 176, '', '', '', '0', '0'),
(10, 177, '', '', '', '0', '0'),
(11, 178, '', '', '', '0', '0'),
(12, 179, '', '', '', '0', '0'),
(13, 180, '', '', '', '0', '0'),
(14, 181, '', '', '', '0', '0'),
(15, 182, '', '', '', '0', '0'),
(16, 183, '', '', '', '0', '0'),
(17, 184, '', '', '', '0', '0'),
(18, 185, '', '', '', '0', '0'),
(19, 186, NULL, NULL, NULL, '0', '0'),
(20, 187, NULL, NULL, NULL, '0', '0'),
(21, 188, '', '', 'admin', '0', '0'),
(22, 189, '', '', 'admin', '0', '0'),
(23, 190, '', '', 'admin', '0', '0'),
(24, 191, '', '', 'admin', '0', '0'),
(25, 192, '', '', 'admin', '0', '0'),
(26, 193, '', '', 'admin', '0', '0'),
(27, 194, '', '', 'admin', '0', '0'),
(28, 195, '', '', 'admin', '0', '0'),
(29, 196, '', '', 'admin', '0', '0'),
(30, 197, '', '', 'admin', '0', '0'),
(31, 198, '', '', 'admin', '0', '0'),
(32, 199, '', '', 'admin', '0', '0'),
(33, 200, '', '', 'admin', '0', '0'),
(34, 201, '', '', 'admin', '0', '0'),
(35, 202, '', '', 'admin', '0', '0'),
(36, 203, '', '', 'admin', '0', '0'),
(37, 204, '', '', 'admin', '0', '0'),
(38, 205, '', '', 'admin', '0', '0'),
(39, 206, '', '', 'admin', '0', '0'),
(40, 207, '', '', 'admin', '0', '0'),
(41, 208, '', '', 'admin', '0', '0'),
(42, 209, '', '', 'admin', '0', '0'),
(43, 210, NULL, NULL, 'admin', '0', '0'),
(44, 211, '', '', 'admin', '0', '0'),
(45, 212, '', '', 'admin', '0', '0'),
(46, 213, '', '', 'admin', '0', '0'),
(47, 214, '', '', 'admin', '0', '0'),
(48, 215, '', '', 'admin', '0', '0'),
(49, 216, '', '', 'admin', '0', '0'),
(50, 217, '', '', 'admin', '0', '0'),
(51, 218, '', '', 'admin', '0', '0'),
(52, 219, '', '', 'admin', '0', '1535040000'),
(53, 220, '', '', 'admin', '0', '0'),
(54, 221, '', '', 'admin', '0', '0'),
(55, 222, '', '', 'admin', '0', '0'),
(56, 223, '', '', 'admin', '0', '0'),
(57, 224, '', '', 'admin', '0', '0'),
(58, 225, '', '', 'admin', '0', '0'),
(59, 226, '', '', 'admin', '0', '0'),
(60, 227, '', '', 'admin', '0', '0'),
(61, 228, NULL, NULL, 'admin', '0', '1534999680'),
(62, 229, NULL, NULL, 'a111111', '0', '1535000100');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
