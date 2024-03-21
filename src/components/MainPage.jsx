import "../Styles/MainPage.css";
import { useRef, useState } from "react";
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
import {
  BRANCH_LIST_URL,
  CATEGORY_LIST_URL,
  COLLEGE_LIST_URL,
} from "../utils/constants.js";
import Loader from "./Loader.jsx";

let collegeListURL = COLLEGE_LIST_URL;
let branchListURL = BRANCH_LIST_URL;
let categoryURL = CATEGORY_LIST_URL;

const MainPage = ({ queryString }) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log("QueryString in main page: ");
  console.log(queryString);
  const [qResponse, setQResponse] = useState([]);
  const [tempQResponse, setTempQResponse] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedRound, setSelectedRound] = useState();
  const [defaultDisplayLimit] = useState(7);

  // ########### Reference Variables ##########
  const gender = "female";
  const category = useRef("");
  // const category = "sc";
  const percentile = useRef("");
  const rank = useRef("");
  const college = useRef("");
  // const college = "vishwakarma";
  const branch = useRef("");
  // const branch = "Information";
  const year = useRef("");
  // const year = 2022;
  const round = useRef("");
  // const round = 1;
  const limit = useRef(7);

  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSidebar(false);

    // let queryString = `${gender}/${category.current.value.toLowerCase()}/${
    //   percentile.current.value ? percentile.current.value : "null"
    // }/${rank.current.value ? rank.current.value : "null"}/${
    //   college.current.value || "null"
    // }/${branch.current.value}/${year.current.value}/${round.current.value}`;
    // console.log("querystring is  " + queryString);

    useGetQueryData(
      queryString,
      setQResponse,
      setTempQResponse,
      defaultDisplayLimit,
      setIsLoading
    );

    limit.current.value = defaultDisplayLimit;
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
  const selectRoundsByYear = (e) => {
    const year = e.target.value;
    // console.log(year);
    const round = yearData[year];
    setSelectedRound(round);
    // console.log("Round: ", round);
  };

  useEffect(() => {
    // if (!userLoggedIn) {
    //   navigate("/");
    // }
    // useGetQueryData(queryString, setQResponse);
    // useGetBranchList(setBranches);
    // useGetCollegeList(setColleges);
    // useGetCategoryList(setCategories);
    // useGetYearList(setYearData, setYearList, setSelectedYear, setSelectedRound);
  }, []);

  return (
    <div className="maindiv">
      <button
        className="absolute right-4 top-20 p-2 rounded-md bg-white admin-button"
        onClick={() => {
          navigate("/Admin");
        }}
      >
        Admin
      </button>
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
          <p id="flash-message" style={{ display: "none", color: "red" }}>
            Please fill Percentile or Rank
          </p>

          {/* ########################### Percentile ############################## */}
          <label htmlFor="percentile">Percentile:</label>
          <input
            className="query-input"
            type="text"
            name="percentile"
            id="percentile"
            placeholder="87.1234567"
            // value="88.2222222"
            onChange={() => console.log("Change Percentile")}
            onInput={() => console.log("handle")}
            ref={percentile}
          />

          {/* ########################### Rank ############################## */}

          <label htmlFor="rank">Rank:</label>
          <input
            className="query-input"
            type="text"
            name="rank"
            id="rank"
            placeholder="Ex. 4500"
            // value="NaN"
            onChange={() => console.log("Change rank")}
            onInput={() => console.log("Handle")}
            ref={rank}
          />

          {/* ########################### Exam type ############################## */}

          <label htmlFor="exam">Select Exam:</label>
          <select name="exam" id="exam" className="query-input">
            <option>MHT-CET</option>
            <option disabled="true">JEE</option>
          </select>

          {/* ########################### Year List ############################## */}
          <label htmlFor="year">Select year:</label>
          <select
            className="query-input"
            name="year"
            id="year"
            ref={year}
            onChange={(e) => {
              selectRoundsByYear(e);
            }}
          >
            {yearList.map((year) => (
              <option key={year}>{year}</option>
            ))}
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
            ref={category}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
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
            name="round"
            id="round"
            className="hide query-input"
            ref={round}
            style={{ display: "block" }}
          >
            {(() => {
              let arrOfRounds = [];
              for (let i = 1; i <= selectedRound; i++) {
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
            name="branch"
            id="branch"
            className="query-input"
            ref={branch}
          >
            <option value={"null"}>All Branches</option>
            {branches.map((oneBranch) => (
              <option key={oneBranch}>{oneBranch}</option>
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
            ref={college}
          />
          <datalist id="collegesList" className="query-input">
            {colleges.map((College, key) => (
              <option key={key}>{College}</option>
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
            defaultValue={defaultDisplayLimit}
            ref={limit}
            onChange={limitChangeHandler}
          />
          {/* ################################Submit button sidebar ####################### */}
          <button
            type="submit"
            className="bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300 m-5"
            onClick={() => {
              setShowSidebar(false);
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
              </tr>

              {tempQResponse.map((CollegeInfo, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{CollegeInfo.college}</td>
                  <td>{CollegeInfo.rank}</td>
                  <td>{CollegeInfo.percentile}</td>
                  <td>{CollegeInfo.course}</td>
                  <td>MHT-CET</td>
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

const fetchCollegeData = async () => {
  try {
    const response = await fetch(collegeListURL);
    const data = await response.json();
    setColleges(data.data);
    // console.log(data.data);
  } catch (error) {
    console.error("Error fetching colleges:", error);
  }
};
