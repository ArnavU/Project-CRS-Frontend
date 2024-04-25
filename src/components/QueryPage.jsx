import React, { useContext, useEffect, useRef, useState } from "react";
import MainPage from "./MainPage";
import "../Styles/MainPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { QueryContext } from "../contexts/queryContext";
import useGetQueryData from "../hooks/useGetQueryData";
import useGetBranchList from "../hooks/useGetBranchList";
import useGetCollegeList from "../hooks/useGetCollegeList";
import useGetCategoryList from "../hooks/useGetCategoryList";
import useGetYearList from "../hooks/useGetYearData";
import QueryPageShimmer from "./QueryPageShimmer";
import useGetUniversities from "../hooks/useGetUniversities";

const QueryPage = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorUserInput, setErrorUserInput] = useState(null);

  //Data fetched from API
  const {
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
    setSelectedUniversity,
    selectedUniversity,

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
    selectedRoundNos,
    setSelectedRoundNos,
    defaultDisplayLimit,
    setDefaultDisplayLimit,
  } = useContext(QueryContext);
  const limit = useRef(7);

  const limitDecimalPlaces = (value, decimalPlaces) => {
    value = value.replace(/[^0-9.]/g, "");
    const decimalIndex = value.indexOf(".");

    if (decimalIndex !== -1) {
      const decimalPart = value.substring(decimalIndex + 1);
      value =
        value.substring(0, decimalIndex + 1) +
        decimalPart.slice(0, decimalPlaces);
    }

    // value does not exceed 100
    if (parseFloat(value) > 100) {
      value = value[0] + value[1];
    }

    setPercentile(value);
  };

  const limitDigits = (value) => {
    // Regex to remove non-digit characters
    value = value.replace(/\D/g, "");
    // Limit to 5 digits
    setRank(value.slice(0, 5));
  };

  const selectRoundsByYear = (year) => {
    const round = yearData[year];
    setSelectedRoundNos(round);
  };

  const setCategoryListByYear = (year) => {
    // useGetCategoryList(setCategories, setCategory);
  };

  // ######################## Submit Handler ########################
  const submitHandler = (e) => {
    setErrorMessage(null);
    e.preventDefault();

    if (!percentile) {
      setErrorMessage("Enter percentile/rank");
      return;
    }
    setIsLoading(true);

    // queryString => gender/category/percentile/rank/college/branch/year/round
    let queryString = `${gender}/${category.toLowerCase()}/${
      percentile ? percentile : "null"
    }/${rank ? rank : "null"}/${
      collegeName || "null"
    }/${branch}/${selectedYear}/${selectedRound}/${selectedUniversity}`;
    console.log("querystring in QueryPage is  " + queryString);

    useGetQueryData(
      queryString,
      setQResponse,
      setTempQResponse,
      limit,
      setIsLoading,
      setErrorUserInput
    );
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
    if (!selectedRoundNos) {
      useGetBranchList(setBranches);
      useGetCollegeList(setColleges);
      useGetCategoryList(categories, setCategories, category, setCategory);

      useGetYearList(
        setYearData,
        setYearList,
        setSelectedYear,
        setSelectedRoundNos,
        setSelectedRound
      );
    }
    console.log("UseGeteCategoryList running");
    useGetUniversities(setUniversities);
    useGetCategoryList(
      categories,
      setCategories,
      category,
      setCategory,
      selectedYear
    );
  }, [selectedYear]);

  return (
    <div className="queryform-div">
      {/* ############## Conditional navigation to mainpage ############## */}
      {qResponse?.length > 0 && navigate("/mainpage")}

      <div className="relative form-container lg:w-[45vw] md:w-[70vw]">
        {isLoading && <QueryPageShimmer />}
        <form onSubmit={submitHandler}>
          <h1 className="heading font-bold text-lg">Enter Your Details</h1>
          {errorMessage && (
            <p
              id="flash-message"
              className="text-red-600 font-bold text-center"
            >
              {errorMessage}
            </p>
          )}

          {errorUserInput && (
            <div className="mb-[20px] mx-2">
              <p className="text-center font-bold text-red-600">
                Cannot get the result for the following request:{" "}
              </p>
              <p className="text-center">
                {errorUserInput.gender != "null" && (
                  <span className="font-bold whitespace-nowrap">
                    Gender:{" "}
                    <span className="text-red-600">
                      {errorUserInput.gender}
                    </span>
                    ,
                  </span>
                )}{" "}
                {errorUserInput.category && (
                  <span className="font-bold whitespace-nowrap">
                    Category:{" "}
                    <span className="text-red-600">
                      {errorUserInput.category}
                    </span>
                    ,
                  </span>
                )}{" "}
                {errorUserInput.percentile != "null" && (
                  <span className="font-bold whitespace-nowrap">
                    Percentile:{" "}
                    <span className="text-red-600">
                      {errorUserInput.percentile}
                    </span>
                    ,
                  </span>
                )}{" "}
                {errorUserInput.rank != "null" && (
                  <span className="font-bold whitespace-nowrap">
                    Rank:{" "}
                    <span className="text-red-600">{errorUserInput.rank}</span>,
                  </span>
                )}{" "}
                {errorUserInput.college != "null" && (
                  <span className="font-bold whitespace-nowrap">
                    College:{" "}
                    <span className="text-red-600">
                      {errorUserInput.college}
                    </span>
                    ,
                  </span>
                )}{" "}
                {errorUserInput.branch != "null" && (
                  <span className="font-bold whitespace-nowrap">
                    Branch:{" "}
                    <span className="text-red-600">
                      {errorUserInput.branch}
                    </span>
                    ,
                  </span>
                )}{" "}
                {errorUserInput.year && (
                  <span className="font-bold whitespace-nowrap">
                    Year:{" "}
                    <span className="text-red-600">{errorUserInput.year}</span>,
                  </span>
                )}{" "}
                {errorUserInput.round && (
                  <span className="font-bold whitespace-nowrap">
                    Round:{" "}
                    <span className="text-red-600">{errorUserInput.round}</span>
                    ,
                  </span>
                )}{" "}
              </p>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Percentile:</label>
              <input
                className="query-input"
                id="percentile"
                placeholder="Ex. 87.1234567"
                value={percentile}
                onChange={(e) => {
                  // setPercentile(e.target.value);
                  limitDecimalPlaces(e.target.value, 7);
                }}
                // onInput={(event) => {
                //   clearFlash();
                //   limitDecimalPlaces(event);
                // }}
              />
            </div>

            <div className="or-text pt-[20px]">
              OR<span style={{ color: "red" }}>*</span>
            </div>

            <div className="form-group">
              <label htmlFor="rank">Rank:</label>
              <input
                className="query-input"
                type="text"
                name="rank"
                id="rank"
                placeholder="Ex. 5400"
                value={rank}
                onChange={(e) => {
                  // setRank(e.target.value);
                  limitDigits(e.target.value);
                }}
                // onInput={(event) => {
                //   clearFlash();
                //   limitDigits(event);
                // }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exam">Select Exam Type:</label>
              <select
                className="query-input"
                name="exam"
                id="exam"
                // ref={exam}
                // onChange={showCategoryFilter}
              >
                <option
                // value="mht-cet"
                >
                  MHT-CET
                </option>
                <option
                // value="jee"
                >
                  JEE
                </option>
              </select>
            </div>
            <div className="or-text-transparent">OR</div>

            <div className="form-group">
              <label htmlFor="numRows">Result Display Limit:</label>
              <input
                className="query-input"
                type="number"
                name="numRows"
                id="numRows"
                step="1"
                min="1"
                defaultValue={defaultDisplayLimit}
                onChange={(e) => {
                  setDefaultDisplayLimit(e.target.value);
                }}
                ref={limit}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year: </label>
              {/* select year */}
              <select
                className="query-input"
                name="year"
                id="year"
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  selectRoundsByYear(e.target.value);
                  // setCategoryListByYear(e.target.value);
                }}
              >
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="or-text-transparent">OR</div>

            <div className="form-group">
              <label htmlFor="gender">Gender: </label>

              {/* select gender */}
              <select
                className="query-input"
                name="gender"
                id="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log("e.target: ", e.target);
                }}
                // style={{ display: roundVisibility ? "block" : "none" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option vaalue="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label
                htmlFor="round"
                // style={{ display: roundVisibility ? "block" : "none" }}
                id="roundLabel"
              >
                Select Round:
              </label>
              <select
                id="round"
                className="hide query-input"
                style={{ display: "block" }}
                // value={round}
                onChange={(e) => {
                  setSelectedRound(e.target.value);
                  console.log("Round: ", e.target.value);
                }}
              >
                {(() => {
                  let arrOfRounds = [];
                  for (let i = 1; i <= selectedRoundNos; i++) {
                    arrOfRounds.push(i);
                  }

                  return arrOfRounds.map((round, index) => {
                    return (
                      <option
                        key={index}
                        value={round}
                      >{`Round ${round}`}</option>
                    );
                  });
                })()}
              </select>
            </div>

            <div className="or-text-transparent">OR</div>
            <div className="form-group">
              <label
                htmlFor="category"
                // style={{ display: categoryVisibility ? "block" : "none" }}
                id="categoryLabel"
              >
                Select Category:
              </label>
              <select
                className="query-input"
                id="category"
                // style={{ display: categoryVisibility ? "block" : "none" }}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="branch">Select Branch:</label>
              <select
                name="branch"
                id="branch"
                className="query-input"
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value={"null"}>All branches</option>
                {branches.map((branchItem) => (
                  <option key={branchItem} value={branchItem}>
                    {branchItem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="collegeSearch">Search College:</label>
              <input
                className="query-input"
                type="text"
                name="collegeSearch"
                id="collegeSearch"
                list="collegesList"
                placeholder="Start typing..."
                onChange={(e) => setCollegeName(e.target.value)}
              />
              <datalist id="collegesList">
                {colleges.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
                <option>colleges</option>
              </datalist>
            </div>
          </div>

          <div className="form-row home-university">
            <input
              className="query-input"
              style={{ display: "none" }}
              type="text"
              name="page"
              id="page"
              // value="queryForm"
            />

            {/* ####################################### Home University ############################################ */}
            <label htmlFor="branch">Select Home University: </label>
            <select
              id="university"
              className="query-input"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value={"null"}>None</option>
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300 mt-5"
              onClick={() => submitHandler}
            >
              GET RESULTS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryPage;
