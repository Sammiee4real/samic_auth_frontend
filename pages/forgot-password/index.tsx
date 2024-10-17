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
import { toast ,  ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ForgotPassword = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const dispatch = useAppDispatch();

  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
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

  const forgotPasswordHandler = async () => {
    if (email.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("");
    } else {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post("/auth/forgot_password", {
          email: email,
         
        });
       
       if(result.data.code === 200){
        const userData = {
          user: { ...result.data.data },
        };
        setCookie("user", JSON.stringify(userData), userCookieConfig);
      
        setIsLoading(false);
        toast(result.data.message)
        router.push("/reset-password");
        setErrorCheck(false)
        console.log(result);
       } else{
        setErrorCheck(true)
        toast.error(result.data.data)
        setIsLoading(false);
       }
      } catch (err: any) {
        setIsLoading(false);
        console.log("login error",err);
      }
    }
  };

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
                  <p className="h5 font-semibold mb-2 text-center">Forgot Password?</p>
                 
                 

                  <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                  Don't worry we can help. A code will be sent to your registered email for verification. 
                  </p>
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signin-email"
                        className="form-label text-default"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="email"
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
                    <ToastContainer theme="light"></ToastContainer>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      {/* <Link  href="" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                      <button
                          type="button"
                          onClick={forgotPasswordHandler}
                          className="btn-primary !font-medium shadow"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Send Code"}
                        </button>
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

export default ForgotPassword;
