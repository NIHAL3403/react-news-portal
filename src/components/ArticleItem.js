import React from 'react';
import { Link } from 'react-router-dom';

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item">
      <img src={article.urlToImage} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <Link to={`/article/${encodeURIComponent(article.url)}`}>Read more</Link>
    </div>
  );
};

export default ArticleItem;
