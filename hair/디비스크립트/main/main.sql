create table test_test(
	no int(10) primary key auto_increment,
	image_no int(10) not null,
	title varchar(50) not null,
	content varchar(200) not null,
	favorite int(3) default 0
);

drop table test_test;


insert into test_test(image_no, title, content, favorite) values (17, 'title', 'content', 0);

update test_test 
  set favorite = 1
 where no = 3

select * from test_test;