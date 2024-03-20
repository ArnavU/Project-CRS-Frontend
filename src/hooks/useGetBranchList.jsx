import React from "react";
import { BRANCH_LIST_URL } from "../utils/constants";

const useGetBranchList = async (setBranches) => {
	const response = await fetch(BRANCH_LIST_URL);
	const data = await response.json();
	setBranches(data.data);
	// console.log(data.data);
};

export default useGetBranchList;
