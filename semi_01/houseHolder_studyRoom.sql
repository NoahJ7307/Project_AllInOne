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
drop tables reservation_studyRoom;

create table reservation_studyRoom(
	rno int primary key auto_increment, -- rno추가함 
	date date,
    time time,
    seatNum int,
    uid int, foreign key(uid) references householder(id) 
);




select * from householder;
select * from reservation_studyRoom;