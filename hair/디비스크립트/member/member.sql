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


--------------------------------------------------------- 미용사
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
 