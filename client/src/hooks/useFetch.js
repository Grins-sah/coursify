import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url, interval,token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(url,{
        token:token
      });
      setData(result.data);
    } catch (err) {
      setError(err.errmsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    if (interval !== null) {
      const fetchInterval = setInterval(() => {
        fetchData();
      }, interval);

      return () => clearInterval(fetchInterval); // Clear interval on cleanup
    }
  }, []);

  return { data, loading, error };
};
