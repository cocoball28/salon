create table salon_blog_comment(
	comment_no int auto_increment primary key,
	no int,
	nick_name varchar(30),
	content varchar(300),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

select * 
  from salon_blog_comment
 where no = '1' 
  order by comment_no;

drop table salon_blog_comment;

테스트용
insert into salon_blog_comment(no, content) 
values ('1', '댓글 테스트용');