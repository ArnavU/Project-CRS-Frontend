import React from "react";

const useGetQueryData = async (
  queryString,
  setQResponse,
  setTempQResponse,
  limit,
  setIsLoading
) => {
  // console.log("Query String: ", queryString);
  // setIsLoading(true);
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/form/cet/${queryString}`
  );
  const data = await response.json();

  setQResponse(data?.data);
  console.log("Query Response: ", data.data);
  setTempQResponse(
    data?.data.filter((ele, index) => {
      return index < limit.current.value;
      return index < 7;
    })
  );
  setIsLoading(false);
};

export default useGetQueryData;
