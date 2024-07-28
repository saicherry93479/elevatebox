import React, { useCallback, useState } from "react";
import DynamicInput from "./DynamicInput";
import { emailValidator, passwordValidator } from "./Validators";

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = useCallback((name: any, value: any, error: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    if (hasErrors) {
      console.log("Form has errors. Please correct them.");
      //   return;
    }

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <DynamicInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        validator={emailValidator}
        name="email"
        onInputChange={handleInputChange}
      />
      <DynamicInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        validator={passwordValidator}
        name="password"
        onInputChange={handleInputChange}
      />
      <button onClick={handleSubmit} type="submit">
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
