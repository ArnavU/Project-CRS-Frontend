import React from "react";
import { YEAR_LIST } from "../utils/constants";

const useGetYearList = async (
	setYearDataList,
	setYearList,
	setSelectedYear,
	setSelectedRound
) => {
	const response = await fetch(YEAR_LIST);
	const data = await response.json();
	console.log(data.data);

	const yearsData = data.data;
	let yearList = Object.keys(yearsData);
	yearList.sort(cmp);

	function cmp(a, b) {
		return b - a > 0;
	}

	setYearDataList(yearsData);
	setYearList(yearList);
	console.log("YearList: ", yearList);

	setSelectedYear(yearList[0]);
	setSelectedRound(yearsData[yearList[0]]);
};

export default useGetYearList;
