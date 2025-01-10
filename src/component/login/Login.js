import React, { useState } from 'react'
import './login.css'
import { Header } from '../home/Home';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import Endpoints from '../../Endpoint';
import { notification } from 'antd';


const Login = () => {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loginMode, setLoginMode] = useState("otp");
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate()



    const handleSendOtp = async () => {

        console.log('hi')
        if (!email) {
            alert("Please enter a valid email.");
            return;
        }

        try {
            const response = await axios.post(Endpoints.sendotp, { email })
            // console.log(response)

            if (response.status === 200) {
                notification.success({
                    message: response.data.message
                })
                Cookies.set("email", email, { expires: 1 });
                setOtpSent(true);
            }
        } catch (error) {
            alert(error.response.data.message)
            notification.warning({
                message: error.response.data.message
            })
        }
    };

    const handleVerifyOtp = async () => {

        let email = Cookies.get('email')
        const verifidata = {
            email,
            otp
        }

        console.log(verifidata)

        try {
            const response = await axios.post(Endpoints.verityotp, verifidata)
            // console.log(response.data)
            if (response.status === 200) {
                notification.success({
                    message: response.data.message
                })
                Cookies.remove('email')
                Cookies.set('authToken', response.data.token)
                navigate('/seller/dashboard')
            }

        } catch (error) {
            notification.error({
                message: error.message
            })
        }
    };




    const handlePasswordLogin = async () => {

        const data = {
            email,
            password
        }
        try {
            const response = await axios.post(Endpoints.adminLogin, data)
            if(response.status === 200){
                notification.success({
                    message:response.data.message
                })
                Cookies.set('authToken', response.data.token)
                navigate('/seller/dashboard')
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert(error.response.data.message)
                notification.error({
                    message: error.response.data.message,
                });

            } else {
                alert(error.response.data.message || 'Failed to update task',)
                notification.error({
                    message: error.message || 'Failed to update task',
                });
            }
        }
    };



    return (

        <>
            <Header />
            <div className="logincontainer">
                <div className="firstorder w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-2">Login</h2>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Sign In to Get The Best Deals, Exclusive Offers
                    </p>

                    {loginMode === "otp" ? (
                        !otpSent ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendOtp();
                                }}
                            >
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <p className="text-sm text-center text-gray-500 mb-4">
                                    Sign in with Password{" "}
                                    <span
                                        onClick={() => setLoginMode("password")}
                                        className="text-blue-500 cursor-pointer"
                                    >
                                        click here
                                    </span>
                                </p>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Send Email OTP
                                </button>
                            </form>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleVerifyOtp();
                                }}
                            >
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Verify OTP
                                </button>
                            </form>
                        )
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handlePasswordLogin();
                            }}
                        >
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <p className="text-sm text-center text-gray-500 mb-4">
                                Sign in with OTP{" "}
                                <span
                                    onClick={() => setLoginMode("otp")}
                                    className="text-blue-500 cursor-pointer"
                                >
                                    click here
                                </span>
                            </p>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Login with Password
                            </button>
                        </form>
                    )}
                </div>

                <div className='second'>
                    <h1>flsadkjflssadfadslfjsadlfjasldjflas</h1>
                </div>

            </div>
        </>
    )
}

export default Login
