import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    axios
      .get(url, {
        auth: {
          username: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setData(null);
      setError(null);
      setLoading(false);
    };
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios
      .get(url, {
        auth: {
          username: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default useFetch;
