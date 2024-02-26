import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants.js";

const Home = () => {
	const [colleges, setColleges] = useState([]);

	const fetchData = async () => {
		const response = await fetch(`${SERVER_URL}/api/v1/lists/colleges/cet`);
		const data = await response.json();
		console.log(data);
		setColleges(data.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return colleges.length == 0 ? (
		<h1>Empty</h1>
	) : (
		<div className="home">
			<h1>Displaying Colleges</h1>
			{colleges.map((college) => {
				return <h3 key={college}>{college}</h3>;
			})}
		</div>
	);
};

export default Home;
