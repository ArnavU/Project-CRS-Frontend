import "../Styles/MainPage.css";
import { useContext, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import useGetQueryData from "../hooks/useGetQueryData.jsx";
import useGetCollegeList from "../hooks/useGetCollegeList.jsx";
import useGetCategoryList from "../hooks/useGetCategoryList.jsx";
import useGetYearList from "../hooks/useGetYearData.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useGetBranchList from "../hooks/useGetBranchList.jsx";
import Loader from "./Loader.jsx";
import { QueryContext } from "../contexts/queryContext.jsx";
import useGetUniversities from "../hooks/useGetUniversities.jsx";
import { MdMargin } from "react-icons/md";

const MainPage = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorUserInput, setErrorUserInput] = useState(null);

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
    setUniversities,
    universities,
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
    selectedRoundNos, // no. of rounds in the year
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

  const submitHandler = (e) => {
    setErrorMessage(null);
    setErrorUserInput(null);
    e.preventDefault();

    if (!percentile) {
      setErrorMessage("Enter percentile/rank");
      return;
    }

    setIsLoading(true);
    console.log("Submit Handler: ", selectedRound, selectedYear, collegeName);
    // setShowSidebar(false);

    // queryString => gender/category/percentile/rank/college/branch/year/round
    let queryString = `${gender}/${category.toLowerCase()}/${
      percentile ? percentile : "null"
    }/${rank ? rank : "null"}/${
      collegeName || "null"
    }/${branch}/${selectedYear}/${selectedRound}/${selectedUniversity}`;

    console.log("querystring is  " + queryString);

    useGetQueryData(
      queryString,
      setQResponse,
      setTempQResponse,
      limit,
      setIsLoading,
      setErrorUserInput
    );
  };

  const limitChangeHandler = () => {
    setTempQResponse(
      qResponse.filter((ele, index) => {
        return index < limit.current.value;
      })
    );
    console.log();
  };

  // function to set round on the basis year selected
  const selectRoundsByYear = (year) => {
    // console.log(year);
    const round = yearData[year];
    setSelectedRoundNos(round);
    // console.log("Round: ", round);
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
    useGetCategoryList(
      categories,
      setCategories,
      category,
      setCategory,
      selectedYear
    );

    useGetUniversities(setUniversities);
  }, [selectedYear]);

  return (
    <div className="maindiv">
      <input type="checkbox" id="check" checked={showSidebar} />

      <label htmlFor="check">
        <HiMenu
          id="btn"
          className="icon"
          onClick={() => setShowSidebar(true)}
        />
        <IoIosClose
          className="icon"
          id="cancel"
          onClick={() => setShowSidebar(false)}
        />
      </label>
      <div className="sidebar ">
        <header>
          <b>Enter Your Query</b>
        </header>
        <form
          className="mainpage-form"
          action="/main/query"
          method="GET"
          onSubmit={submitHandler}
        >
          {errorMessage && (
            <p
              id="flash-message"
              className="text-red-600 font-bold text-center"
            >
              {errorMessage}
            </p>
          )}

          {/* ########################### Percentile ############################## */}
          <div style={{ display: "flex" }}>
            <div style={{ flex: "64%" }}>
              <label htmlFor="percentile">Percentile:</label>
              <input
                className="query-input"
                type="text"
                name="percentile"
                id="percentile"
                placeholder="87.1234567"
                value={percentile}
                onChange={(e) => {
                  //   setPercentile(e.target.value);
                  limitDecimalPlaces(e.target.value, 7);
                }}
              />
            </div>

            <span style={{ margin: "20px", marginTop: "30px" }}>
              <b>
                OR<span style={{ color: "red" }}>*</span>
              </b>
            </span>

            {/* ########################### Rank ############################## */}

            <div>
              <label htmlFor="rank">Rank:</label>
              <input
                className="query-input"
                type="text"
                name="rank"
                id="rank"
                placeholder="Ex. 4500"
                value={rank}
                onChange={(e) => {
                  //   setRank(e.target.value);
                  limitDigits(e.target.value);
                }}
              />
            </div>
          </div>

          {/* ########################### Exam type ############################## */}

          <label htmlFor="exam">Select Exam:</label>
          <select name="exam" id="exam" className="query-input">
            <option>MHT-CET</option>
            <option disabled={true}>JEE</option>
          </select>

          {/* ########################### Year List ############################## */}
          <label htmlFor="year">Cutoff year:</label>
          <select
            className="query-input"
            id="year"
            value={selectedYear}
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

          {/* ########################## Gender ########################## */}

          <label htmlFor="gender">Gender: </label>

          {/* select gender */}
          <select
            className="query-input"
            name="gender"
            id="gender"
            value={gender}
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

          {/* ########################### Category List ############################## */}
          <label
            htmlFor="category"
            id="categoryLabel"
            className="hide"
            style={{ display: "block" }}
          >
            Select Category:
          </label>
          <select
            id="category"
            name="category"
            className="hide query-input"
            style={{ display: "block" }}
            value={category}
            onChange={(e) => {
              console.log(category);
              setCategory(e.target.value);
            }}
          >
            {categories?.map((onecategory) => (
              <option key={onecategory} value={onecategory}>
                {onecategory}
              </option>
            ))}
          </select>

          {/* ########################### Round List ############################## */}
          <label
            htmlFor="round"
            id="roundLabel"
            className="hide"
            style={{ display: "block" }}
          >
            Select Round:
          </label>
          <select
            id="round"
            className="hide query-input"
            style={{ display: "block" }}
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
          >
            {(() => {
              let arrOfRounds = [];
              for (let i = 1; i <= selectedRoundNos; i++) {
                arrOfRounds.push(i);
              }

              return arrOfRounds.map((round, index) => {
                return (
                  <option key={index} value={round}>{`Round ${round}`}</option>
                );
              });
            })()}
          </select>

          {/* ############################### Branch List ############################### */}
          <label htmlFor="branch">Select Branch:</label>
          <select
            id="branch"
            className="query-input"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value={"null"}>All Branches</option>
            {branches.map((oneBranch) => (
              <option key={oneBranch} value={oneBranch}>
                {oneBranch}
              </option>
            ))}
          </select>

          {/* ############################### College List ############################### */}
          <label htmlFor="collegeSearch">Search College:</label>
          <input
            className="query-input"
            type="text"
            name="collegeSearch"
            id="collegeSearch"
            list="collegesList"
            placeholder="Start typing your college name..."
            value={collegeName === "null" ? "" : collegeName}
            onChange={(e) => {
              setCollegeName(e.target.value);
            }}
          />
          <datalist
            id="collegesList"
            className="query-input" // Set default value here
          >
            {colleges.map((College, key) => (
              <option key={key} value={College}>
                {College}
              </option>
            ))}
          </datalist>

          {/* ######################## Result Display Limit ######################### */}
          <label htmlFor="numRows">Result Display Limit:</label>
          <input
            className="query-input"
            type="number"
            name="numRows"
            id="numRows"
            step="1"
            min="1"
            value={defaultDisplayLimit}
            ref={limit}
            onChange={(e) => {
              limitChangeHandler();
              setDefaultDisplayLimit(e.target.value);
            }}
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

          {/* ################################Submit button sidebar ####################### */}
          <button
            type="submit"
            className="bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300 m-5"
            onClick={() => {
              //   setShowSidebar(false);
            }}
          >
            <b>Apply Filters</b>
          </button>
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-container">
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

          {/* table */}
          <p
            id="flash_branch_not_available"
            style={{ display: "none", color: "red" }}
          >
            You cannot get the selected branch in this college
          </p>
          <p
            id="flash_percentile_rank_not_sufficient"
            style={{ display: "none", color: "red" }}
          >
            This is the minimum percentile/rank you need to get this college
          </p>
          <table id="table">
            <tbody>
              <tr>
                <th>Serial No.</th>
                <th>Institute</th>
                <th>Rank</th>
                <th>Cutoff</th>
                <th>Course Name</th>
                <th>Exam</th>
                <th>Link</th>
              </tr>

              {tempQResponse.map((CollegeInfo, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{CollegeInfo.college}</td>
                  <td>{CollegeInfo.rank}</td>
                  <td>{CollegeInfo.percentile}</td>
                  <td>{CollegeInfo.course}</td>
                  <td>MHT-CET</td>
                  <td>
                    <a href={CollegeInfo.hyperLink}>Link</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MainPage;
