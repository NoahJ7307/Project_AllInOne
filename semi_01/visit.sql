use allinone;

drop table visit_park;
create table visit_park(
	id_visit int primary key auto_increment,
    name_visit varchar(10),
    phone_visit varchar(100),
    carNumber_visit varchar(10),
    date_visit date,
    dong_visit int,
    ho_visit int
);

set sql_safe_updates = 0;
select * from visit_park;
delete from visit_park;
insert into visit_park(name_visit,phone_visit,carNumber_visit,date_visit,dong_visit,ho_visit) 
	values('정승균','123111111','123','2024-08-26','101','9999');

update visit_park set name_visit='1111',carNumber_visit='1111' where id_visit = 8;
select * from visit_park where name_visit like '%2%';