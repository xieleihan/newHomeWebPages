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
    useraddress varchar(200), -- 用户地址
    username VARCHAR(50) NOT NULL ,-- 用户名
    userip varchar(100), -- 用户的Ip信息
    registerTime datetime, -- 注册时间
    uuid text -- 唯一标识符
);
select * from user_info;
INSERT INTO user_info (useravater, userdesc, useraddress, username, userip, registerTime, uuid) VALUES
('https://localhost:3000/static/avater_img/1.png', 'Life is beautiful.', 'New York, USA', 'JohnDoe', '192.168.1.1', '2024-03-31 10:00:00', '550e8400-e29b-41d4-a716-446655440000'),
('https://localhost:3000/static/avater_img/2.png', 'Dream big, work hard.', 'Los Angeles, USA', 'JaneSmith', '192.168.1.2', '2024-03-31 10:10:00', '550e8400-e29b-41d4-a716-446655440001'),
('https://localhost:3000/static/avater_img/3.png', 'Stay positive, stay fighting.', 'London, UK', 'AliceBrown', '192.168.1.3', '2024-03-31 10:20:00', '550e8400-e29b-41d4-a716-446655440002'),
('https://localhost:3000/static/avater_img/4.png', 'Happiness is a choice.', 'Toronto, Canada', 'CharlieWilson', '192.168.1.4', '2024-03-31 10:30:00', '550e8400-e29b-41d4-a716-446655440003'),
('https://localhost:3000/static/avater_img/5.png', 'Never stop exploring.', 'Sydney, Australia', 'DavidWhite', '192.168.1.5', '2024-03-31 10:40:00', '550e8400-e29b-41d4-a716-446655440004'),
('https://localhost:3000/static/avater_img/6.png', 'Make today amazing.', 'Berlin, Germany', 'EmilyClark', '192.168.1.6', '2024-03-31 10:50:00', '550e8400-e29b-41d4-a716-446655440005'),
('https://localhost:3000/static/avater_img/7.png', 'Success is no accident.', 'Paris, France', 'FrankThomas', '192.168.1.7', '2024-03-31 11:00:00', '550e8400-e29b-41d4-a716-446655440006'),
('https://localhost:3000/static/avater_img/8.png', 'Every moment matters.', 'Tokyo, Japan', 'GraceHarris', '192.168.1.8', '2024-03-31 11:10:00', '550e8400-e29b-41d4-a716-446655440007'),
('https://localhost:3000/static/avater_img/9.png', 'Be your own hero.', 'Seoul, South Korea', 'HenryWalker', '192.168.1.9', '2024-03-31 11:20:00', '550e8400-e29b-41d4-a716-446655440008'),
('https://localhost:3000/static/avater_img/10.png', 'Work hard, stay humble.', 'Beijing, China', 'IsabellaMartinez', '192.168.1.10', '2024-03-31 11:30:00', '550e8400-e29b-41d4-a716-446655440009'),
('https://localhost:3000/static/avater_img/11.png', 'Create your own sunshine.', 'Moscow, Russia', 'JackRobinson', '192.168.1.11', '2024-03-31 11:40:00', '550e8400-e29b-41d4-a716-446655440010'),
('https://localhost:3000/static/avater_img/12.png', 'Dream it. Believe it. Achieve it.', 'Rome, Italy', 'KatieYoung', '192.168.1.12', '2024-03-31 11:50:00', '550e8400-e29b-41d4-a716-446655440011'),
('https://localhost:3000/static/avater_img/13.png', 'Embrace the journey.', 'Madrid, Spain', 'LeoScott', '192.168.1.13', '2024-03-31 12:00:00', '550e8400-e29b-41d4-a716-446655440012'),
('https://localhost:3000/static/avater_img/14.png', 'Smile more, worry less.', 'Amsterdam, Netherlands', 'MiaGreen', '192.168.1.14', '2024-03-31 12:10:00', '550e8400-e29b-41d4-a716-446655440013'),
('https://localhost:3000/static/avater_img/15.png', 'Start each day with a grateful heart.', 'Stockholm, Sweden', 'NathanAdams', '192.168.1.15', '2024-03-31 12:20:00', '550e8400-e29b-41d4-a716-446655440014'),
('https://localhost:3000/static/avater_img/16.png', 'Keep pushing forward.', 'Vienna, Austria', 'OliviaParker', '192.168.1.16', '2024-03-31 12:30:00', '550e8400-e29b-41d4-a716-446655440015'),
('https://localhost:3000/static/avater_img/17.png', 'Chase your dreams.', 'Oslo, Norway', 'PeterEvans', '192.168.1.17', '2024-03-31 12:40:00', '550e8400-e29b-41d4-a716-446655440016'),
('https://localhost:3000/static/avater_img/18.png', 'Do what makes you happy.', 'Copenhagen, Denmark', 'QuinnMiller', '192.168.1.18', '2024-03-31 12:50:00', '550e8400-e29b-41d4-a716-446655440017'),
('https://localhost:3000/static/avater_img/19.png', 'Find joy in the journey.', 'Helsinki, Finland', 'RachelDavis', '192.168.1.19', '2024-03-31 13:00:00', '550e8400-e29b-41d4-a716-446655440018'),
('https://localhost:3000/static/avater_img/20.png', 'Believe in yourself.', 'Zurich, Switzerland', 'SamWilson', '192.168.1.20', '2024-03-31 13:10:00', '550e8400-e29b-41d4-a716-446655440019'),
('https://localhost:3000/static/avater_img/1.png', 'Life is beautiful.', 'New York, USA', 'JohnDoe', '192.168.1.1', '2024-03-31 10:00:00', '550e8400-e29b-41d4-a716-446655440000'),
('https://localhost:3000/static/avater_img/2.png', 'Dream big, work hard.', 'Los Angeles, USA', 'JaneSmith', '192.168.1.2', '2024-03-31 10:10:00', '550e8400-e29b-41d4-a716-446655440001'),
('https://localhost:3000/static/avater_img/3.png', 'Stay positive, stay fighting.', 'London, UK', 'AliceBrown', '192.168.1.3', '2024-03-31 10:20:00', '550e8400-e29b-41d4-a716-446655440002'),
('https://localhost:3000/static/avater_img/4.png', 'Happiness is a choice.', 'Toronto, Canada', 'CharlieWilson', '192.168.1.4', '2024-03-31 10:30:00', '550e8400-e29b-41d4-a716-446655440003'),
('https://localhost:3000/static/avater_img/5.png', 'Never stop exploring.', 'Sydney, Australia', 'DavidWhite', '192.168.1.5', '2024-03-31 10:40:00', '550e8400-e29b-41d4-a716-446655440004'),
('https://localhost:3000/static/avater_img/6.png', 'Make today amazing.', 'Berlin, Germany', 'EmilyClark', '192.168.1.6', '2024-03-31 10:50:00', '550e8400-e29b-41d4-a716-446655440005'),
('https://localhost:3000/static/avater_img/7.png', 'Success is no accident.', 'Paris, France', 'FrankThomas', '192.168.1.7', '2024-03-31 11:00:00', '550e8400-e29b-41d4-a716-446655440006'),
('https://localhost:3000/static/avater_img/8.png', 'Every moment matters.', 'Tokyo, Japan', 'GraceHarris', '192.168.1.8', '2024-03-31 11:10:00', '550e8400-e29b-41d4-a716-446655440007'),
('https://localhost:3000/static/avater_img/9.png', 'Be your own hero.', 'Seoul, South Korea', 'HenryWalker', '192.168.1.9', '2024-03-31 11:20:00', '550e8400-e29b-41d4-a716-446655440008'),
('https://localhost:3000/static/avater_img/10.png', 'Work hard, stay humble.', 'Beijing, China', 'IsabellaMartinez', '192.168.1.10', '2024-03-31 11:30:00', '550e8400-e29b-41d4-a716-446655440009'),
('https://localhost:3000/static/avater_img/11.png', 'Create your own sunshine.', 'Moscow, Russia', 'JackRobinson', '192.168.1.11', '2024-03-31 11:40:00', '550e8400-e29b-41d4-a716-446655440010'),
('https://localhost:3000/static/avater_img/12.png', 'Dream it. Believe it. Achieve it.', 'Rome, Italy', 'KatieYoung', '192.168.1.12', '2024-03-31 11:50:00', '550e8400-e29b-41d4-a716-446655440011'),
('https://localhost:3000/static/avater_img/13.png', 'Embrace the journey.', 'Madrid, Spain', 'LeoScott', '192.168.1.13', '2024-03-31 12:00:00', '550e8400-e29b-41d4-a716-446655440012'),
('https://localhost:3000/static/avater_img/14.png', 'Smile more, worry less.', 'Amsterdam, Netherlands', 'MiaGreen', '192.168.1.14', '2024-03-31 12:10:00', '550e8400-e29b-41d4-a716-446655440013'),
('https://localhost:3000/static/avater_img/15.png', 'Start each day with a grateful heart.', 'Stockholm, Sweden', 'NathanAdams', '192.168.1.15', '2024-03-31 12:20:00', '550e8400-e29b-41d4-a716-446655440014'),
('https://localhost:3000/static/avater_img/16.png', 'Keep pushing forward.', 'Vienna, Austria', 'OliviaParker', '192.168.1.16', '2024-03-31 12:30:00', '550e8400-e29b-41d4-a716-446655440015'),
('https://localhost:3000/static/avater_img/17.png', 'Chase your dreams.', 'Oslo, Norway', 'PeterEvans', '192.168.1.17', '2024-03-31 12:40:00', '550e8400-e29b-41d4-a716-446655440016'),
('https://localhost:3000/static/avater_img/18.png', 'Do what makes you happy.', 'Copenhagen, Denmark', 'QuinnMiller', '192.168.1.18', '2024-03-31 12:50:00', '550e8400-e29b-41d4-a716-446655440017'),
('https://localhost:3000/static/avater_img/19.png', 'Find joy in the journey.', 'Helsinki, Finland', 'RachelDavis', '192.168.1.19', '2024-03-31 13:00:00', '550e8400-e29b-41d4-a716-446655440018'),
('https://localhost:3000/static/avater_img/20.png', 'Believe in yourself.', 'Zurich, Switzerland', 'SamWilson', '192.168.1.20', '2024-03-31 13:10:00', '550e8400-e29b-41d4-a716-446655440019'),
('https://localhost:3000/static/avater_img/1.png', 'Life is beautiful.', 'New York, USA', 'JohnDoe', '192.168.1.1', '2024-03-31 10:00:00', '550e8400-e29b-41d4-a716-446655440000'),
('https://localhost:3000/static/avater_img/2.png', 'Dream big, work hard.', 'Los Angeles, USA', 'JaneSmith', '192.168.1.2', '2024-03-31 10:10:00', '550e8400-e29b-41d4-a716-446655440001'),
('https://localhost:3000/static/avater_img/3.png', 'Stay positive, stay fighting.', 'London, UK', 'AliceBrown', '192.168.1.3', '2024-03-31 10:20:00', '550e8400-e29b-41d4-a716-446655440002'),
('https://localhost:3000/static/avater_img/4.png', 'Happiness is a choice.', 'Toronto, Canada', 'CharlieWilson', '192.168.1.4', '2024-03-31 10:30:00', '550e8400-e29b-41d4-a716-446655440003'),
('https://localhost:3000/static/avater_img/5.png', 'Never stop exploring.', 'Sydney, Australia', 'DavidWhite', '192.168.1.5', '2024-03-31 10:40:00', '550e8400-e29b-41d4-a716-446655440004'),
('https://localhost:3000/static/avater_img/6.png', 'Make today amazing.', 'Berlin, Germany', 'EmilyClark', '192.168.1.6', '2024-03-31 10:50:00', '550e8400-e29b-41d4-a716-446655440005'),
('https://localhost:3000/static/avater_img/7.png', 'Success is no accident.', 'Paris, France', 'FrankThomas', '192.168.1.7', '2024-03-31 11:00:00', '550e8400-e29b-41d4-a716-446655440006'),
('https://localhost:3000/static/avater_img/8.png', 'Every moment matters.', 'Tokyo, Japan', 'GraceHarris', '192.168.1.8', '2024-03-31 11:10:00', '550e8400-e29b-41d4-a716-446655440007'),
('https://localhost:3000/static/avater_img/9.png', 'Be your own hero.', 'Seoul, South Korea', 'HenryWalker', '192.168.1.9', '2024-03-31 11:20:00', '550e8400-e29b-41d4-a716-446655440008'),
('https://localhost:3000/static/avater_img/10.png', 'Work hard, stay humble.', 'Beijing, China', 'IsabellaMartinez', '192.168.1.10', '2024-03-31 11:30:00', '550e8400-e29b-41d4-a716-446655440009'),
('https://localhost:3000/static/avater_img/11.png', 'Create your own sunshine.', 'Moscow, Russia', 'JackRobinson', '192.168.1.11', '2024-03-31 11:40:00', '550e8400-e29b-41d4-a716-446655440010'),
('https://localhost:3000/static/avater_img/12.png', 'Dream it. Believe it. Achieve it.', 'Rome, Italy', 'KatieYoung', '192.168.1.12', '2024-03-31 11:50:00', '550e8400-e29b-41d4-a716-446655440011'),
('https://localhost:3000/static/avater_img/13.png', 'Embrace the journey.', 'Madrid, Spain', 'LeoScott', '192.168.1.13', '2024-03-31 12:00:00', '550e8400-e29b-41d4-a716-446655440012'),
('https://localhost:3000/static/avater_img/14.png', 'Smile more, worry less.', 'Amsterdam, Netherlands', 'MiaGreen', '192.168.1.14', '2024-03-31 12:10:00', '550e8400-e29b-41d4-a716-446655440013'),
('https://localhost:3000/static/avater_img/15.png', 'Start each day with a grateful heart.', 'Stockholm, Sweden', 'NathanAdams', '192.168.1.15', '2024-03-31 12:20:00', '550e8400-e29b-41d4-a716-446655440014'),
('https://localhost:3000/static/avater_img/16.png', 'Keep pushing forward.', 'Vienna, Austria', 'OliviaParker', '192.168.1.16', '2024-03-31 12:30:00', '550e8400-e29b-41d4-a716-446655440015'),
('https://localhost:3000/static/avater_img/17.png', 'Chase your dreams.', 'Oslo, Norway', 'PeterEvans', '192.168.1.17', '2024-03-31 12:40:00', '550e8400-e29b-41d4-a716-446655440016'),
('https://localhost:3000/static/avater_img/18.png', 'Do what makes you happy.', 'Copenhagen, Denmark', 'QuinnMiller', '192.168.1.18', '2024-03-31 12:50:00', '550e8400-e29b-41d4-a716-446655440017'),
('https://localhost:3000/static/avater_img/19.png', 'Find joy in the journey.', 'Helsinki, Finland', 'RachelDavis', '192.168.1.19', '2024-03-31 13:00:00', '550e8400-e29b-41d4-a716-446655440018'),
('https://localhost:3000/static/avater_img/20.png', 'Believe in yourself.', 'Zurich, Switzerland', 'SamWilson', '192.168.1.20', '2024-03-31 13:10:00', '550e8400-e29b-41d4-a716-446655440019');


