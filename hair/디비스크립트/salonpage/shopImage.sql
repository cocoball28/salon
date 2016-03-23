테이블 생성
create table shopImage (
	file_no int auto_increment primary key,
	file_name varchar(200),
	shop_no int not null
);


select member.name, dsn.no
  		  from member inner join dsn
     	    on member.no = dsn.no
 		 order by dsn.no;


drop table shopImage;
select * from shopImage;

select file_name as fileName, file_no as fileNo, shop_no as no 
  		  from shopImage