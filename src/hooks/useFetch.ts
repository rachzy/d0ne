import { useEffect, useState } from "react";

import Axios from "axios";

import { serverDomain } from "../config.json";

export default function useFetch<T = unknown>(urn: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get(`${serverDomain}/${urn}`, {withCredentials: true});
        setData(data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    }
    fetchData();
  }, [urn]);

  return { data, loading, error };
}
