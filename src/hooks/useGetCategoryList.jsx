import React, { useContext } from "react";
import { CATEGORY_LIST_URL, YEAR_LIST } from "../utils/constants";
import { QueryContext } from "../contexts/queryContext";
import useGetLatestYear from "./useGetLatestYear";

const getLatestYear = async() => {
  

  return maxYear;
}

const useGetCategoryList = async (setCategories, setCategory) => {

  const response = await fetch(`${CATEGORY_LIST_URL}/${2022}`);
  const data = await response.json();
  setCategories(data?.data);
  setCategory(data?.data[0]);
  console.log("Category List: ", data.data);
  return data?.data;
};

export default useGetCategoryList;
