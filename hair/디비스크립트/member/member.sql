

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

select * from test_member
where id = 'a@a.net' and pw = '1111';
