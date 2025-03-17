create database homepages;
use homepages;

drop table if exists `super_admin`; -- 超级管理员
create table super_admin(
	id int auto_increment primary key,
    superusername varchar(100) not null, -- 超级管理员用户名
    superuserpassword varchar(500) not null -- 超级管理员密码
);
select * from super_admin;

drop table if exists `technology_stack`; -- 技术栈表
create table technology_stack(
	id int auto_increment primary key,
    type varchar(20) not null, -- 类型
    filename varchar(100) not null, -- 文件名
    bgColor varchar(100) not null -- 背景颜色
);
select * from technology_stack;

-- webpush
CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    endpoint TEXT NOT NULL,
    auth TEXT NOT NULL,
    p256dh TEXT NOT NULL
);
select * from subscriptions;

-- 图书书库
drop table if exists `book_store`;
create table book_store(
	id int auto_increment primary key,
    bookname varchar(500) not null, -- 书名
    imgurl varchar(500) not null, -- 封面图片
    author varchar(100) not null, -- 作者
    bookdesc text , -- 描述
    linkhtml varchar(500) not null -- 跳转的位置
);
select * from book_store;

-- 用户表 
drop table if exists `user`; -- 用户表
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL, -- 用户名
    useremail VARCHAR(100) NOT NULL, -- 用户邮箱
    userpassword VARCHAR(100) NOT NULL -- 用户密码
);
select * from user;

-- 用户信息表
drop table if exists `user_info`;
create table user_info(
    id INT AUTO_INCREMENT PRIMARY KEY,
	useravater text, -- 用户头像
    userdesc varchar(200), -- 用户签名或者描述
    useraddress varchar(20), -- 用户地址
    username VARCHAR(50) NOT NULL ,-- 用户名
    userip varchar(100), -- 用户的Ip信息
    registerTime datetime, -- 注册时间
    uuid text -- 唯一标识符
);
select * from userinfo;

-- 音乐
drop table if exists `db_music`;
create table db_music(
    id INT AUTO_INCREMENT PRIMARY KEY,
    musicid varchar(100) not null, -- 音乐id
);
select * from db_music;

-- 相册
drop table if exists `db_photo`;
create table db_photo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    photopath varchar(400) not null, -- 图片路径
);