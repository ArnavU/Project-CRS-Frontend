import React, { useRef, useState } from "react";

export const QueryContext = React.createContext();

export function QueryProvider({ children }) {
  const [qResponse, setQResponse] = useState([]);
  const [tempQResponse, setTempQResponse] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedRoundNos, setSelectedRoundNos] = useState("");
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [defaultDisplayLimit, setDefaultDisplayLimit] = useState(7);
  const [percentile, setPercentile] = useState("");
  const [rank, setRank] = useState("");
  const [year, setYear] = useState();
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("male");
  const [branch, setBranch] = useState("null");
  const [collegeName, setCollegeName] = useState("null");
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('null');

  const value = {
    percentile,
    setPercentile,
    rank,
    setRank,
    year,
    setYear,
    category,
    setCategory,
    selectedRound,
    setSelectedRound,
    gender,
    setGender,
    branch,
    setBranch,
    collegeName,
    setCollegeName,
    universities,
    setUniversities,
    selectedUniversity,
    setSelectedUniversity,

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
    selectedRoundNos, // no. of rounds in the year
    setSelectedRoundNos,
    defaultDisplayLimit,
    setDefaultDisplayLimit,
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}
