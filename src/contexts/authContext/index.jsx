import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [isEmailUser, setIsEmailUser] = useState(false);
	const [isGoogleUser, setIsGoogleUser] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState(null);
	const [userPassword, setUserPassword] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, []);

	async function initializeUser(user) {
		if (user) {
			setCurrentUser({ ...user });
			setUserName(user.email);

			// check if provider is email and password login
			const isEmail = user.providerData.some(
				(provider) => provider.providerId === "password"
			);
			setIsEmailUser(isEmail);

			// check if the auth provider is google or not
			//   const isGoogle = user.providerData.some(
			//     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
			//   );
			//   setIsGoogleUser(isGoogle);

			setUserLoggedIn(true);
		} else {
			setCurrentUser(null);
			setUserLoggedIn(false);
		}

		setLoading(false);
	}

	const value = {
		userLoggedIn,
    	setUserLoggedIn,
		isEmailUser,
		isGoogleUser,
		currentUser,
		setCurrentUser,
		userName, 
		setUserName, 
		userPassword,
		setUserPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
