import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetcher = (url: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      axios
        .get(url, {
          auth: {
            username: process.env.NEXT_PUBLIC_USERNAME,
            password: process.env.NEXT_PUBLIC_PASSWORD,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setError(null);
          setData(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setData(null);
          setError(error);
          toast.error(error.message, {
            duration: 750,
          });
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoading, data };
};

export default useFetcher;
