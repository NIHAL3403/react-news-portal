import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
