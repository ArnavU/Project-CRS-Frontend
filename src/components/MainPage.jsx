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

const MainPage = () => {
	const { userLoggedIn } = useAuth();
	const navigate = useNavigate();

	const {
		percentile,
		setPercentile,
		rank,
		setRank,
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
		selectedRound, // no. of rounds in the year
		setSelectedRound,
		defaultDisplayLimit,
	} = useContext(QueryContext);

	const limit = useRef(7);

	const [isLoading, setIsLoading] = useState(false);
	const [showSidebar, setShowSidebar] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const submitHandler = (e) => {
		setErrorMessage(null);
		e.preventDefault();

		if (!percentile) {
			setErrorMessage("Enter percentile/rank");
			return;
		}

		setIsLoading(true);
		console.log(
			"Submit Handler: ",
			selectedRound,
			selectedYear,
			collegeName
		);
		// setShowSidebar(false);

		// queryString => gender/category/percentile/rank/college/branch/year/round
		let queryString = `${gender}/${category.toLowerCase()}/${
			percentile ? percentile : "null"
		}/${rank ? rank : "null"}/${
			collegeName || "null"
		}/${branch}/${selectedYear}/${selectedRound}`;
		console.log("querystring is  " + queryString);

		useGetQueryData(
			queryString,
			setQResponse,
			setTempQResponse,
			limit,
			setIsLoading
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
		setSelectedRound(round);
		// console.log("Round: ", round);
	};

	useEffect(() => {
		if (!userLoggedIn) {
			navigate("/");
		}
		if (!selectedRound) {
			useGetBranchList(setBranches);
			useGetCollegeList(setColleges);
			useGetCategoryList(setCategories, setCategory);
			
			useGetYearList(
				setYearData,
				setYearList,
				setSelectedYear,
				setSelectedRound
				);
		}
		useGetCategoryList(setCategories, setCategory, selectedYear);
	}, [selectedRound]);

	return (
		<div className="maindiv">
			<button
				className="absolute right-1 top-20 p-2 rounded-md bg-white admin-button"
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
					{errorMessage && (
						<p
							id="flash-message"
							className="text-red-600 font-bold text-center"
						>
							{errorMessage}
						</p>
					)}

					{/* ########################### Percentile ############################## */}
					<label htmlFor="percentile">Percentile:</label>
					<input
						className="query-input"
						type="text"
						name="percentile"
						id="percentile"
						placeholder="87.1234567"
						value={percentile}
						onChange={(e) => {
							setPercentile(e.target.value);
						}}
					/>

					{/* ########################### Rank ############################## */}

					<label htmlFor="rank">Rank:</label>
					<input
						className="query-input"
						type="text"
						name="rank"
						id="rank"
						placeholder="Ex. 4500"
						value={rank}
						onChange={(e) => setRank(e.target.value)}
					/>

					{/* ########################### Exam type ############################## */}

					<label htmlFor="exam">Select Exam:</label>
					<select name="exam" id="exam" className="query-input">
						<option>MHT-CET</option>
						<option disabled={true}>JEE</option>
					</select>

					{/* ########################### Year List ############################## */}
					<label htmlFor="year">Select year:</label>
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
						onChange={(e) => setCategory(e.target.value)}
					>
						{categories?.map((category) => (
							<option key={category} value={category}>
								{category}
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
						value={round}
						onChange={(e) => setRound(e.target.value)}
					>
						{(() => {
							let arrOfRounds = [];
							for (let i = 1; i <= selectedRound; i++) {
								console.log("Round from mainpage: ", round);
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
            value={collegeName==="null" ? "" : collegeName}
            onChange={(e) => {setCollegeName(e.target.value)}}
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
						defaultValue={defaultDisplayLimit}
						ref={limit}
						onChange={limitChangeHandler}
					/>
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
						This is the minimum percentile/rank you need to get this
						college
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
