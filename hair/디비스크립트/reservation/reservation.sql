-- 예약
CREATE TABLE RSV (
	RNO      INTEGER            auto_increment primary key, -- 예약고유번호
	SANO     INTEGER            NOT NULL, -- 미용실고유번호
	DNAME    VARCHAR(70)        NOT NULL, -- 미용사이름
	CNAME    VARCHAR(70)        NOT NULL, -- 고객이름
	STYLE 	 VARCHAR(70)        null,
	RSV_DATE VARCHAR(70)        NOT NULL, -- 날짜
	STIME    VARCHAR(70)	 	NOT NULL, -- 시작시간
	ETIME    VARCHAR(70)	 	NOT NULL  -- 종료시간
);

drop table RSV

select * FROM RSV 

	
ALTER TABLE RSV ADD COLUMN HAIR_STYLE VARCHAR(100); 
		
