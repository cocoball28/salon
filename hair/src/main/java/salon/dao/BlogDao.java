package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Blog;
import salon.domain.BlogImage;
import salon.domain.Member;
import salon.domain.BlogComment;

@Repository
public interface BlogDao {
	//본문
	public int insert(Blog blog);
	public List<Blog> selectBlogList(Blog blog);
	public Blog selectBlogByNo(Blog blog);
	public void deleteBlog(Blog blog);
	public void deleteImageByBlogNo(Blog blog);
	public void deleteCommentByBlogNo(Blog blog);
	
	//이미지파일
	public void insertImage(BlogImage blogImage);
	public List<BlogImage> selectImage (Blog blog);
	
	//댓글 부분
	public void insertComment(BlogComment blogComment);
	public List<BlogComment> selectCommentList(BlogComment blogComment);
	public BlogComment selectComment(BlogComment blogComment);
	public void deleteComment(BlogComment blogComment);

	//블로그 주인 정보
	public Member selectDsnInfo (Blog blog);

	
}


