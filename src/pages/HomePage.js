import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const API_KEY = '7e51fc7c91f948fe877ee818a0c9db9b';

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            apiKey: API_KEY,
            page: page,
            category: category,
            country: 'us' // Adding a default country parameter to reduce chances of bad request
          },
        });
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          throw new Error(`Unexpected response code: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching articles:", err.response ? err.response.data : err.message);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [page, category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching articles: {error}</p>;

  return (
    <div>
      <h1>News Portal</h1>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <ArticleList articles={articles} />
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default HomePage;
