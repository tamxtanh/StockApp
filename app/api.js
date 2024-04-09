import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (object) => {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://real-time-finance-data.p.rapidapi.com/search",
    params: {
      ...object,
    },
    headers: {
      "X-RapidAPI-Key": "6f9e8a08b0mshdb42def68fe4ae7p12308ejsn185a565481ec",
      "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Directly returning fetchData instead of refetch
  return { data, refetch: fetchData };
};

export default useFetch;
