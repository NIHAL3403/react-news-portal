import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '7e51fc7c91f948fe877ee818a0c9db9b';

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            apiKey: API_KEY,
            q: id
          },
        });
        if (response.status === 200) {
          setArticle(response.data.articles[0]);
        } else {
          throw new Error(`Unexpected response code: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching article:", err.response ? err.response.data : err.message);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching article: {error}</p>;

  return (
    <div>
      {article && (
        <>
          <h1>{article.title}</h1>
          <img src={article.urlToImage} alt={article.title} />
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
