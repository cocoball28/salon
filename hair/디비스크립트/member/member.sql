

create table test_member(
	nick varchar(10) not null,
	email varchar(10) primary key,
	pwd varchar(20) not null
);

drop table test_member;

insert into test_member(email, pwd, nick) values ('a@a.net', '1111', 'nickName');
insert into test_member(email, pwd, nick) values ('b@b.net', '1111', 'yonggeun');
insert into test_member(email, pwd, nick) values ('c@c.net', '1111', 'chanho');

select * from test_member;

create table test_member_image(
	nick varchar(10) not null,
	file_name varchar(100) primary key
);

drop table test_member_image;

select * from test_member_image;

insert into test_member_image (nick, file_name) values ( #{nick}, #{fileName})
