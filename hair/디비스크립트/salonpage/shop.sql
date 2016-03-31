테이블 생성-----------------------------------
create table shop (
	sano int primary key auto_increment,
	name varchar(20) not null,
	tel varchar(20) not null,
	zip int not null,
	addr varchar(150) not null
);

임의 데이터 투입--------------------------------
insert into shop (sano, name, tel, zip, addr)
	 	  values (1, "juno hair", "027123721", 182318, "서울특별시 서초구 강남대로 369");
insert into shop (sano, name, tel, zip, addr)
	 	  values (2, "choice hair", "0317125723", 231318, "서울특별시 강남구 강남대로 372");
insert into shop (sano, name, tel, zip, addr)
	 	  values (3, "hq", "027152314", 125848, "서울특별시 서초구 서초대로74길 11");
insert into shop (sano, name, tel, zip, addr)
	 	  values (4, "niceguy", "027152314", 125848, "서울특별시 강남구 역삼동 833-4");

drop table shop;

select * from shop;