-- 音乐
drop table if exists `db_music`;
create table db_music(
    id INT AUTO_INCREMENT PRIMARY KEY,
    musicid varchar(100) not null -- 音乐id
);
select * from db_music;

-- 相册
drop table if exists `db_photo`;
create table db_photo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    photopath varchar(400) not null -- 图片路径
);

-- 中国访问数量表
drop table if exists `chinaaccess`;
create table chinaaccess(
	id int auto_increment primary key,
    province varchar(20) not null,
    accessvalue varchar(1000) not null
);
select * from chinaaccess;

INSERT INTO chinaaccess (province, accessvalue) VALUES 
('南海诸岛', 0), 
('北京', 7342), 
('天津', 658), 
('上海', 7123), 
('重庆', 7987), 
('河北', 432), 
('河南', 876), 
('云南', 654), 
('辽宁', 345), 
('黑龙江', 765), 
('湖南', 432), 
('安徽', 987), 
('山东', 456), 
('新疆', 123), 
('江苏', 654), 
('浙江', 7234), 
('江西', 987), 
('湖北', 765), 
('广西', 432), 
('甘肃', 876), 
('山西', 345), 
('内蒙古', 765), 
('陕西', 543), 
('吉林', 234), 
('福建', 765), 
('贵州', 543), 
('广东', 8976), 
('青海', 321), 
('西藏', 765), 
('四川', 234), 
('宁夏', 543), 
('海南', 765), 
('台湾', 234), 
('香港', 7776), 
('澳门', 7765);