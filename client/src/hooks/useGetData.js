import { useEffect, useState } from "react";

import axiosInstance from "../axiosInstance";

function useGetData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      const fetchedData = await response.data;
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);

      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, loading, fetchData, error };
}

export default useGetData;
