import { basePath } from "@/next.config";
import { auth } from "@/shared/firebase/firebaseapi";
import { useAppDispatch } from "@/src/state/index";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { axiosInstance } from "../../config/index";
import { updateUser } from "@/src/auth/auth.slice";
import { useCookies } from "react-cookie";
import { userCookieConfig } from "../../helpers";
import axios from "axios";
import { toast, ToastContainer, } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);
  const dispatch = useAppDispatch();

  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [emailMessage, setEmailMessage] = useState("");
  const [newPasswordMessage, setNewPasswordMessage]  = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("")
  const [cookie, setCookie] = useCookies(["user"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();
  // const { email, password } = data;
  // const changeHandler = (e:any) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  //   setError("");
  // };
  // const Login = (e:any) => {
  //   e.preventDefault();
  //   auth.signInWithEmailAndPassword(email, password).then(
  //     user => {console.log(user); RouteChange();}).catch(err => {setError(err.message);});
  // };

  // const Login1 = (_e:any) => {
  //   if (data.email == "adminnextjs@gmail.com" && data.password == "1234567890") {
  //     RouteChange();
  // }
  // else {
  //     setError("The Auction details did not Match");
  //     // setData({
  //     //     "email": "adminnextjs@gmail.com",
  //     //     "password": "1234567890",
  //     // });
  // }
  // };

  const resetPasswordHamdler = async () => {
    if (email.length == 0 && password.length == 0 && newPassword.length == 0 && otp.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("Password field is required");
      setNewPasswordMessage("Confirm password field is required");
      setOtpMessage("Otp code is required")
     
    }else if (password !== newPassword){
        setNewPasswordMessage("Password does not match!")
    } else if (email.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("");
    } else if (password.length == 0) {
      setEmailMessage("");
      setPasswordMessage("Password field is required");
    } else {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post("/auth/complete_password_reset", {
          email: email,
          password: password,
          confirm_password: newPassword,
          reset_code: otp
        });

        if (result.data.code === 200) {
          
         toast(result.data.message)
          router.push("/signin");
          setIsLoading(false);
          console.log(result);
        } else {
          
          toast.error(result.data.data)
          setIsLoading(false);
          
        }
      } catch (err: any) {
        setIsLoading(false);
        console.log("login error", err);
      }
    }
  };

  const resendOtp = async () =>{
    try {
        
        const result = await axiosInstance.post("/auth/resend_otp_code", {
          email: email,
          
        });

        if (result.data.code === 200) {
          setErrorCheck(false);
         
          toast(result.data.message);
        } else {
          setErrorCheck(true);
          setErrorMessage(result.data.data);
         
        }
      } catch (err: any) {
        setIsLoading(false);
        console.log("login error", err);
      }

  }

  return (
    <Fragment>
      <div className="container">
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box !p-[3rem]">
                <div
                  className="box-body"
                  role="tabpanel"
                  id="pills-with-brand-color-01"
                  aria-labelledby="pills-with-brand-color-item-1"
                >
                  <div className="flex justify-center">
                  <img
                alt=""
                src="https://samicsub.com/l_asset/img/samic-dark.png"
                className="h-10 w-auto"
              />

                  </div>

                  <p className="h5 font-semibold mb-2 text-center">
                    Reset Password
                  </p>
                  <p className="mb-4 text-[#8c9097] text-primary opacity-[0.7] font-normal ">
                    A reset code has been sent to your email.
                  </p>
                  
                 

                  <ToastContainer theme="light"></ToastContainer>
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setEmailMessage("");
                          }
                        }}
                        value={email}
                      />
                      <p className="text-danger pt-2">{emailMessage}</p>
                    </div>

                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <div className="input-group">
                        <input
                          name="New Password"
                          type={passwordshow1 ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            // Clear error message if the email field is not empty
                            if (e.target.value.length > 0) {
                              setPasswordMessage("");
                            }
                          }}
                          className="form-control form-control-lg !rounded-s-md"
                          id="new-password"
                          placeholder="New Password"
                        />

                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </button>
                      </div>
                      <p className="text-danger pt-2">{passwordMessage}</p>
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <div className="input-group">
                        <input
                          name="Confirm Password"
                          type={passwordshow2 ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            // Clear error message if the email field is not empty
                            if (e.target.value.length > 0) {
                                setNewPasswordMessage("");
                            }
                          }}
                          className="form-control form-control-lg !rounded-s-md"
                          id="confirm-password"
                          placeholder="Confirm Password"
                        />

                        <button
                          onClick={() => setpasswordshow2(!passwordshow2)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              passwordshow2 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </button>
                      </div>
                      <p className="text-danger pt-2">{newPasswordMessage}</p>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                      <input
                        type="text"
                        name="code"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="code"
                        placeholder="Reset code"
                        onChange={(e) => {
                          setOtp(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setOtpMessage("");
                          }
                        }}
                        value={otp}
                      />
                      <p className="text-danger pt-2 ">{otpMessage}</p>
                    </div>

                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      {/* <Link  href="" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                      <button
                          type="button"
                          onClick={resetPasswordHamdler}
                          className="btn-primary !font-medium shadow"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Send"}
                        </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center space-x-1 text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                      <p>Didn't get OTP?</p>
                      <p className="text-primary underline cursor-pointer" onClick={resendOtp }>
                        Resend OTP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
