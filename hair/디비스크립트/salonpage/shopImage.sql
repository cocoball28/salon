테이블 생성
create table shopImage (
	spno int auto_increment primary key,
	sano int,
	path varchar(300)
);


drop table shopImage;
select * from shopImage;

select file_name as fileName, file_no as fileNo, shop_no as no 
  		  from shopImage
  		  
  		  
  		    		