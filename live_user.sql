-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 02 日 13:27
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
-- 表的结构 `live_user`
--

CREATE TABLE IF NOT EXISTS `live_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `groupId` int(11) NOT NULL COMMENT '用户角色',
  `nicename` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avator` text COMMENT '用户头像',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态(1:审核,0:未审核)',
  `statusId` int(11) NOT NULL DEFAULT '1' COMMENT '是否可以登录(1:可登录,0:不可登录)',
  `roomId` int(11) DEFAULT NULL COMMENT '房间号',
  `phone` varchar(16) DEFAULT NULL COMMENT '手机号',
  `qq` varchar(16) DEFAULT NULL COMMENT 'QQ',
  `create_time` varchar(64) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `live_user`
--

INSERT INTO `live_user` (`id`, `username`, `password`, `groupId`, `nicename`, `avator`, `status`, `statusId`, `roomId`, `phone`, `qq`, `create_time`) VALUES
(10, 'map2223', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', 0, 1, 0, '', '', '1530535922949'),
(9, 'map222', 'S9uCFVEjsiWy/btpP/zU7w==', 1, '', '', 0, 1, 0, '', '', '1530535918521');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
