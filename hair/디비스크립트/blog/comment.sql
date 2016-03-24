-- 블로그 댓글 테이블 ------------------------------
create table BLOG_COMMENT(
	CNO 		integer auto_increment primary key,
	BNO 		integer 	 not null,
	MNO 		integer  	 not null,
	CONTENT 	varchar(300) not null,
	REG_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- 블로그 댓글 테이블 ------------------------------
-- 아래는 신경 ㄴㄴ 요 ------------------------------


select * from blog_comment

select *
  from BLOG_COMMENT join member
    on blog_comment.mno = member.mno 
 order by blog_comment.cno;




drop table BLOG_COMMENT;

테스트용
insert into salon_blog_comment(no, content) 
values ('1', '댓글 테스트용');