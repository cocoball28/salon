create table salon_blog_image (
	file_no int auto_increment primary key,
	save_full_file_name varchar(200), 
	no int,
	file_name varchar(200)
);

drop table salon_blog_image;

select * from salon_blog_image;

public class BlogImage {
	private String saveFullFileName;
	private String fileName;
	private String fileNo;
	private String no;