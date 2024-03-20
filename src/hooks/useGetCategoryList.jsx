import React from "react";
import { CATEGORY_LIST_URL } from "../utils/constants";

const useGetCategoryList = async (setCategories) => {
  const response = await fetch(CATEGORY_LIST_URL);
  const data = await response.json();
  setCategories(data.data);
//   console.log(data.data);
};

export default useGetCategoryList;
