create table qna_board(
qna_no int Auto_Increment primary key not null ,
qna_title varchar(100) not null,
qna_content varchar(300) not null,
nick varchar(100) not null,
reg_date datetime default CURRENT_TIMESTAMP not null ,
viewnum int
);