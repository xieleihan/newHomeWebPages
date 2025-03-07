create database homepages;
use homepages;

drop table if exists `technology_stack`;
create table technology_stack(
	id int auto_increment primary key,
    type varchar(20) not null,
    filename varchar(100) not null,
    bgColor varchar(100) not null
);
select * from technology_stack;