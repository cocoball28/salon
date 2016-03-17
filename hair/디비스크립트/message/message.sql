create table salon_message(
	no int auto_increment primary key,
	sender varchar(30),
	receiver varchar(30),
	content varchar(4000),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


select * from salon_message;

delete 

delete FROM salon_message
		
delete FROM salon_message
		where receiver = 'yongeun'

drop table salon_message;
