----------------------------------------------------------member
CREATE TABLE MEMBER (
	SANO   INTEGER      default 0,   
	MNO    INTEGER      primary key auto_increment, -- 회원고유번호
	EMAIL  VARCHAR(40)  NOT NULL, -- 이메일
	PWD    VARCHAR(50)  NOT NULL, -- 비밀번호
	NAME   VARCHAR(50)  NULL, -- 이름
	NICK   VARCHAR(55)  NOT NULL, -- 닉네임
	PHOTO_PATH  VARCHAR(100) NULL,     -- 사진
	GENDER VARCHAR(5)   NOT NULL default 'f', -- 성별
	STATUS VARCHAR(10)  not NULL default 'u'     -- 상태
);

select * from member;
drop table member;
update member set status='d' where status='u'
update member set status='m' where mno='1'
delete from member where mno = 4
----------------------------------------------------------member
--1번 미용실---
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("정채림", "jungcharim@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/정채림.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("김종용", "jongdragon@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/김종용.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("송창섭", "windowsup@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/송창섭.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이금철", "goldsteal@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/이금철.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("신지훈", "shingee@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/신지훈.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("유선경", "sk@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/유선경.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("신해룡", "seadragon@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/신해룡.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("신민영", "minzero@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/신민영.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이한샘", "hansam@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/이한샘.jpg","1");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이정석", "general@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/이정석.jpg","1");

--2번 미용실
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("김설화", "nowflower@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/김설화.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("혜수", "seasoo@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/혜수.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("심봉석", "bongsuck@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/심봉석.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("박범진", "bumreal@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/박범진.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이선화", "sunflower@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/이선화.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이승렬", "winhot@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/이승렬.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("배동호", "easttiger@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/배동호.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("장순상", "soonsang@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/장순상.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("윤우재", "woo@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/윤우재.jpg","2");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("홍선미", "sunme@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/홍선미.jpg","2");


-- 3번 미용실
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("장용근", "dragonroot@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/장용근.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이능금", "apple@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/이능금.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("나진철", "realsteal@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/나진철.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("김예슬", "art@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/김예슬.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("이주남", "zoo@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/이주남.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("정은", "jungsilver@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/정은.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("박상현", "uphyun@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/박상현.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("나현", "mehyun@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/나현.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("김현종", "currentjong@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/김현종.jpg","3");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("김재현", "replay@gmail.com", "1111", "m", "d", "../upload/dsnPortrait/김재현.jpg","3");



--4번 미용실 --
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("권형", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","4");
--------------------------------------------------------- 미용사
insert into member(nick, email, pwd, gender, status, photo_path, sano) 
values ("", "@gmail.com", "1111", "f", "d", "../upload/dsnPortrait/.jpg","3");


CREATE TABLE DESIGNER (
	MNO   INTEGER    NOT NULL, -- 미용사고유번호
	SANO  INTEGER    NOT NULL, -- 미용실고유번호
	GRADE VARCHAR(5) NOT NULL  -- 등급
);

-- 미용사
ALTER TABLE DESIGNER
	ADD CONSTRAINT PK_DESIGNER -- 미용사 기본키
		PRIMARY KEY (
			MNO -- 미용사고유번호
		);

-- 미용사 유니크 인덱스
CREATE UNIQUE INDEX UIX_DESIGNER
	ON DESIGNER ( -- 미용사
	);

-- 미용사 유니크 인덱스2
CREATE UNIQUE INDEX UIX_DESIGNER2
	ON DESIGNER ( -- 미용사
	);

-- 미용사 인덱스
CREATE INDEX IX_DESIGNER
	ON DESIGNER( -- 미용사
	);

ALTER TABLE DESIGNER
	MODIFY COLUMN MNO INTEGER NOT NULL AUTO_INCREMENT;	
	
--------------------------------------------------------- 미용사




select count(email)
  		  from member
  		 where email = 'a@a.net';
select * from member;
 