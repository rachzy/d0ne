import { useEffect, useState } from "react";

import Axios from "axios";

import { serverDomain } from "../config.json";

export default function useFetch(urn: string) {
  const [data, setData] = useState(null);
  const [status, setStauts] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const { data, status } = await Axios.get(`${serverDomain}/${urn}`);
        setData(data);
        setStauts(status);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    }
    fetchData();
  }, [urn]);

  return { data, status, loading, error };
}
