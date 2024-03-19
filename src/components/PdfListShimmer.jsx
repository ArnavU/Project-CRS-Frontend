import React from "react";
import "../Styles/AdminIndex.css";

function PdfListShimmer({numbers: num}) {
	return num && (
		<>
			{(() => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push(i);
				}
        
				return arr.map((ele) => {
					return (
						<div key={ele} className="pdf-card-shimmer">
							<h3>2019ENGG_CAP1_CutOff</h3>
							<p>Year: 2019</p>
							<p>Round: 1</p>
							<p>Exam: mht-cet</p>
							<button className="view-pdf-button-shimmer">
								View
							</button>
							<button className="delete-pdf-button-shimmer">
								Delete
							</button>
						</div>
					);
				})
        
			})()}
		</>
	);
}

export default PdfListShimmer;
