import { useEffect, useState } from "react";

import { RequestOptions } from "../types/api";

export const useApiData = <T>(url: string, method?: string) => {
  const options = RequestOptions(method);

  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status : ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        console.warn(err instanceof Error ? err.message : "Unknown Error");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data };
};
