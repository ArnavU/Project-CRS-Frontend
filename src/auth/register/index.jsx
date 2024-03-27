import React, { useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn, setUserName } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/querypage");
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);
      if (password === confirmPassword) {
        const response = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        console.log("Is valid user: ", response.isValidUser);
        if (!response.isValidUser) {
          // message display logic
          let displayMessage = null;
          let message = response.message.message;
          if (message.includes("weak-password")) {
            displayMessage = "Password should be at least 6 characters";
          } else if (message.includes("email-already-in-use")) {
            displayMessage = "This email is already registered";
          } else if (message.includes("invalid-email")) {
            displayMessage = "Pleases enter a valid email";
          }
          setErrorMessage(displayMessage);
          setIsRegistering(false);
          return;
        }
        setUserName(email);
        navigate("/querypage");
      } else {
        setErrorMessage("Password mismatch!");
        setIsRegistering(false);
        return;
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/querypage"} replace={true} />}

      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className=" w-96 text-gray-600 space-y-5 p-4 rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="loginHeading text-xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="login-form-div space-y-4">
            <div>
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-zinc-300 w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-zinc-300 w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className="bg-zinc-300 w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2  font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-black submit-button hover:shadow-xl hover:text-white transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/"}
                className="text-center text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
