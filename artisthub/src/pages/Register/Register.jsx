export const Register = () => {
    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            {/* Left: Image */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="https://i.pinimg.com/originals/c4/2b/bc/c42bbcec29cf1a0345bbe3a573b9b334.jpg"
                    alt="Boticelli Image"
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Right: Login Form */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form action="#" method="POST">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="text-blue-500"
                        />
                        <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                    </div>
                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>
                    {/* Register Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Register
                    </button>
                </form>
                {/* Sign up Link */}
                <div className="mt-6 text-blue-500 text-center">
                    <a href="#" className="hover:underline">Sign up Here</a>
                </div>
            </div>
        </div>
    );
}