create table permterest_hairdresser_file (
	file_no int auto_increment primary key,
	no int,
	file_name varchar(200),
	file_path varchar(200)
);

drop table permterest_hairdresser_file;

create sequence seq_root_board_file_no;

select * from permterest_hairdresser_file; 