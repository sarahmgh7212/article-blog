import React,{useState,useEffect} from 'react';
import articleContent from './article-content'; 
import ArticleList from '../components/ArticleList';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';


const ArticlePage=({match})=>{


  const name=match.params.name;
  const article=articleContent.find(article => article.name ===name);

  //using react hook with useState:
  const [articleInfo, setArticleInfo]=useState({
    upvotes:0,
    comments:[],
  });

  // useEffect(()=>{
  //   // setArticleInfo({upvotes:3});
  //   setArticleInfo({upvotes: Math.ceil(Math.random()* 10)});
  // },[name]);
  useEffect(()=>{
   const fetchData=async () =>{
     //Add proxy in package.json : "proxy":"http://localhost:8000/"
    const result= await fetch(`/api/articles/${name}`);
    const body=await result.json();
    setArticleInfo(body);
   }
   fetchData();
     
    },[name]);


   if (!article)
  //  return <h1>Article does not exist!</h1>
  return <NotFoundPage />

   const otherArtciles= articleContent.filter(article => article.name !==name);

  return(
    <>
    <h1>{article.title}</h1>
  {/* <p>This post has been upvoted {articleInfo.upvotes} times</p> */}
<UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>

  {article.content.map((paragraph,key) =>(
    <p key={key}> {paragraph}</p>
  ))}
  <CommentsList comments={articleInfo.comments} />
  <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
  <h3>More Articles:</h3>
  <ArticleList articles={otherArtciles}/>
    </>
  );
  
}
    export default ArticlePage;