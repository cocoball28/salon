----------------------------------------------------------member
CREATE TABLE MEMBER (
	MNO    INTEGER      NOT NULL, -- 회원고유번호
	EMAIL  VARCHAR(40)  NOT NULL, -- 이메일
	PWD    VARCHAR(50)  NOT NULL, -- 비밀번호
	NAME   VARCHAR(50)  NOT NULL, -- 이름
	NICK   VARCHAR(55)  NOT NULL, -- 닉네임
	PHOTO_PATH  VARCHAR(100) NULL,     -- 사진
	GENDER VARCHAR(5)   NOT NULL, -- 성별
	STATUS VARCHAR(10)  NULL      -- 상태
);

alter table member modify name varchar(50) null;
alter table member modify gender varchar(5) default 'f';
alter table member modify status varchar(10) default 'u';
--ALTER TABLE MEMBER MODIFY GENDER VARCHAR(5) NOT NULL;
ALTER TABLE MEMBER CHANGE PHOTO PHOTO_PATH VARCHAR(100) NULL;

ALTER TABLE MEMBER
	ADD CONSTRAINT PK_MEMBER -- 회원 기본키
		PRIMARY KEY (
			MNO -- 회원고유번호
		);

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_MEMBER
	ON MEMBER ( -- 회원
	);

-- 회원 유니크 인덱스2
CREATE UNIQUE INDEX UIX_MEMBER2
	ON MEMBER ( -- 회원
		EMAIL ASC -- 이메일
	);

ALTER TABLE MEMBER
	MODIFY COLUMN MNO INTEGER NOT NULL AUTO_INCREMENT;
----------------------------------------------------------member
---------------------------------------------------------미용실
CREATE TABLE SHOP (
	SANO    INTEGER      primary key, -- 미용실고유번호
	NAME    VARCHAR(50)  NOT NULL -- 이름
);

insert into shop (name) values ('choice hair');
insert into shop (name) values ('hong hair');
insert into shop (name) values ('kim hair');

-- 미용실
ALTER TABLE SHOP
	ADD CONSTRAINT PK_SHOP -- 미용실 기본키
		PRIMARY KEY (
			SANO -- 미용실고유번호
		);

-- 미용실 인덱스
CREATE INDEX IX_SHOP
	ON SHOP( -- 미용실
	);

-- 미용실 인덱스2
CREATE INDEX IX_SHOP2
	ON SHOP( -- 미용실
		NAME ASC -- 이름
	);

ALTER TABLE SHOP
	MODIFY COLUMN SANO INTEGER NOT NULL AUTO_INCREMENT;

---------------------------------------------------------미용실	

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
 