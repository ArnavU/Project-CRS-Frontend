import { useState } from "react";
// import "../Styles/App.css";
import SignupPage from "./SignupPage";
import QueryPage from "./QueryPage";
import Index from "./MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MainPage from "./MainPage";
import { HiMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import Admin from "./Admin";
import Login from "../auth/login";
import Register from "../auth/register";
import { AuthProvider } from "../contexts/authContext";
import Header from "./Header";
import { QueryProvider } from "../contexts/queryContext";


// import "@fontsource/poppins"; // Defaults to weight 400
// import "@fontsource/poppins/400.css"; // Specify weight
// import "@fontsource/poppins/400-italic.css"; // Specify weight and style




const App = () => {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<>
			<AuthProvider>
				<QueryProvider>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/querypage" element={<QueryPage />} />
							<Route path="/mainpage" element={<MainPage />} />
							<Route path="/Admin" element={<Admin />} />
							{/* <Route
            path="querypage"
            element={isLogin ? <QueryPage /> : <LoginPage />}
		/> */}
						</Routes>
					</BrowserRouter>
					<ThemeToggle />
				</QueryProvider>
			</AuthProvider>
		</>
	);
};

export default App;
