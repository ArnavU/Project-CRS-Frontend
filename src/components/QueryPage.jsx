import React, { useEffect, useRef, useState } from "react";
import MainPage from "./MainPage";
import "../Styles/MainPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  BRANCH_LIST_URL,
  CATEGORY_LIST_URL,
  COLLEGE_LIST_URL,
} from "../utils/constants";

let collegeListURL = COLLEGE_LIST_URL;
let branchListURL = BRANCH_LIST_URL;
let categoryURL = CATEGORY_LIST_URL;

const QueryPage = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  // let queryString = "Hi";
  const [queryString, setQueryString] = useState("Hi");
  //Data fetched from API
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);

  //For Filtering user input
  // const [gender, setGender] = useState("");
  // const [category, setCategory] = useState("");
  // const [percentile, setPercentile] = useState("");
  // const [rank, setRank] = useState("");
  // const [college, setCollege] = useState("");
  // const [branch, setBranch] = useState("");
  // const [year, setYear] = useState("");
  // const [round, setRound] = useState("");
  // const [exam, setExam] = useState("");

  const gender = useRef();
  const category = useRef("");
  const percentile = useRef("");
  const rank = useRef("");
  const college = useRef("");
  const branch = useRef("");
  const year = useRef("");
  const round = useRef("");
  // const [exam, setExam] = useState("");

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

  const fetchBranchData = async () => {
    try {
      const response = await fetch(branchListURL);
      const branchesData = await response.json();
      // console.log(branchesData.data);
      setBranches(branchesData.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(categoryURL);
      const categoryData = await response.json();
      console.log(categoryData);
      setCategories(categoryData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = () => {
    // e.preventDefault();
    console.log("Form Submitted");
    let queryString = `${gender}/${category.current.value}/${percentile.current.value}/${rank.current.value}/${college.current.value}/${branch.current.value}/${year.current.value}/${round.current.value}`;
    setQueryString(queryString);
    console.log("Query string queryPage: ", queryString);
    // navigate('/')
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
    fetchCollegeData();
    fetchBranchData();
    fetchCategories();
  }, []);

  const [categoryVisibility, setCategoryVisibility] = useState(true);
  const [roundVisibility, setRoundVisibility] = useState(true);

  return (
    <div className="queryform-div">
      <div className="form-container">
        <form
          // action="/main/query"
          // method="GET"
          onSubmit={submitHandler}
        >
          <h1 className="heading">Enter Your Details</h1>
          <p id="flash-message" style={{ display: "none", color: "red" }}>
            Please fill Percentile or Rank
          </p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="percentile">Percentile:</label>
              <input
                className="query-input"
                type="text"
                name="percentile"
                id="percentile"
                placeholder="Ex. 87.1234567"
                ref={percentile}
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
                ref={rank}
                // onInput={(event) => {
                //   clearFlash();
                //   limitDigits(event);
                // }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exam">Select Exam:</label>
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

            <div className="form-group">
              <label htmlFor="numRows">Result Display Limit:</label>
              <input
                className="query-input"
                type="number"
                name="numRows"
                id="numRows"
                defaultValue="7"
                step="1"
                min="1"
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
                ref={year}
                // style={{ display: roundVisibility ? "block" : "none" }}
              >
                {console.log(year)}
                <option defaultValue="2022">2022</option>
                <option defaultValue="2021">2021</option>
                <option defaultValue="2020">2020</option>
                <option defaultValue="2019">2019</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender: </label>

              {/* select gender */}
              <select
                className="query-input"
                name="gender"
                id="gender"
                ref={gender}
                // style={{ display: roundVisibility ? "block" : "none" }}
              >
                {console.log(gender)}
                <option defaultValue="male">Male</option>
                <option defaultValue="female">Female</option>
                <option defaultValue="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label
                htmlFor="round"
                style={{ display: roundVisibility ? "block" : "none" }}
                id="roundLabel"
              >
                Select Round:
              </label>
              <select
                className="query-input"
                name="round"
                id="round"
                ref={round}
                style={{ display: roundVisibility ? "block" : "none" }}
              >
                <option defaultValue="round1">Round 1</option>
                <option defaultValue="round2">Round 2</option>
                <option defaultValue="round3">Round 3</option>
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="category"
                style={{ display: categoryVisibility ? "block" : "none" }}
                id="categoryLabel"
              >
                Select Category:
              </label>
              <select
                className="query-input"
                id="category"
                name="category"
                style={{ display: categoryVisibility ? "block" : "none" }}
                ref={category}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
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
                ref={branch}
              >
                <option>All branches</option>
                {branches.map((branchItem) => (
                  <option key={branchItem}>{branchItem}</option>
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
                ref={college}
              />
              <datalist id="collegesList">
                {colleges.map((item, key) => (
                  <option key={key}>{item}</option>
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
              <Link
                to="/mainpage"
                element={<MainPage queryString={queryString} />}
              >
                <button
                  type="submit"
                  className="bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300 mt-5"
                  // onClick={() => <Link to="/mainpage" element={<MainPage />} />}
                  onClick={() => submitHandler()}
                >
                  GET RESULTS
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryPage;
