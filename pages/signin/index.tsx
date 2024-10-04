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
import { toast } from "react-toastify";

const Firebaselogin = () => {
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

  const loginHandler = async () => {
    if (email.length == 0 && password.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("Password field is required");
    } else if (email.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("");
    } else if (password.length == 0) {
      setEmailMessage("");
      setPasswordMessage("Password field is required");
    } else {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post("/auth/login", {
          email: email,
          password: password,
        });
       
       if(result.data.code === 200){
        const userData = {
          user: { ...result.data.data },
        };
        setCookie("user", JSON.stringify(userData), userCookieConfig);
        dispatch(updateUser(result?.data?.data));
        setIsLoading(false);
        router.push("/dashboards/crm");
        setErrorCheck(false)
        console.log(result);
       } else{
        setErrorCheck(true)
        setErrorMessage(result.data.message)
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
                  <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                  {
                    errorCheck ? 
                    (<div
                    className="p-4 mb-4 bg-danger/40 text-sm  border-t-4 border-danger text-danger/60 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <p>{errorMessage}</p>
                  </div>) : null
                  }
                 

                  <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                    Welcome back!
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
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <label
                        htmlFor="signin-password"
                        className="form-label text-default block"
                      >
                        Password
                        <Link
                          href="/components/authentication/reset-password/reset-basic/"
                          className="float-right text-danger"
                        >
                          Forget password ?
                        </Link>
                      </label>
                      <div className="input-group">
                        <input
                          name="password"
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
                          id="signin-password"
                          placeholder="password"
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
                      <div className="mt-2">
                        <div className="form-check !ps-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      {/* <Link  href="" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                      {isLoading ? (
                        <div className="text-center">
                          <div className="ti-spinner" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={loginHandler}
                          className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium shadow"
                        >
                          Sign In
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                      Dont have an account?{" "}
                      <Link href="/signup" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
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

export default Firebaselogin;
