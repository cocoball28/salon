create table qna_reply
qnaReply_no int Primary key not null,
qnaReply_content varchar(300),
qnaReply_date datetime default CURRENT_TIMESTAMP not null,
qna_no not null,
nick not null
);