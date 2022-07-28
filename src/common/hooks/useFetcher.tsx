import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(null);

  const fetch = (signal) => {
    setLoading(true);
    axios
      .get(url, {
        auth: {
          username: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        },
        signal,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.code !== "ERR_CANCELED") {
          setError(err);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (!url) {
      setLoading(false);
    }
    const controller = new AbortController();

    fetch(controller.signal);
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;
