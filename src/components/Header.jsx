import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
	const { currentUser, userLoggedIn, userName } = useAuth();
	const [showUserDetails, setShowUserDetails] = useState(false);

	const navigate = useNavigate();

	const toggleUserDetails = () => {
		setShowUserDetails((prev) => !prev);
	};

	function userIconClickHandler(e) {
		let element = e.target;
		if (!element.closest(".userIcon")) {
			setShowUserDetails(false);
		}
	}

	window.addEventListener("click", userIconClickHandler);

	const handleLogout = () => {
		doSignOut().then(() => {
			navigate("/");
		});
	};

	return (
		<div className="flex flex-row justify-between px-2 py-2 bg-zinc-400">
			<h2 onClick={toggleUserDetails}>Logo</h2>
			{userLoggedIn && (
				<div className="userIcon relative">
					{currentUser.photoURL ? <img
						src={currentUser.photoURL}
						className="rounded-full h-8 w-8 cursor-pointer"
						alt="UserPhoto"
						onClick={toggleUserDetails}
					/> : <FaRegUserCircle onClick={toggleUserDetails} className="rounded-full h-8 w-8 cursor-pointer" />} 
					{showUserDetails && (
						<div className="flex flex-col absolute z-10 bg-white shadow-md rounded-md p-2 mt-1 right-0">
							<p className="text-[14px]">
								{currentUser.displayName || userName}
							</p>
							<button
								onClick={handleLogout}
								className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Header;
