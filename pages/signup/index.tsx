import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useEffect as ReactUseEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../config/index";
import { useRouter } from "next/router";

const Signup = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [uplineEmail, setUplineEmail] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [fullNameMessage, setFullNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [uplineEmailMessage, setUplineEmailMessage] = useState("");
  const [transactionPinMessage, setTransactionPinMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();

  ReactUseEffect(() => {
    import("preline");
  }, []);

  const signUpHandler = async () => {
    if (fullName.length == 0) {
      setFullNameMessage("Full Name field is required!");
    } else if (email.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("");
    } else if (userName.length == 0) {
      setUserNameMessage("Username field is required!");
    } else if (phoneNumber.length == 0) {
      setPhoneNumberMessage("Phone Number field is required!");
    } else if (transactionPin.length == 0) {
      setTransactionPinMessage("Transaction Pin field is required!");
    } else if (email.length == 0 && password.length == 0) {
      setEmailMessage("Email field is required");
      setPasswordMessage("Password field is required");
    } else if (password.length == 0) {
      setEmailMessage("");
      setPasswordMessage("Password field is required");
    } else if (confrimPassword.length == 0) {
      setConfirmPasswordMessage("Confirm password field is required!");
    } else if (password !== confrimPassword) {
      setConfirmPasswordMessage("Password does not match!");
    } else if (uplineEmail.length == 0) {
      setUplineEmailMessage("Upline Email is required!");
    } else {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post("/auth/signup", {
          full_name: fullName,
          username: userName,
          phone_number: phoneNumber,
          transaction_pin: transactionPin,
          email: email,
          password: password,
          confirm_password: confrimPassword,
          upline_email: uplineEmail,
        });

        if (result.data.code === 200) {
          setIsLoading(false);
          localStorage.setItem("email", email);

          router.push("/verify-email");

          console.log(result);
        } else {
          // setErrorMessage(result.data.message)
          toast.error(result.data.data);
          setIsLoading(false);
        }
      } catch (err: any) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <Seo title={"Signup-basic"} />
      <div className="container">
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box">
                <div className="box-body !p-[3rem]">
                  <div className="flex justify-center">
                    <img
                      alt=""
                      src="https://samicsub.com/l_asset/img/samic-dark.png"
                      className="h-10 w-auto"
                    />
                  </div>
                  <p className="h5 font-semibold mb-2 text-center">Sign Up</p>
                  <p className="mb-4 text-primary opacity-[0.7] font-normal text-center">
                    Welcome &amp; Join us by creating a free account !
                  </p>
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-firstname"
                        className="form-label text-default"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="signup-firstname"
                        placeholder="first name"
                        onChange={(e) => {
                          setFullName(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setFullNameMessage("");
                          }
                        }}
                        value={fullName}
                      />
                      <p className="text-danger pt-2">{fullNameMessage}</p>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-lastname"
                        className="form-label text-default"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="signup-email"
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
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-firstname"
                        className="form-label text-default"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="signup-username"
                        placeholder="Username"
                        onChange={(e) => {
                          setUserName(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setUserNameMessage("");
                          }
                        }}
                        value={userName}
                      />
                      <p className="text-danger pt-2">{userNameMessage}</p>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-phoneNumber"
                        className="form-label text-default"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="signup-phoneNumber"
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setPhoneNumberMessage("");
                          }
                        }}
                        value={phoneNumber}
                      />
                      <p className="text-danger pt-2">{phoneNumberMessage}</p>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-phoneNumber"
                        className="form-label text-default"
                      >
                        Transaction Pin
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="signup-phoneNumber"
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setTransactionPin(e.target.value);
                          // Clear error message if the email field is not empty
                          if (e.target.value.length > 0) {
                            setTransactionPinMessage("");
                          }
                        }}
                        value={transactionPin}
                      />
                      <p className="text-danger pt-2">
                        {transactionPinMessage}
                      </p>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signup-password"
                        className="form-label text-default"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordshow1 ? "text" : "password"}
                          className="form-control form-control-lg !rounded-e-none"
                          id="signup-password"
                          placeholder="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            // Clear error message if the email field is not empty
                            if (e.target.value.length > 0) {
                              setPasswordMessage("");
                            }
                          }}
                          value={password}
                        />

                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          type="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
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
                      <label
                        htmlFor="signup-confirmpassword"
                        className="form-label text-default"
                      >
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordshow2 ? "text" : "password"}
                          className="form-control form-control-lg !rounded-e-none"
                          id="signup-confirmpassword"
                          placeholder="confirm password"
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            // Clear error message if the email field is not empty
                            if (e.target.value.length > 0) {
                              setConfirmPasswordMessage("");
                            }
                          }}
                          value={confrimPassword}
                        />

                        <button
                          aria-label="button"
                          type="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          onClick={() => setpasswordshow2(!passwordshow2)}
                          id="button-addon21"
                        >
                          <i
                            className={`${
                              passwordshow2 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </button>
                      </div>
                      <p className="text-danger pt-2">
                        {confirmPasswordMessage}
                      </p>

                      <div className="xl:col-span-12 col-span-12 pt-3">
                        <label
                          htmlFor="signup-uplineEmail"
                          className="form-label text-default"
                        >
                          Upline Email
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg w-full !rounded-md"
                          id="signup-uplineEmail"
                          placeholder="Upline Email"
                          onChange={(e) => {
                            setUplineEmail(e.target.value);
                            // Clear error message if the email field is not empty
                            if (e.target.value.length > 0) {
                              setUplineEmailMessage("");
                            }
                          }}
                          value={uplineEmail}
                        />
                        <p className="text-danger pt-2">{uplineEmailMessage}</p>
                      </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      <button
                        type="button"
                        onClick={signUpHandler}
                        className="btn-primary  !font-medium shadow"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Create Account"}
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                      Already have an account?{" "}
                      <Link href="/signin" className="text-primary">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer theme="light"></ToastContainer>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
