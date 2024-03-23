import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "../Styles/MainPage.css";

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
    <div className="flex flex-row justify-between px-2 py-2 nav-panel-header">
      <h2 onClick={toggleUserDetails} className="px-3">
        CRS
      </h2>
      {userLoggedIn && (
        <div className="userIcon relative">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              className="rounded-full h-8 w-8 cursor-pointer"
              alt="UserPhoto"
              onClick={toggleUserDetails}
            />
          ) : (
            <FaRegUserCircle
              onClick={toggleUserDetails}
              className="rounded-full h-8 w-8 cursor-pointer"
            />
          )}
          {showUserDetails && (
            <div className="flex flex-col absolute z-[10] shadow-md rounded-md p-2 right-0 profile-float">
              <p className="text-[14px]">
                {currentUser.displayName || userName}
              </p>
              <button
                onClick={handleLogout}
                className="mt-2 px-3 py-1 bg-red-500 text-black rounded-md"
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
