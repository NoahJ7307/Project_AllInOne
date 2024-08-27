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