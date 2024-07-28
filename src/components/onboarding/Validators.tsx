// validators.js
export const firstNameValidator = (value: string) => {
  if (!value) return "First Name is required";
  if (value.length < 3) return "First Name should be at least 3 characters";
};

export const lastNameValidator = (value: string) => {
  if (!value) return "Last Name is required";
  if (value.length < 3) return "Last Name should be at least 3 characters";
};

export const emailValidator = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return "Email is required";
  if (!emailRegex.test(value)) return "Invalid email format";
  return "";
};

export const passwordValidator = (value: string | any[]) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters long";
  return "";
};

export const requiredValidator = (value: any) => {
  if (!value) return "This field is required";
  return "";
};

export const SKILLS_SELECT = ["Python", "Javascript"];

export const HEAR_SELECT = ["Web", "Linkedin"];
export const SCHOOL_SELECT = ["SASTRA UNIVERSITY", "NIT TRICHY"];
export const COMPANY_SELECT = ["SASTRA UNIVERSITY", "NIT TRICHY"];
export const LOCATION_SELECT = ["Hyderabad", "Chennai"];
export const LOCATION_TITLE_SELECT = [];
export const EXPEREINCE_TYPE_SELECT = [];
export const MONTH_SELECT = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YEAR_SELECT = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "1998",
];

export const ETHINICITY_SELECT = ["ASIAN", "AMERICAN", "EUROPEAN"];
