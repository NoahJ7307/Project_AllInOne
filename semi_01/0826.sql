create database allinone;
drop tables householder;
use allinone;
create table householder(
	id int primary key auto_increment,
    mid varchar(300),
    password varchar(300),
    name varchar(300),
    carnumber varchar(300),
    birth int,
    dong int,
	ho int,
    phonenumber varchar(300)
);


select * from householder;
select * from housemember;