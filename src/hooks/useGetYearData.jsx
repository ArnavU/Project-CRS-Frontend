// import React from "react";
// import { YEAR_LIST } from "../utils/constants";

// const useGetYearList = async (
// 	setYearDataList,
// 	setYearList,
// 	setSelectedYear,
// 	setSelectedRound
// ) => {
// 	const response = await fetch(YEAR_LIST);
// 	const data = await response.json();
// 	console.log(data.data);

// 	const yearsData = data.data;
// 	let yearList = Object.keys(yearsData);
// 	yearList.sort(cmp);

// 	function cmp(a, b) {
// 		return b - a > 0;
// 	}

// 	setYearDataList(yearsData);
// 	setYearList(yearList);
// 	console.log("YearList: ", yearList);

// 	setSelectedYear(yearList[0]);
// 	setSelectedRound(yearsData[yearList[0]]);
// };

// export default useGetYearList;

import React from "react";
import { YEAR_LIST } from "../utils/constants";

const useGetYearList = async (
  setYearDataList,
  setYearList,
  setSelectedYear,
  setSelectedRoundNos,
  setSelectedRound,
) => {
  const response = await fetch(YEAR_LIST);

  const data = await response.json();
  console.log("data data" + data.data);

  const yearsData = data.data;

  // Get all years as an array
  let yearList = Object.keys(yearsData);

  // Sort the yearList in descending order
  yearList.sort((a, b) => b - a); // Simplified sorting function

  setYearDataList(yearsData);
  setYearList(yearList);
  console.log("YearList: ", yearList);
  console.log("Selected Year: ", yearList[0])
  console.log("Selected Round: ", yearsData[yearList[0]])

  setSelectedYear(yearList[0]); // Select the first year (which will be the latest now)
  setSelectedRoundNos(yearsData[yearList[0]]);
  setSelectedRound(1);
};

export default useGetYearList;
