-- 메시지 쿼리 --------------------------------------
create table message(
	message_no int auto_increment primary key,
	sender_mno varchar(30),
	receiver_mno varchar(30),
	content varchar(4000),
	reg_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- 메시지 쿼리 ---------------------------------------

drop table message;

-- 마지막 주고받은 메시지 테이블 ---------------------------------------
create table message_rct(
	
)
-- 마지막 주고받은 메시지 테이블 ---------------------------------------


insert into message(sender_mno,receiver_mno,content,reg_date)
 value ()


select message_no, sender_mno, content, receiver_mno, reg_date as regDate, nick as recieverNick, photo_path as recieverPhotoPath
  from message join member 
    on message.sender_mno = member.mno

    	select sender_mno as smno, receiver_mno as rmno, content, message_no as messageNo, nick as senderNick
      from message join member
        on message.sender_mno = member.mno
     where (sender_mno = 1 and receiver_mno = 2) or (sender_mno = 2 and receiver_mno = 1)
     order by message_no desc
     limit 5, 5;


select * from message;

delete 

delete FROM salon_message
		
delete FROM salon_message
		where receiver = 'yongeun'

drop table message;
