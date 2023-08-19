import AccountInformationForm from "./account-information-form"
import BusinessInformationForm from "./business-information-form"
import PersonalInformationForm from "./personal-information-form"
import TermsConditionForm from "./terms-condition-form"
import { LuUser, LuBriefcase, LuCreditCard, LuHelpCircle } from "react-icons/lu"

export const accordianData = [
  {
    value: "1",
    label: "Personal Information",
    description: "Detailed information about you ",
    Form: PersonalInformationForm,
    Icon: (value: boolean | any) => (
      <LuUser className={`text-[24px]  group-hover:text-[#23AAE1] ${value ? "text-[#23AAE1]" : "text-[#777777]"}`} />
    ),
    // Icon: () => (
    //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z"
    //       fill="#23AAE1"
    //     />
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
    //       fill="#23AAE1"
    //     />
    //   </svg>
    // ),
  },
  {
    value: "2",
    label: "Business Information",
    description: "Details about your business ",
    Form: BusinessInformationForm,
    Icon: (value: boolean | any) => (
      <LuBriefcase
        className={`text-[24px]  group-hover:text-[#23AAE1] ${value ? "text-[#23AAE1]" : "text-[#777777]"}`}
      />
    ),
    // Icon: () => (
    //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M4 8C3.44772 8 3 8.44772 3 9V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V9C21 8.44772 20.5523 8 20 8H4ZM1 9C1 7.34315 2.34315 6 4 6H20C21.6569 6 23 7.34315 23 9V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V9Z"
    //       fill="#777777"
    //     />
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M7.87868 2.87868C8.44129 2.31607 9.20435 2 10 2H14C14.7956 2 15.5587 2.31607 16.1213 2.87868C16.6839 3.44129 17 4.20435 17 5V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V5C7 4.20435 7.31607 3.44129 7.87868 2.87868Z"
    //       fill="#777777"
    //     />
    //   </svg>
    // ),
  },
  {
    value: "3",
    label: "Account Information",
    description: "Bank details",
    Form: AccountInformationForm,
    Icon: (value: boolean | any) => (
      <LuCreditCard
        className={`text-[24px]  group-hover:text-[#23AAE1] ${value ? "text-[#23AAE1]" : "text-[#777777]"}`}
      />
    ),
    // Icon: () => (
    //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M3 5C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V6C22 5.44772 21.5523 5 21 5H3ZM0 6C0 4.34315 1.34315 3 3 3H21C22.6569 3 24 4.34315 24 6V18C24 19.6569 22.6569 21 21 21H3C1.34315 21 0 19.6569 0 18V6Z"
    //       fill="#777777"
    //     />
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M0 10C0 9.44772 0.447715 9 1 9H23C23.5523 9 24 9.44772 24 10C24 10.5523 23.5523 11 23 11H1C0.447715 11 0 10.5523 0 10Z"
    //       fill="#777777"
    //     />
    //   </svg>
    // ),
  },

  {
    value: "4",
    label: "Teams and Condition",
    description: "Accept our conditions",
    Form: TermsConditionForm,
    Icon: (value: boolean | any) => (
      <LuHelpCircle
        className={`text-[24px]  group-hover:text-[#23AAE1] ${value ? "text-[#23AAE1]" : "text-[#777777]"}`}
      />
    ),
    // Icon: () => (
    //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
    //       fill="#777777"
    //     />
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M12.2582 8.02391C11.7927 7.94406 11.314 8.03154 10.9068 8.27086C10.4996 8.51018 10.1902 8.88588 10.0335 9.33144C9.85018 9.85243 9.27926 10.1262 8.75827 9.94293C8.23728 9.75966 7.96351 9.18874 8.14678 8.66775C8.46025 7.77664 9.07898 7.02523 9.89339 6.5466C10.7078 6.06796 11.6653 5.893 12.5964 6.0527C13.5274 6.2124 14.3719 6.69645 14.9802 7.41912C15.5884 8.14165 15.9214 9.05607 15.9201 10.0005C15.9197 11.5309 14.7851 12.5415 13.9748 13.0816C13.5392 13.3721 13.1107 13.5856 12.795 13.7259C12.6358 13.7967 12.5016 13.8504 12.405 13.8872C12.3566 13.9056 12.3174 13.9199 12.2888 13.9301L12.2541 13.9423L12.243 13.946L12.2391 13.9473L12.2376 13.9479C12.2373 13.948 12.2363 13.9483 11.9201 12.9996L12.2363 13.9483C11.7124 14.1229 11.1461 13.8398 10.9714 13.3158C10.7969 12.7922 11.0796 12.2263 11.6028 12.0513L11.6016 12.0517C11.6017 12.0517 11.6018 12.0516 11.6028 12.0513L11.6188 12.0457C11.6342 12.0402 11.6594 12.031 11.693 12.0182C11.7605 11.9925 11.8607 11.9525 11.9827 11.8983C12.2296 11.7886 12.551 11.6271 12.8654 11.4175C13.555 10.9578 13.9201 10.4687 13.9201 9.9996L13.9201 9.99811C13.9208 9.52579 13.7543 9.06846 13.4502 8.70712C13.146 8.34579 12.7238 8.10376 12.2582 8.02391Z"
    //       fill="#777777"
    //     />
    //     <path
    //       fill-rule="evenodd"
    //       clip-rule="evenodd"
    //       d="M11 17C11 16.4477 11.4477 16 12 16H12.01C12.5623 16 13.01 16.4477 13.01 17C13.01 17.5523 12.5623 18 12.01 18H12C11.4477 18 11 17.5523 11 17Z"
    //       fill="#777777"
    //     />
    //   </svg>
    // ),
  },
]

export const AccordionProps = typeof accordianData
