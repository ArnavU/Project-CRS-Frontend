import React from "react";
import { COLLEGE_LIST_URL } from "../utils/constants";

const useGetCollegeList = async (setColleges) => {
  const response = await fetch(COLLEGE_LIST_URL);
  const data = await response.json();
  setColleges(data.data);
//   console.log(data.data);
};

export default useGetCollegeList;
