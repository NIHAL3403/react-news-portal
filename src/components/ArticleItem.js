import React from 'react';
import { Link } from 'react-router-dom';

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item card">
      <img src={article.urlToImage} className="card-img-top" alt={article.title} />
      <div className="card-body">
        <h2 className="card-title">{article.title}</h2>
        <p className="card-text">{article.description}</p>
        <Link to={`/article/${encodeURIComponent(article.url)}`} state={{ article }} className="btn btn-primary">Read more</Link>
      </div>
    </div>
  );
};

export default ArticleItem;
