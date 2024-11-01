import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

function usePaginatedData(endpoint) {
  const [loading, setLoading] = useState(false);
  const [refetchData, setRefetchData] = useState();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(endpoint);
  const [prev, setPrev] = useState();

  const fetchData = async (currentPage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        params: { page: currentPage, ...query },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          Object.keys(params).forEach((key) => {
            const value = params[key];

            if (value !== null && value !== undefined) {
              if (Array.isArray(value)) {
                searchParams.append(key, value.join(","));
              } else {
                searchParams.append(key, value);
              }
            }
          });
          return searchParams.toString();
        },
      });

      const fetchedData = await response.data.results;
      setData(fetchedData);
      setNext(response.data.next);
      setPrev(response.data.prev);
    } catch (err) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [query, refetchData]);

  const handleNext = () => {
    if (next) {
      const nextPage = page + 1;
      fetchData(nextPage);
      setPage(nextPage);
    }
  };
  const handlePrev = () => {
    if (prev) {
      const prePage = page - 1;
      fetchData(prePage);
      setPage(prePage);
    }
  };
  return {
    loading,
    next,
    prev,
    query,
    setQuery,
    setRefetchData,
    data,
    handleNext,
    handlePrev,
  };
}

export default usePaginatedData;
