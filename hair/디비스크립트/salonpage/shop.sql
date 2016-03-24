테이블 생성
create table shop (
	sano int primary key auto_increment,
	name varchar(20) not null,
	tel int not null,
	zip int not null,
	addr varchar(150) not null
);

insert into shop (name, tel, zip, addr)
	 	  values ("juno hair", 027123721, 182318, "서울특별시 서초구 강남대로 369");
insert into shop (name, tel, zip, addr)
	 	  values ("choice hair", 0317125723, 231318, "서울특별시 강남구 강남대로 372");
insert into shop (name, tel, zip, addr)
	 	  values ("hq", 027152314, 125848, "서울특별시 서초구 서초대로74길 11");
drop table shop;
select sano, name from shop;