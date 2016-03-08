create table permterest_hairdresser_comment(
	comment_no int auto_increment primary key,
	no int,
	nick_name varchar(30),
	content varchar(300),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

create sequence permterest_hairdresser_comment;

select * from permterest_hairdresser_comment;

drop table permterest_hairdresser_comment;