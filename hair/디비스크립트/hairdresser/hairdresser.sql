create table permterest_hairdresser(
	no int auto_increment primary key,
	tag varchar(300),
	image varchar(4000),
	content varchar(4000),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	recom_cnt int default 0
);

select * from permterest_hairdresser;
drop table permterest_hairdresser;

create sequence seq_permterest_hairdresser_no;

select *
      from permterest_hairdresser
     order by no desc limit 1;


insert into root_board (no, writer, title, content)
values (seq_root_board_no.nextVal, 'tester', 'test title', 'test content')
	  select *
        from (select rownum as rnum, no, writer, title, regDate, viewCnt, commentCnt
				from (select no, writer, title, to_char(reg_date, 'yyyy-MM-dd hh:mi') as regDate, view_cnt as viewCnt,
			   				 (select count(*)
						        from root_board_comment
					           where no = a.no) as commentCnt 
 			   			from root_board a
	 			       order by no desc))
 		where rnum between 1 and 5