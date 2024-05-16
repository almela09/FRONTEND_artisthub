import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { setToken } from "../../app/slices/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    const fetched = await LoginUser(user);
    console.log(fetched);
    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);
      dispatch(
        setToken({
          token: fetched.token,
          decodeToken: decodificado,
        })
      );
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sandro_Botticelli_069.jpg/800px-Sandro_Botticelli_069.jpg"
          alt="Boticelli Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={user.email || ""}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={user.password || ""}
              onChange={inputHandler}
            />
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
          <button
            type="submit"
            className="bg-blue-600 hover:bg--600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          
        </div>
      </div>
    </div>
  );
};
