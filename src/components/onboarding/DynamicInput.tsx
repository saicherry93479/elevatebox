import React, { useEffect, useState } from "react";
import useInput from "./useInput";

const DynamicInput = ({
  label,
  type,
  placeholder,
  validator,
  name,
  onInputChange,
  suffix,
  prefix,
  ...props
}: any) => {
  const { value, onChange, onBlur, error, isTouched } = useInput("", validator);

  const [isFocused, setIsFocused] = useState(false);
  console.log("here ", suffix);

  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-[#6C6969] dark:text-white"
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className={`flex items-center border rounded-lg  bg-gray-50  ${
          isFocused ? "border-gray-900" : "border-gray-300"
        } group group-focus-within:border-gray-900 ${
          isTouched && error ? "border-red-500" : ""
        }`}
      >
        {prefix && <div className="bg-gray-50 ">{prefix()}</div>}
        <input
          className={` bg-gray-50  text-black text-sm rounded-lg border-none block w-full p-2.5 outline-none `}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {suffix && <div className="bg-gray-50 ">{suffix()}</div>}
      </div>
      {isTouched && error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
};

export default DynamicInput;
