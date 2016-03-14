create table test_test(
	no int(10) primary key,
	image_no int(10) not null,
	title varchar(50) not null,
	content varchar(200) not null,
	favorite int(3) default 0
);

drop table test_test;


insert into test_test(no, image_no, title, content, favorite) values (12, 4, '1111', 'dfdf', 0);

select * from test_test;