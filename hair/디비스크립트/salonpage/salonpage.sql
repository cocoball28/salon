테이블 생성
create table salonpage (
	no int(9) primary key,
	name varchar(15) not null,
	phoname varchar(30) not null
) engine=innodb;

모든 테이블 조회
show tables;

1개 테이블 조회
explain salon;

테이블 삭제
drop table salonpage;

현재 상태 보기
status

인서트
insert into salonpage (no, name, phoname) values('1', 'chanho', 'pho1');
셀렉트
select * from salonpage;