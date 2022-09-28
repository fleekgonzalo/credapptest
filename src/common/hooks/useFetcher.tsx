import axios, { AxiosError } from "axios";
import { compareAsc } from "date-fns";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AppContext } from "../context/app.context";

function useFetch(url: string, tokenRequire = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(null);
  const { auth } = useContext(AppContext);

  const fetch = (signal) => {
    if (tokenRequire) {
      if (!auth) return;
    }
    const authHeader = tokenRequire
      ? { headers: { Authorization: "Bearer " + auth.accessToken } }
      : {
          auth: {
            username: process.env.NEXT_PUBLIC_USERNAME,
            password: process.env.NEXT_PUBLIC_PASSWORD,
          },
        };

    setLoading(true);
    axios
      .get(url, {
        ...authHeader,
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
    const controller = new AbortController();
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
    } else {
      fetch(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [url, auth]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;
