create table salon_blog(
	no int auto_increment primary key,
	tag varchar(300),
	content varchar(4000),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	recom_cnt int default 0
);

select t1.no, t1.tag, t1.content, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no
     order by t1.no
     
select t1.no, t1.tag, t1.content, t2.no as pno, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no     
     
select t1.no, t1.tag, t1.content, t2.no as pno, t2.file_no, t2.file_name 
      from salon_blog t1 left outer join salon_blog_image t2 on t1.no=t2.no
      

select * from salon_blog;

drop table salon_blog;

select *
      from permterest_hairdresser
     order by no desc limit 1;
