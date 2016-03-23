테이블 생성
create table dsn (
	no int primary key,
	shop_no int not null,
	grade varchar(100) not null,
	pic varchar(200) not null
)

insert into dsn (no, shop_no, grade, pic)
		 values (1, 1, "s", "sss.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (2, 1, "n", "n.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (3, 1, "n", "f.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (4, 1, "n", "a.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (5, 1, "n", "sss.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (6, 1, "n", "n.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (7, 1, "n", "f.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (8, 1, "n", "a.jpg");
insert into dsn (no, shop_no, grade, pic)
		 values (9, 1, "n", "a.jpg");
drop table dsn;

