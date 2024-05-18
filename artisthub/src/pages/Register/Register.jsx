import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../services/apiCalls.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import unnamed3 from "../../images/unnamed3.jpg";
export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    nick: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    nickError: "",
  });
  const [msgError, setMsgError] = useState("");

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const validate = (name, value) => {
    let error = "";
    if (name === "email") {
      const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (!validEmail.test(value)) {
        error = "Email format is not valid";
      }
    }
    if (name === "password") {
      if (value.length < 6 || value.length > 10) {
        error = "Password must contain between 6 and 10 characters";
      }
    }
    if (name === "nick") {
      if (value.length < 3 || value.length > 15) {
        error = "Nick must contain between 3 and 15 characters";
      }
    }
    return error;
  };

  const registerUser = async () => {
    try {
      setIsLoading(true);
      for (let field in user) {
        if (user[field] === "") {
          throw new Error("All fields must be filled");
        }
      }
      const response = await registerUserApi(user);
      setMsgError(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMsgError(error.response?.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={unnamed3}
          alt="Boticelli Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                userError.emailError ? "border-red-500" : ""
              }`}
              autoComplete="off"
              value={user.email}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="text-red-500">{userError.emailError}</div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                userError.nameError ? "border-red-500" : ""
              }`}
              autoComplete="off"
              value={user.name}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="text-red-500">{userError.nameError}</div>
          </div>

          <div className="mb-4">
            <label htmlFor="nick" className="block text-gray-600">
              Nick
            </label>
            <input
              type="text"
              id="nick"
              name="nick"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                userError.nickError ? "border-red-500" : ""
              }`}
              autoComplete="off"
              value={user.nick}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="text-red-500">{userError.nickError}</div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                userError.passwordError ? "border-red-500" : ""
              }`}
              autoComplete="off"
              value={user.password}
              onChange={inputHandler}
              onBlur={checkError}
            />
            <div className="text-red-500">{userError.passwordError}</div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="mb-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-black hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              >
                Register
              </button>
            )}
            <div className="text-red-500">{msgError}</div>
          </div>

          <div className="mt-6 text-blue-500 text-center">
            <a href="/login" className="hover:underline">
              Sign up Here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
