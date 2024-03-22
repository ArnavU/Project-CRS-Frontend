import React from "react";
import { CATEGORY_LIST_URL } from "../utils/constants";

const useGetCategoryList = async (setCategories, setCategory) => {
  const response = await fetch(CATEGORY_LIST_URL);
  const data = await response.json();
  setCategories(data?.data);
  setCategory(data?.data[0]);
  console.log("Category List: ", data.data);
};

export default useGetCategoryList;
