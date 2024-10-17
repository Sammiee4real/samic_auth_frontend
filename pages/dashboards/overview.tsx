import {
  Customers,
  Deals,
  Dealsstatistics,
  Earned,
  Ratio,
  Revenue,
  Revenueanalytics,
  Sourcedata,
  Target,
} from "../../features/crmdata";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment } from "react";
import { useCookies } from "react-cookie";
import Datatable from "../../features/transaction-table/data-table";

const Crm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const firstname = cookies.user ? cookies.user.user.username : null;

  return (
    <Fragment>
      <Seo title={"Crm"} />
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">
            Welcome, {firstname} !
          </p>
          <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">
            Track your sales activity, leads and deals here.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-9 xl:col-span-12  col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            {/* <div className="xxl:col-span-4 xl:col-span-4  col-span-12">
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box crm-highlight-card">
                  <div className="box-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[1.125rem] text-white mb-2">Your target is incomplete</div>
                        <span className="block text-[0.75rem] text-white"><span className="opacity-[0.7] me-1">You have
                          completed</span>
                          <span className="font-semibold text-warning">48%</span> <span className="opacity-[0.7]">of the given
                            target, you can also check your status</span>.</span>
                        <span className="block font-semibold mt-[0.125rem]"><Link className="text-white text-[0.813rem]"
                          href="#!"><u>Click
                            here</u></Link></span>
                      </div>
                      <div>
                        <div id="crm-main">
                          <Target />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-header flex justify-between">
                    <div className="box-title">
                      Top Deals
                    </div>
                    <div className="hs-dropdown ti-dropdown">
                      <Link aria-label="anchor" href="#!"
                        className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                        aria-expanded="false">
                        <i className="fe fe-more-vertical text-[0.8rem]"></i>
                      </Link>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Week</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Month</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Year</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-body">
                    <ul className="list-none crm-top-deals mb-0">
                      <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                          <div className="me-2">
                            <span className=" inline-flex items-center justify-center">
                              <img src="../../../assets/images/faces/10.jpg" alt=""
                                className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" />
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Michael Jordan
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">michael.jordan@example.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$2,893</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                              EK
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Emigo Kiaren</p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">emigo.kiaren@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$4,289</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span className="inline-flex items-center justify-center">
                              <img src="../../../assets/images/faces/12.jpg" alt=""
                                className="!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" />
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Randy Origoan
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">randy.origoan@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$6,347</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold">
                              GP
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">George Pieterson
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">george.pieterson@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$3,894</div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold">
                              KA
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Kiara Advain</p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">kiaraadvain214@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$2,679</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-header justify-between">
                    <div className="box-title">Profit Earned</div>
                    <div className="hs-dropdown ti-dropdown">
                      <Link href="#!" className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                        aria-expanded="false">
                        View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                      </Link>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Today</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">This Week</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Last Week</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-body !py-0 !ps-0">
                    <div id="crm-profits-earned">
                      <Earned />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="xxl:col-span-12  xl:col-span-12  col-span-12">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary">
                            <i className="ti ti-users text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Plan
                              </p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">
                                Basic Plan
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            {/* <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">+40%</p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Total Transactions
                              </p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">
                                ₦56,562
                              </h4>
                            </div>
                          </div>
                          {/* <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-secondary text-[0.813rem]" href="#!">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">+25%</p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-warning">
                            <i className="ti ti-briefcase text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Wallet Balance
                              </p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">
                                ₦2,543
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Datatable />
    </Fragment>
  );
};

Crm.layout = "Contentlayout";
export default Crm;
