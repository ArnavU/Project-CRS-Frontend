import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function useCheckUserLoggedIn() {
	const { userLoggedIn } = useAuth();
	const navigate = useNavigate();

	if (!userLoggedIn) {
		navigate("/");
        return false;
	}
    else {
        return true;
    }

}

export default useCheckUserLoggedIn;
