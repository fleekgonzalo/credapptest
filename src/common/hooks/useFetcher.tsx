import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(null);

  const fetch = () => {
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

  useEffect(() => {
    if (!url) {
      setLoading(false);
    }

    fetch();
  }, [url]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;
