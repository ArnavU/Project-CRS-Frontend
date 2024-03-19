import "../Styles/MainPage.css";
import SignupPage from "./SignupPage";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="loginMenu">
        <h1 className="loginHeading">College Recommendation System</h1>
        <div className="login-form-div">
          <p className="error-message"></p>
          <form action="/login" method="post" className="loginForm">
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit" className="login-button">
              <b>Login</b>
            </button>
          </form>
          <p className="message">
            Don't you have an account?
            <Link to="/signuppage">Create an account</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
