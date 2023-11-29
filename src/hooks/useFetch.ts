import { useContext, useEffect, useState } from "react";

import Axios from "axios";
import { IServerContext, ServerContext } from "../contexts/ServerContext";


export default function useFetch<T = unknown>(urn: string) {
  const { serverDomain } = useContext(ServerContext) as IServerContext;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get(`${serverDomain}/${urn}`, {
          withCredentials: true,
        });
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
