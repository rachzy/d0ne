import { useEffect, useState } from "react";

import Axios from "axios";

import { serverDomain } from "../config.json";

export default function useFetch<T = unknown>(urn: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const { data } = await Axios.get(`${serverDomain}/${urn}`);
        setData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [urn]);

  return { data, loading, error };
}
