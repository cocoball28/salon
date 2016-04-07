---------------------------favorite
CREATE TABLE FAVORITE(
	BFNO INT PRIMARY KEY AUTO_INCREMENT,
	MNO INT NOT NULL,
	BNO INT NULL,
	SANO INT NULL,
	MDNO INT NULL
);

select t1.bno, t1.mno, t1.tag, t1.content, t2.bpno, t2.path 
      from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
     order by t1.bno

select * from favorite;

select fav
  from favorite
  where bno = 1
  and   mno = 1;

DROP TABLE FAVORITE;

insert into favorite (mno, 
	<choose>
		<when test="FROM == 'blog'">bno</when>
		<when test="FROM == 'shop'">sano</when>
		<when test="FROM == 'designer'">mdno</when>
	</choose>
) values (#{mno},
	<choose>
		<when test="FROM == 'blog'">#{bno}</when>
		<when test="FROM == 'shop'">#{sano}</when>
		<when test="FROM == 'designer'">#{mdno}</when>
	</choose>
)

      bno,
      title,
      views,
      cre_dt 
    from board
    order by 
    <choose>
      <when test="keyword == 'title'">title </when>
      <when test="keyword == 'views'">views </when>
      <otherwise>bno </otherwise>
    </choose>


-- get fav list

select t1.bno, t1.mno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
 from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
where t1.bno in (select bno
			   from favorite
			  where mno = 1)
order by t1.bno 
limit 0, 20;

-- get search result
select t1.bno, t1.mno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
select t1.bno, t1.mno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
 from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
where t1.tag like  CONCAT('%', '1', '%') and CONCAT('%', '2', '%')

CREATE FULLTEXT INDEX idx_1 ON my_seach(text_data);
select tag
  from blog
 where MATCH(tag) AGAINST('+"1"' IN BOOLEAN MODE)
 
select tag
  from blog
 where tag in (select tag from blog where tag like CONCAT('%', '1', '%'),
               select tag from blog where tag like CONCAT('%', '1', '%') )

 select tag
  from blog
 where tag like CONCAT('%', '1' , '%') 
   and tag like CONCAT('%', 'pretty' , '%') 

 select tag
  from blog
 where tag REGEXP
<foreach collection="resultArray" item="result" index="index" separator="and tag REGEXP" >
	${result[index]}
</foreach>

<foreach collection="resultArray" item="result" index="index" separator="and tag like" open="CONCAT('%',", close=",'%'">
	${item[index]}
</foreach>

select t1.bno, t1.mno, t1.tag, t1.content, t2.bpno, t2.path, 
			(select count(*) from favorite f where f.mno = 1 and t1.bno=f.bno) fav
      from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
     order by t1.bno desc
     limit 1, 30;

     select t1.bno, t1.mno, t1.tag, t1.content, t2.bno, t2.bpno, t2.path 
	      from blog t1 left outer join BLOG_PHO t2 on t1.bno=t2.bno
		 where t1.bno in (select bno
					     from favorite
					    where mno = 1)
	     order by t1.bno 


order by t1.bno 
limit 0, 20;
