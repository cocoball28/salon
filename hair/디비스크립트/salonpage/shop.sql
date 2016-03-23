테이블 생성
create table shop (
	no int primary key,
	name varchar(20) not null,
	tel int not null,
	post int not null,
	addr varchar(150) not null
)

insert into shop (no, name, tel, post, addr)
	 	  values (1, "juno", 027123721, 182318, "서울특별시 서초구 강남대로 369");
insert into shop (no, name, tel, post, addr)
	 	  values (2, "choice", 0317125723, 231318, "서울특별시 강남구 강남대로 372");
insert into shop (no, name, tel, post, addr)
	 	  values (3, "hq", 027152314, 125848, "서울특별시 서초구 서초대로74길 11");
drop table shop;
select * from shop;