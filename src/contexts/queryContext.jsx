import React, { useRef, useState } from "react"

export const QueryContext = React.createContext();


export function QueryProvider({ children }) {
    const [qResponse, setQResponse] = useState([]);
    const [tempQResponse, setTempQResponse] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [defaultDisplayLimit] = useState(7);
    const [percentile, setPercentile] = useState("");
    const [rank, setRank] = useState("");
    const [year, setYear] = useState();
    const [category, setCategory] = useState();
    const [round, setRound] = useState();
    const [gender, setGender] = useState("male");
    const [branch, setBranch] = useState("null");
    const [collegeName, setCollegeName] = useState("null");

    const value = {
        percentile,
        setPercentile,
        rank,
        setRank,
        year,
        setYear,
        category, 
        setCategory,
        round,
        setRound,
        gender,
        setGender,
        branch,
        setBranch,
        collegeName,
        setCollegeName,

        qResponse,
        setQResponse,
        tempQResponse,
		setTempQResponse,
		colleges,
		setColleges,
		branches,
		setBranches,
		categories,
		setCategories,
		yearData,
		setYearData,
		yearList,
		setYearList,
		selectedYear,
		setSelectedYear,
		selectedRound,
		setSelectedRound,
		defaultDisplayLimit,
    }

    return (
        <QueryContext.Provider value={value} > 
            {children}
        </QueryContext.Provider>
    )
}