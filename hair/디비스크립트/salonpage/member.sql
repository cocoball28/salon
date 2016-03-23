테이블 생성
create table member (
	no int primary key,
	id varchar(20) not null,
	pwd varchar(30) not null,
	name varchar(10) not null,
	nick varchar(10) not null,
	email varchar(1000) not null,
	tel int(100) not null,
	birth int(100) not null,
	gender varchar(10) not null
)

drop table member;
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (1, "pulby1989", 1234, "chanho", "pulby", "pulby1989@naver.com", 1234, 891130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (2, "yong1234", 1234, "yong", "root", "yong@naver.com", 1234, 871130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (3, "jin1234", 1234, "jin", "ho", "jin@naver.com", 1234, 861130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (4, "hoon1234", 1234, "hoon", "jihoon", "hoon@naver.com", 1234, 821130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (5, "ssf12", 1234, "hyukmin", "pulby", "pulby1989@naver.com", 1234, 891130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (6, "djfwo12", 1234, "hansam", "root", "yong@naver.com", 1234, 871130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (7, "sldifk1", 1234, "hyesoo", "ho", "jin@naver.com", 1234, 861130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (8, "lsidvjq1", 1234, "youngjae", "jihoon", "hoon@naver.com", 1234, 821130, "male");
insert into member (no, id, pwd, name, nick, email, tel, birth, gender)
			values (9, "slfkvj1", 1234, "jungsuk", "jihoon", "hoon@naver.com", 1234, 821130, "male");
select member.name, dsn.no
  from member inner join dsn
    on member.no = dsn.no
 order by dsn.no;
 where 