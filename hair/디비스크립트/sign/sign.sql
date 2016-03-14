테이블 생성
create table sign (
	name varchar(15) primary key,
	email varchar(100) not null,
	password varchar(30) not null
) engine=innodb;


select * from sign;

drop table sign;