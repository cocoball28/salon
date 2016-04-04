create table qna_reply(
qnaReply_no int Auto_Increment primary key not null,
qnaReply_content varchar(300),
qnaReply_date datetime default CURRENT_TIMESTAMP not null,
qna_no int not null,
qnaReply_nick varchar(100) not null
);