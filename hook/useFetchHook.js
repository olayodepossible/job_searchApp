import React, { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY, RAPID_API_KEY2 } from "@env";

const rapidApiKey = RAPID_API_KEY2;

const useFetchHook = (endpoint, queryParam) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...queryParam },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const resp = await axios.request(options);
      setData(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetchData = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, reFetchData };
};

export default useFetchHook;
