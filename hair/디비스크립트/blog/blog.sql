create table salon_blog(
	no int auto_increment primary key,
	tag varchar(300),
	image varchar(300),
	content varchar(4000),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	recom_cnt int default 0
);

select * from salon_blog;

drop table salon_blog;

select *
      from permterest_hairdresser
     order by no desc limit 1;
