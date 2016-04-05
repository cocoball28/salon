-- 블로그 테이블 생성 -----------------------------------
create table BLOG(
	bno 	 int auto_increment primary key,
	mno 	 integer not null, 
	tag 	 varchar(300) not null,
	content  varchar(4000) null,
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- 쿼리 메모장 --------------------------------------
-- 여기는 신경쓰지 마세욥 -------------------------------
select t1.no, t1.tag, t1.content, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no
     order by t1.no
     
select t1.no, t1.tag, t1.content, t2.no as pno, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no     
     
select t1.no, t1.tag, t1.content, t2.no as pno, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no

select t1.bno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
  from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
 where t1.mno = 1 and t1.bno < 100
 order by t1.bno desc limit 5;
      
      
select * from blog;

drop table blog;

select *
      from permterest_hairdresser
     order by no desc limit 1;
     
select * 
		  from member
		 WHERE nick LIKE 'root'
     
     
-- 쿼리 메모장 --------------------------------------

     
     	select t1.bno, t1.mno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
      from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
     order by t1.bno