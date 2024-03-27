import React, { useContext } from "react";
import { CATEGORY_LIST_URL, YEAR_LIST } from "../utils/constants";
import { QueryContext } from "../contexts/queryContext";
import useGetLatestYear from "./useGetLatestYear";

const getLatestYear = async () => {
	const response = await fetch(YEAR_LIST);
	let yearData = await response.json();
	yearData = yearData.data;
	console.log(yearData);

	const years = Object.keys(yearData);

	let maxYear = 0;
	for (let year of years) {
		if (year > maxYear) {
			maxYear = year;
		}
	}

	return maxYear;
};

const useGetCategoryList = async (
	categories,
	setCategories,
	category,
	setCategory,
	selectedYear
) => {
	const latestYear = await getLatestYear();
	console.log("Latest year: ", latestYear);

	const response = await fetch(
		`${CATEGORY_LIST_URL}/${selectedYear || latestYear}`
	);

	const data = await response.json();

	if (JSON.stringify(categories) != JSON.stringify(data?.data)) {
		setCategories(data?.data);
		setCategory(data?.data[0]);

		console.log("Category fetched: ", selectedYear);
		console.log("CatList: ", data.data);
	}
};

export default useGetCategoryList;
