-- 블로그 사진 테이블 ----------------
create table BLOG_PHO (
	BPNO int auto_increment primary key,
	PATH varchar(200) not null, 
	BNO int not null
);
-- 블로그 사진 테이블 ------------------
-- 아래는 신경 안써도 됩니다. 위에꺼만 만드세욥 ---


-- 글사진
CREATE TABLE BLOG_PHO (
	BPNO INTEGER      NOT NULL, -- 글사진고유번호
	BNO  INTEGER      NOT NULL, -- 글고유번호
	PATH VARCHAR(150) NOT NULL  -- 경로
);

-- 글사진
ALTER TABLE BLOG_PHO
	ADD CONSTRAINT PK_BLOG_PHO -- 글사진 기본키
		PRIMARY KEY (
			BPNO -- 글사진고유번호
		);

ALTER TABLE BLOG_PHO
	MODIFY COLUMN BPNO INTEGER NOT NULL AUTO_INCREMENT;


create table salon_blog_image (
	file_no int auto_increment primary key,
	file_name varchar(200), 
	no int
);

select t1.bno, t1.tag, t1.content, t2.bno as bno, t2.bpno, t2.path 
      from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno




drop table salon_blog_image;

select * from salon_blog_image;
	private String fileName;
	private String fileNo;
	private int no;