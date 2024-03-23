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

const QueryPage = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  // let queryString = "Hi";
  const [queryString, setQueryString] = useState("Hi");
  const [isLoading, setIsLoading] = useState(false);
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
    setSelectedRound(round);
  };

  const setCategoryListByYear = (year) => {
    // useGetCategoryList(setCategories, setCategory);
  };

  // ######################## Submit Handler ########################
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Query response length: ", qResponse.length);

    // queryString => gender/category/percentile/rank/college/branch/year/round
    let queryString = `${gender}/${category.toLowerCase()}/${
      percentile ? percentile : "null"
    }/${rank ? rank : "null"}/${
      collegeName || "null"
    }/${branch}/${selectedYear}/${selectedRound}`;
    console.log("querystring in QueryPage is  " + queryString);

    useGetQueryData(
      queryString,
      setQResponse,
      setTempQResponse,
      limit,
      setIsLoading
    );
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
    useGetBranchList(setBranches);
    useGetCollegeList(setColleges);
    useGetCategoryList(setCategories, setCategory);
    useGetYearList(setYearData, setYearList, setSelectedYear, setSelectedRound);
  }, []);

  return (
    <div className="queryform-div">
      {/* ############## Conditional navigation to mainpage ############## */}
      {qResponse?.length > 0 && navigate("/mainpage")}

      <div className="relative form-container">
        {isLoading && <QueryPageShimmer />}
        <form onSubmit={submitHandler}>
          <h1 className="heading">Enter Your Details</h1>
          <p id="flash-message" style={{ display: "none", color: "red" }}>
            Please fill Percentile or Rank
          </p>

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

            <div className="or-text">OR</div>

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
                onChange={(e) => {setDefaultDisplayLimit(e.target.value)}}
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
                  setYear(e.target.value);
                  selectRoundsByYear(e.target.value);
                  setCategoryListByYear(e.target.value);
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
                  setRound(e.target.value);
                  console.log("Round: ", e.target.value);
                }}
              >
                {(() => {
                  let arrOfRounds = [];
                  for (let i = 1; i <= selectedRound; i++) {
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

          <div className="form-row">
            <input
              className="query-input"
              style={{ display: "none" }}
              type="text"
              name="page"
              id="page"
              // value="queryForm"
            />

            <div className="button-container">
              <button
                type="submit"
                className="bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300 mt-5"
                onClick={() => submitHandler}
              >
                GET RESULTS
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryPage;
