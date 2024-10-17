import { Earningsreport } from "@/shared/data/dashboards/coursedata";
import {
  Countries,
  Earning,
  ProductsOverview,
  Recentorders,
} from "@/shared/data/dashboards/ecommercedata";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useEffect, useState , useRef} from "react";
import { axiosInstance } from "../../config/index";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Automation = () => {
  const [cookies] = useCookies(["user"]);
  // for User search function
  const [data, setData] = useState([]);
  const [singleUser, setSingleUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bvn, setBvn] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [setPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("")
  const [errorMessage,setErrorMesage] = useState("")
  const [errCheck, setErrorCheck] = useState(false)
  const [sortedData, setSortedData] = useState(data); 
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const searchInputRef = useRef<HTMLInputElement | null>(null); 
  const userdata: any = [];
  const [currentPinInput, setCurrentPinInput] = useState("")
  const [newPinInput, setNewPinInput] = useState("")
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [automationPin, setAutomationPin] = useState("");
  
  

  interface User {
    first_name: string;
    last_name: string;
    phone_number: string;
    transaction_pin: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    bvn: string;
    email: string;
    username: string;
    other_name: string;

    // add other properties as needed
  }

  const getHeader = () => {
    const token = cookies.user?.user.token;
    console.log("token", token);
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
const user_id = cookies.user?.user?.id;
  

  const myfunction = (idx: string) => {
    let Data;
    for (Data of ProductsOverview) {
      if (Data.name[0] == " ") {
        Data.name = Data.name.trim();
      }
      if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
        if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
          userdata.push(Data);
        }
      }
    }
    setData(userdata);
  };

  const getUsers = async () => {
    try {
      const result = await axiosInstance.get("users", getHeader());

      if (result.data.code === 200) {
        console.log("checking data", result?.data?.data);
        setData(result?.data?.data);
        setSortedData(result?.data?.data);
        setAutomationPin(result?.data.data[0].transaction_pin)
       
       
       
        console.log(result);
      } else {
        console.log(result.data.message);
      }
    } catch (err: any) {
      console.log("login error", err);
    }
  };

  const getAutomationPlans = async () => {
    try {
      const result = await axiosInstance.get(`automation_plans/get_automation_plans?user_id=${user_id }&pin=${automationPin}&automation_slug=autosync`, getHeader());

      if (result.data.code === 200) {
        console.log("checking data", result?.data?.data);
        setData(result?.data?.data);
        setSortedData(result?.data?.data);

        console.log(result);
      } else {
        console.log(result.data.message);
      }
    } catch (err: any) {
      console.log("login error", err);
    }
  };

  useEffect(() => {
    getUsers();
   
  }, []);

  useEffect(() => {
    
        getAutomationPlans();
   

   
  }, []);


  const getSingleUser = async (userId: any) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`users/${userId}`, getHeader());
      const { data } = response.data;
      setSingleUser(data);
      setUserId(data.id);
      setBankName(data.bank_name);
      setAccountName(data.account_name);
      setAccountNumber(data.account_number);
      setBvn(data.bvn);
      setLoading(false);

      console.log("single user", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      setLoading(false);

      return { transactions: [] };
    }
  };

  const updateAccount = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `users/update_bank_details/${userId}`,
        {
          bank_name: bankName,
          account_name: accountName,
          account_number: accountNumber,
          bvn: bvn,
        },
        getHeader()
      );

      if (response.data.code === 200) {
        toast(response.data.message);
        
        setIsLoading(false);

        console.log(response);
      } else {
        
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      setLoading(false);

      return { transactions: [] };
    }
  };
  const closeMOdal = async () => {
   
    setIsModalOpen(false);
  };


  const updateUser = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `users/${userId}`,
        {
          first_name: firstName,
          last_name: lastName,
          other_names: otherName
         
        },
        getHeader()
      );

      if (response.data.code === 200) {
        toast(response.data.message);
        
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setOtherName("")

       
      } 
      else if (response.data.code === 403) {
        toast(response.data.message);
        
        setIsLoading(false);


      }
      
      else {
       
        setIsLoading(false);
        toast.error(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      setLoading(false);

      return { transactions: [] };
    }
  };
  const updatePin = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `users/update_pin/${userId}`,
        {
          current_pin: setPin,
          new_pin: newPin,
          confirm_new_pin:confirmPin
         
        },
        getHeader()
      );

      if ( newPin !== confirmPin){
        setErrorMesage("Pin do not match!")
        setErrorCheck(true)
        setIsLoading(false);

        
      } else{
        if (response.data.code === 200) {
            toast(response.data.message);
            
            setIsLoading(false);
            setCurrentPinInput("");
            setConfirmPinInput("");
            setNewPinInput("")
           
    
            console.log(response);
          } 
          else if (response.data.code === 403) {
            toast(response.data.message);
            
            setIsLoading(false);
    
    
          }
          
          else {
           
            setIsLoading(false);
            toast.error(response.data.data);
          }

      }

     
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      setLoading(false);

      return { transactions: [] };
    }
  };
 
  const handleSort= (order: any) => {
    const sortedData = [...data].sort((a: any, b: any) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
  
      if (order === "asc") {
        return dateA - dateB; // Compare numeric timestamps
      } else {
        return dateB - dateA;
      }
    });
  
    setData(sortedData); 
    setSortOrder(order);// Assuming you're using useState for Data
  };
  const filterUsers = () => {
    const term = searchInputRef.current?.value.toLowerCase() || "";
    const filteredData = data.filter((user:any) =>
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
    setSortedData(filteredData);
  };
  

  return (
    <Fragment>
      <Seo title={"Automation"} />
      <Pageheader
        currentpage="Automation"
        activepage="Dashboards"
        mainpage="Automation"
      />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box">
            <div className="box-header justify-between">
              <div className="box-title">Automation Plan</div>
              <div className="flex flex-wrap gap-2">
                <div>
                  <input
                    className="ti-form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    ref={searchInputRef}
                    onKeyUp={filterUsers}
                    
                    aria-label=".form-control-sm example"
                  />
                </div>
                <div className="hs-dropdown ti-dropdown">
                  <Link
                    href="#!"
                    className="ti-btn bg-primary text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                    aria-expanded="false"
                  >
                    Sort By
                    <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                  </Link>
                  <ul
                    className="hs-dropdown-menu ti-dropdown-menu hidden"
                    role="menu"
                  >
                   
                  
                    <li>
                      <h5
                        className="ti-dropdown-item cursor-pointer !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        onClick={() => handleSort("asc")}
                        
                      
                      >
                        Ascending
                      </h5>
                    </li> 
                    <li>
                      <h5
                        className="ti-dropdown-item cursor-pointer !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        onClick={() => handleSort("desc")}
                        
                      
                      >
                        Descending
                      </h5>
                    </li> 
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="overflow-x-auto">
                <table className="table min-w-full whitespace-nowrap table-hover border table-bordered">
                  <thead>
                    <tr className="border border-inherit border-solid  dark:border-defaultborder/10 ">
                      <th scope="col" className="!text-start">
                        Firstname
                      </th>
                      <th scope="col" className="!text-start">
                        Lastname
                      </th>
                      <th scope="col" className="!text-start">
                        Email
                      </th>
                      <th scope="col" className="!text-start">
                        Username
                      </th>
                      <th scope="col" className="!text-start">
                        Role
                      </th>
                      <th scope="col" className="!text-start">
                        Action
                      </th>
                    </tr>
                  </thead>
                 
                 
                  {data.length === 0 ? (
  <tbody>
    <tr>
      <td colSpan={100}>
        <div className="flex justify-center">
          <p className="text-center pt-3">No Data Available</p>
        </div>
      </td>
    </tr>
  </tbody>
) : (
  <>
    {sortedData.map((idx: any, index) => (
      <tbody key={index}>
        <tr className="border-y border-inherit border-solid dark:border-defaultborder/10">
          <td>
            <div className="flex items-center">
              <div className="text-sm">{idx.first_name}</div>
            </div>
          </td>
          <td>
            <span className="font-semibold">{idx.last_name}</span>
          </td>
          <td>{idx.email}</td>
          <td>
            <span className="font-semibold">{idx.username}</span>
          </td>
          <td>
            <span className="">{idx.role.role_name}</span>
          </td>
        

          <td>
            <span
              className="text-[#E9B049] cursor-pointer"
              data-hs-overlay="#single-user-modal"
              onClick={() => getSingleUser(idx.id)}
            >
              View User
            </span>
            &nbsp; &nbsp;
            <span
              className="text-primary cursor-pointer"
              data-hs-overlay="#update-user-modal"
              onClick={() => getSingleUser(idx.id)}
            >
              Update User
            </span>
            <br />
            <span className="text-[#23B7E5] cursor-pointer" data-hs-overlay="#update-pin-modal"  onClick={() => getSingleUser(idx.id)}>Update Pin</span>
            &nbsp; &nbsp;{" "}
            <span
              className="text-[#111C43] cursor-pointer"
              data-hs-overlay="#update-bank-modal"
              onClick={() => getSingleUser(idx.id)}
            >
              Update Bank
            </span>
          </td>
        </tr>
      </tbody>
    ))}
  </>
)}

                 
                </table>
              </div>
              <ToastContainer theme="light"></ToastContainer>
            </div>
          

            <div id="single-user-modal" className="hs-overlay hidden ti-modal">
              <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                <div className="ti-modal-content">
                  <div className="ti-modal-header">
                    <h6
                      className="modal-title text-[1rem] font-semibold"
                      id="mail-ComposeLabel"
                    >
                      User Details
                    </h6>
                    <button
                      type="button"
                      className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                      data-hs-overlay="#single-user-modal"
                    >
                      <span className="sr-only">Close</span>
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                  <div className="ti-modal-body px-4">
                    {loading ? (
                      <div className="flex items-center justify-center ">
                        <div
                          className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent "
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg">
                          <span className="font-semibold">Fullname:</span>{" "}
                          &nbsp;
                          <span>
                            {singleUser?.first_name} &nbsp;
                            {singleUser?.last_name}
                          </span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">Email:</span> &nbsp;
                          <span>{singleUser?.email}</span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">Phone Number:</span>{" "}
                          &nbsp;<span>{singleUser?.phone_number}</span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">Bank Name:</span>{" "}
                          &nbsp;<span>{singleUser?.bank_name}</span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">Account Number:</span>{" "}
                          &nbsp;<span>{singleUser?.account_number}</span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">Account Name:</span>{" "}
                          &nbsp;<span>{singleUser?.account_name}</span>
                        </div>
                        <div className="text-lg">
                          <span className="font-semibold">BVN:</span> &nbsp;
                          <span>{singleUser?.bvn}</span>
                        </div>
                        {/* <div className="text-lg">
                          <span className="font-semibold">
                            Transaction Pin:
                          </span>{" "}
                          &nbsp;<span>{singleUser?.transaction_pin}</span>
                        </div> */}
                      </div>
                    )}
                  </div>
                  <div className="ti-modal-footer">
                    <button
                      type="button"
                      className="ti-btn bg-primary text-white !font-medium"
                      data-hs-overlay="#single-user-modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="update-bank-modal" className="hs-overlay hidden ti-modal">
              <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                <div className="ti-modal-content">
                  <div className="ti-modal-header">
                    <h6
                      className="modal-title text-[1rem] font-semibold"
                      id="mail-ComposeLabel"
                    >
                      Update Bank Details
                    </h6>
                    <button
                      type="button"
                      className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                      data-hs-overlay="#update-bank-modal"
                    >
                      <span className="sr-only">Close</span>
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                  <div className="ti-modal-body px-4">
                    {loading ? (
                      <div className="flex items-center justify-center ">
                        <div
                          className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent "
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-y-4">
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Bank Name
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="email"
                            onChange={(e) => {
                              setBankName(e.target.value);
                            }}
                            defaultValue={singleUser?.bank_name}
                          />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Account Name
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="email"
                            onChange={(e) => {
                              setAccountName(e.target.value);
                            }}
                            defaultValue={singleUser?.account_name}
                          />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Account Number
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="email"
                            onChange={(e) => {
                              setAccountNumber(e.target.value);
                            }}
                            defaultValue={singleUser?.account_number}
                          />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            BVN
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="email"
                            onChange={(e) => {
                              setBvn(e.target.value);
                            }}
                            defaultValue={singleUser?.bvn}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ti-modal-footer">
                    {/* <button type="button" className="ti-btn bg-primary text-white !font-medium" data-hs-overlay="#update-bank-modal">Close</button> */}
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      {/* <Link  href="" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                      <div className="flex space-x-4">
                      <button
                        type="button"
                       
                        data-hs-overlay="#update-bank-modal"
                        className="ti-btn ti-btn-primary !bg-[#E9B049] !text-white !font-medium shadow"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={updateAccount}
                        className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium shadow"
                      >
                        {isLoading ? (
                          <div className="text-center">
                            <div className="ti-spinner" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>

                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="update-user-modal" className="hs-overlay hidden ti-modal">
              <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                <div className="ti-modal-content">
                  <div className="ti-modal-header">
                    <h6
                      className="modal-title text-[1rem] font-semibold"
                      id="mail-ComposeLabel"
                    >
                      Update User Details
                    </h6>
                    <button
                      type="button"
                      className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                      data-hs-overlay="#update-user-modal"
                    >
                      <span className="sr-only">Close</span>
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                  <div className="ti-modal-body px-4">
                    {loading ? (
                      <div className="flex items-center justify-center ">
                        <div
                          className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent "
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-y-4">
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="first-name"
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          value={firstName}
                          />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="last-name"
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                           value={lastName}
                          />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                          <label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Other Name
                          </label>
                          <input
                            type="text"
                            name="other-name"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="otherMail"
                            onChange={(e) => {
                              setOtherName(e.target.value);
                            }}
                           value={otherName}
                          />
                        </div>
                        
                        
                       
                      </div>
                    )}
                  </div>
                  <div className="ti-modal-footer">
                   
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      
                      <div className="flex space-x-4">
                      <button
                        type="button"
                       
                        data-hs-overlay="#update-user-modal"
                        className="ti-btn ti-btn-primary !bg-[#E9B049] !text-white !font-medium shadow"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={updateUser}
                        className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium shadow"
                      >
                        {isLoading ? (
                          <div className="text-center">
                            <div className="ti-spinner" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>

                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
                 <div id="update-pin-modal" className="hs-overlay hidden ti-modal">
                    
                 <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                   <div className="ti-modal-content">
                     <div className="ti-modal-header">
                       <h6
                         className="modal-title text-[1rem] font-semibold"
                         id="mail-ComposeLabel"
                       >
                         Update Pin
                       </h6>
                       <button
                         type="button"
                         className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                         data-hs-overlay="#update-pin-modal"
                       >
                         <span className="sr-only">Close</span>
                         <i className="ri-close-line"></i>
                       </button>
                     </div>
                     <div className="ti-modal-body px-4">
                       {loading ? (
                         <div className="flex items-center justify-center ">
                           <div
                             className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent "
                             role="status"
                             aria-label="loading"
                           >
                             <span className="sr-only">Loading...</span>
                           </div>
                         </div>
                       ) : (
                         <div className="grid grid-cols-12 gap-y-4">
                           <div className="xl:col-span-12 col-span-12">
                             <label
                               htmlFor="signin-email"
                               className="form-label text-default"
                             >
                               Current Pin
                             </label>
                             <input
                               type="text"
                               name="firstName"
                               className="form-control form-control-lg w-full !rounded-md"
                               id="first-name"
                               onChange={(e) => {
                                 setCurrentPin(e.target.value);
                                 setCurrentPinInput(e.target.value)
                               }}
                               value={currentPinInput}
                             />
                           </div>
                           <div className="xl:col-span-12 col-span-12">
                             <label
                               htmlFor="signin-email"
                               className="form-label text-default"
                             >
                              New Pin
                             </label>
                             <input
                               type="text"
                               name="lastName"
                               className="form-control form-control-lg w-full !rounded-md"
                               id="last-name"
                               onChange={(e) => {
                                 setNewPin(e.target.value);
                                 setNewPinInput(e.target.value)
                                 if (e.target.value.length > 0) {
                                   setErrorMesage("");
                               }
                               }}
                               value={newPinInput}
                             />
                           </div>
                           <div className="xl:col-span-12 col-span-12">
                             <label
                               htmlFor="signin-email"
                               className="form-label text-default"
                             >
                               Confirm Pin
                             </label>
                             <input
                               type="text"
                               name="other-name"
                               className="form-control form-control-lg w-full !rounded-md"
                               id="otherMail"
                               onChange={(e) => {
                                 setConfirmPin(e.target.value);
                                 setConfirmPinInput(e.target.value)
                                 if (e.target.value.length > 0) {
                                   setErrorMesage("");
                               }
                               }}
                               value={confirmPinInput}
                             />
                               <p className="text-danger pt-2">{errorMessage}</p>
                           </div>
                           
                          
                           
                         
                           
                          
                         </div>
                       )}
                     </div>
                     <div className="ti-modal-footer">
                      
                       <div className="xl:col-span-12 col-span-12 grid mt-2">
                         
                         <div className="flex space-x-4">
                         <button
                           type="button"
                          
                           data-hs-overlay="#update-pin-modal"
                           className="ti-btn ti-btn-primary !bg-[#E9B049] !text-white !font-medium shadow"
                         >
                           Close
                         </button>
                         <button
                           type="button"
                           onClick={updatePin}
                           className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium shadow"
                         >
                           {isLoading ? (
                             <div className="text-center">
                               <div className="ti-spinner" role="status">
                                 <span className="sr-only">Loading...</span>
                               </div>
                             </div>
                           ) : (
                             "Update"
                           )}
                         </button>
   
                         </div>
                         
                       </div>
                     </div>
                   </div>
                 </div>
                
               </div>
               


           
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Automation.layout = "Contentlayout";

export default Automation;
