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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeMessage, setVerificationCodeMessage] = useState("");

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
  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (getEmail) {
      setEmail(getEmail);
    }
  }, []);

  const verify = async () => {
    if (verificationCode.length == 0) {
      setVerificationCodeMessage("Verification Code is required!");
    } else {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post(
          "/auth/complete_email_verification",
          {
            email: email,
            verification_code: verificationCode,
          }
        );

        if (result.data.code === 200) {
          setIsLoading(false);
          toast("Verification Successful!");
          router.push("/signin");

          console.log(result);
        } else {
          // setErrorMessage(result.data.message)
          toast.error(result.data.data);
          setIsLoading(false);
        }
      } catch (err: any) {
        setIsLoading(false);
        console.log("login error", err);
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
                  <p className="h5 font-semibold mb-2 text-center">
                    Verify Your Account
                  </p>

                  <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                    A verification code has been sent to your email!
                  </p>
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signin-email"
                        className="form-label text-default"
                      >
                        Verification Code
                      </label>
                      <input
                        type="text"
                        name="verify"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="verify"
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setVerificationCodeMessage("");
                          }
                        }}
                        value={verificationCode}
                      />
                      <p className="text-danger pt-2">
                        {verificationCodeMessage}
                      </p>
                    </div>

                    <ToastContainer theme="light"></ToastContainer>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      {/* <Link  href="" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                      <button
                        type="button"
                        onClick={verify}
                        className="btn-primary  !font-medium shadow"
                        disabled={isLoading}
                      >
                        {isLoading ? "Verifying..." : "Verify"}
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

export default Verification;
