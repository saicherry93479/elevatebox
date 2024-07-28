import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  COMPANY_SELECT,
  emailValidator,
  ETHINICITY_SELECT,
  EXPEREINCE_TYPE_SELECT,
  firstNameValidator,
  HEAR_SELECT,
  lastNameValidator,
  LOCATION_SELECT,
  LOCATION_TITLE_SELECT,
  MONTH_SELECT,
  SCHOOL_SELECT,
  YEAR_SELECT,
} from "./Validators";
import DynamicInput from "./DynamicInput";

const STEPS = [
  "Roles",
  "Education",
  "Experience",
  "Skills",
  "EEO",
  "Personal",
  "Links",
];

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(6);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback(
    (name: string, value: string, error: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (name: string, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const canProceed = useCallback(() => {
    const currentStepFields = Object.keys(formData).filter((key) =>
      STEPS[currentStep].toLowerCase().includes(key.toLowerCase())
    );
    return currentStepFields.every((field) => !formErrors[field]);
  }, [currentStep, formData, formErrors]);

  const renderStepContent = useMemo(
    () => (step: number) => {
      const commonProps = {
        formData,
        handleInputChange,
        handleSelectChange,
      };

      switch (step) {
        case 0:
          return <RolesStep {...commonProps} />;
        case 1:
          return <EducationStep {...commonProps} />;
        case 2:
          return <ExperienceStep {...commonProps} />;
        case 3:
          return <SkillsStep {...commonProps} />;
        case 4:
          return <EEOStep {...commonProps} />;
        case 5:
          return <PersonalStep {...commonProps} />;
        case 6:
          return <LinksStep {...commonProps} />;
        default:
          return <div>Step content not implemented</div>;
      }
    },
    [formData, handleInputChange, handleSelectChange]
  );

  return (
    <div className="w-full mx-auto px-6  bg-white rounded-md shadow-md">
      <div className="sticky top-0 bg-white py-4">
        <StepIndicator currentStep={currentStep} />
        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
      </div>

      <div className="md:px-12 py-8">
        {renderStepContent(currentStep)}
        <NavigationButtons
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          canProceed={canProceed()}
          totalSteps={STEPS.length}
        />
      </div>
    </div>
  );
};

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <>
    <div className="hidden md:flex justify-between w-full mb-2">
      {STEPS.map((step, index) => (
        <div
          key={step}
          className={`text-center ${
            index <= currentStep ? "text-black" : "text-black/50"
          } ${index === currentStep ? "font-bold" : ""}`}
        >
          {step}
        </div>
      ))}
    </div>
    <div className="flex md:hidden justify-between w-full mb-2">
      <div className="text-black font-bold">{STEPS[currentStep]}</div>
      <div className="text-black">
        {currentStep + 1}/{STEPS.length}
      </div>
    </div>
  </>
);

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => (
  <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
    <div
      className="bg-[#013186] h-full transition-all duration-300 ease-in-out origin-left"
      style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
    />
  </div>
);

const NavigationButtons: React.FC<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  canProceed: boolean;
  totalSteps: number;
}> = ({ currentStep, setCurrentStep, canProceed, totalSteps }) => (
  <div className="mt-6 flex justify-between items-center">
    {currentStep > 0 && (
      <button
        onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
        className="px-4 py-2 bg-gray-300 rounded "
      >
        Previous
      </button>
    )}
    <button
      onClick={() =>
        setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))
      }
      disabled={!canProceed}
      className={`px-4 py-2 bg-black text-white rounded disabled:opacity-50 mt-4 ${
        currentStep === 0 ? "mx-auto" : ""
      }`}
    >
      {currentStep === totalSteps - 1
        ? "Finish"
        : currentStep === 0
        ? "Lets Get Started"
        : "save and continue"}
    </button>
  </div>
);

const OnBoardingCommonHeader: React.FC<{ header: string }> = ({ header }) => (
  <>
    {header && (
      <h1 className="text-center text-xl md:text-2xl font-bold">{header}</h1>
    )}
    <div className="flex gap-6 items-center">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Profile"
      />
      <div className="py-2 px-4 border border-[#e3e1e1] rounded-[12px]">
        <h2 className="text-lg font text-[#6C6969]">ElevateBox</h2>
        <p className="text-[#6C6969]">
          This should take ~5 minutes. Your progress will be saved, so feel free
          to leave things blank or come back to them later!
        </p>
      </div>
    </div>
  </>
);

const RolesStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Great! Let's build your profile to start." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DynamicInput
        label="First Name"
        type="text"
        placeholder="Thippareddy"
        validator={firstNameValidator}
        name="firstName"
        onInputChange={handleInputChange}
      />
      <DynamicInput
        label="Last Name"
        type="text"
        placeholder="Sai Charan"
        validator={lastNameValidator}
        name="lastName"
        onInputChange={handleInputChange}
      />
    </div>
    <CustomSelect
      label="How'd you hear about Elevate Box?"
      options={HEAR_SELECT}
      value={formData?.hear}
      onChange={(value) => handleSelectChange("hear", value)}
      name=""
      placeholder="Choose from below"
      isMulti={true}
    />
    <ResumeUpload />
  </div>
);

const EducationStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Add your education history." />
    <div>
      <h2 className="mb-2 font-bold text-lg">Education 1</h2>
      <CustomSelect
        label="School"
        options={SCHOOL_SELECT}
        value={formData?.schoolName}
        onChange={(value) => handleSelectChange("schoolName", value)}
        name="schoolNameOne"
        placeholder="Select your school"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          label="Major"
          options={HEAR_SELECT}
          value={formData?.degree}
          onChange={(value) => handleSelectChange("degree", value)}
          name="degreeOne"
          placeholder="Select your major"
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            label="Degree Type"
            options={HEAR_SELECT}
            value={formData?.degreeType}
            onChange={(value) => handleSelectChange("degreeType", value)}
            name="startYearOne"
            placeholder="Select your degree"
          />
          <DynamicInput
            label="GPA"
            type="text"
            placeholder="GPA"
            name="gpa"
            onInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CustomSelect
          label="Start Month"
          options={HEAR_SELECT}
          value={formData?.startMonthDegree}
          onChange={(value) => handleSelectChange("startMonthDegree", value)}
          name="startYearOne"
          placeholder="Select month"
        />
        <CustomSelect
          label="Start Year"
          options={HEAR_SELECT}
          value={formData?.startYearDegree}
          onChange={(value) => handleSelectChange("startYearDegree", value)}
          name="startYearDegree"
          placeholder="Select year"
        />
        <CustomSelect
          label="End Month"
          options={HEAR_SELECT}
          value={formData?.endMonthDegree}
          onChange={(value) => handleSelectChange("endMonthDegree", value)}
          name="startYearOne"
          placeholder="Select month"
        />
        <CustomSelect
          label="End Year"
          options={HEAR_SELECT}
          value={formData?.endYearDegree}
          onChange={(value) => handleSelectChange("endYearDegree", value)}
          name="startYearOne"
          placeholder="Select year"
        />
      </div>
    </div>
  </div>
);

const ExperienceStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-8">
    <OnBoardingCommonHeader header="Now, let's show off your work experience." />
    {/* Add work experience form fields here */}
    <div>
      <h2 className="mb-2 font-bold text-lg">Work Experience 1</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <CustomSelect
          label="Company"
          options={COMPANY_SELECT}
          value={formData?.company}
          onChange={(value) => handleSelectChange("company", value)}
          name="company"
          placeholder="Select your company"
        />
        <CustomSelect
          label="Location"
          options={LOCATION_SELECT}
          value={formData?.companyLocation}
          onChange={(value) => handleSelectChange("companyLocation", value)}
          name="companyLocation"
          placeholder="Select your location"
        />
        <CustomSelect
          label="Location Title"
          options={LOCATION_TITLE_SELECT}
          value={formData?.companyLocationTitle}
          onChange={(value) =>
            handleSelectChange("companyLocationTitle", value)
          }
          name="companyLocationTitle"
          placeholder="Select your location title"
        />
        <CustomSelect
          label="Experience Type"
          options={EXPEREINCE_TYPE_SELECT}
          value={formData?.comapnyExperince}
          onChange={(value) => handleSelectChange("comapnyExperince", value)}
          name="comapnyExperince"
          placeholder="Select your experience"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CustomSelect
          label="Start Month"
          options={MONTH_SELECT}
          value={formData?.jobStartMonth}
          onChange={(value) => handleSelectChange("jobStartMonth", value)}
          name="jobStartMonth"
          placeholder="Start Month"
        />
        <CustomSelect
          label="Start Year"
          options={YEAR_SELECT}
          value={formData?.jobStartYear}
          onChange={(value) => handleSelectChange("jobStartYear", value)}
          name="jobStartYear"
          placeholder="Start year"
        />
        <CustomSelect
          label="End Month"
          options={HEAR_SELECT}
          value={formData?.jobEndMonth}
          onChange={(value) => handleSelectChange("jobEndMonth", value)}
          name="jobEndMonth"
          placeholder="End month"
        />
        <CustomSelect
          label="End Year"
          options={HEAR_SELECT}
          value={formData?.jobEndYear}
          onChange={(value) => handleSelectChange("jobEndYear", value)}
          name="jobEndYear"
          placeholder="End year"
        />
      </div>
      <div>
        <p className="block text-[#6C6969] text-sm font-[500] mb-2">
          Description
        </p>
      </div>
    </div>
  </div>
);

const SkillsStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Let's not forget to show off your skills too." />
    {/* Add skills form fields here */}
  </div>
);

const EEOStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Next add your equal employment information." />
    {/* Add projects form fields here */}
    <div>
      <CustomSelect
        label="What is your ethnicity?"
        options={ETHINICITY_SELECT}
        value={formData?.ethinicity}
        onChange={(value) => handleSelectChange("ethinicity", value)}
        name="ethinicity"
        placeholder="Select all apply"
      />
    </div>
    <div className="space-y-4">
      <EEOCustomSelectComponent
        label="Do you have a disability?"
        options={["Yes", "No", "Decline to State"]}
      ></EEOCustomSelectComponent>
      <EEOCustomSelectComponent
        label="Are you veteran?"
        options={["Yes", "No", "Decline to State"]}
      ></EEOCustomSelectComponent>
      {/* <EEOCustomSelectComponent
        label="Do you identify as LGBTQ+?"
        options={["Yes", "No", "Decline to State"]}
      ></EEOCustomSelectComponent> */}
      <EEOCustomSelectComponent
        label="What is your gender?"
        options={["Male", "Female", "Other", "Decline to State"]}
      ></EEOCustomSelectComponent>
    </div>
    <p className="text-center text-gray-600 mt-2">
      By continuing you agree to the definatioons set by{" "}
      <span className="text-[#5CA1C0] cursor-pointer hover:text-[#0885bd]">
        U.S.EEOC
      </span>
    </p>
  </div>
);

const PersonalStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Almost there! A few last questions." />
    {/* Add references form fields here */}
    <CustomSelect
      label="Where are you currently located? "
      options={LOCATION_SELECT}
      value={formData?.currentLocation}
      onChange={(value) => handleSelectChange("currentLocation", value)}
      name="currentLocation"
      placeholder="select all the apply"
    />
    <DynamicInput
      label="What is your Date of Birth?"
      type="text"
      placeholder="03 December 2000"
      name="DOB"
      onInputChange={handleInputChange}
    />
    <DynamicInput
      label="What is your phone number?"
      type="text"
      placeholder="9515235212"
      name="PhoneNumber"
      onInputChange={handleInputChange}
      prefix={() => (
        <div className="pl-2">
          <p className="text-sm">+91</p>
        </div>
      )}
    />
    <div>
      <h2>Social Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
        <DynamicInput
          label=""
          prefix={() => SocialLink()}
          type="text"
          placeholder="Facebook"
          name="Facebook"
          onInputChange={handleInputChange}
        />
        <DynamicInput
          label=""
          prefix={() => SocialLink()}
          type="text"
          placeholder="Twitter"
          name="Twitter"
          onInputChange={handleInputChange}
        />
        <DynamicInput
          label=""
          prefix={() => SocialLink()}
          type="text"
          placeholder="Instagram"
          name="Instagram"
          onInputChange={handleInputChange}
        />
        <DynamicInput
          label=""
          prefix={() => SocialLink()}
          type="text"
          placeholder="Reddit"
          name="Reddit"
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  </div>
);

const LinksStep: React.FC<{
  formData: Record<string, any>;
  handleInputChange: (name: string, value: string, error: string) => void;
  handleSelectChange: (name: string, value: string | string[]) => void;
}> = ({ formData, handleInputChange, handleSelectChange }) => (
  <div className="flex flex-col gap-6">
    <OnBoardingCommonHeader header="Last Step, add your personal links." />
    {/* Add review form fields here */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <DynamicInput
        label="Linkedin"
        prefix={() => LinkedinIcon()}
        type="text"
        placeholder="https://www.linkedin.com/in/sai-charan-a59114211/"
        name="Linkedin"
        onInputChange={handleInputChange}
      />
      <DynamicInput
        label="Github"
        prefix={() => GithubIcon()}
        type="text"
        placeholder="https://www.linkedin.com/in/sai-charan-a59114211/"
        name="Github"
        onInputChange={handleInputChange}
      />
      <DynamicInput
        label="Portfolio"
        prefix={() => PortFolioIcon()}
        type="text"
        placeholder="https://www.saicherry.online/"
        name="Portfolio"
        onInputChange={handleInputChange}
      />
      <DynamicInput
        label="Others"
        prefix={() => OtherLinksIcon()}
        type="text"
        placeholder="anyotherlinks.com"
        name="OtherLink"
        onInputChange={handleInputChange}
      />
    </div>
  </div>
);
const ResumeUpload: React.FC = () => (
  <div>
    <p className="block text-black/70 text-sm font-[500] mb-2">
      Upload your resume
    </p>
    <div className="bg-[#DDEAF0] flex flex-col md:flex-row md:p-8 p-4 md:px-12 items-center rounded-3xl md:gap-8">
      <img
        className="object-fit w-12 h-12"
        src="https://s3-alpha-sig.figma.com/img/0029/578b/3ef7ef85fd397ccbf407977e80087306?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Eyo8bj3uIeD9fWhxLAWGbqu98HliGGectz73YAZCjnzaUDjAmne3c9COyFk9Nxsy4XHWxutl67Txuh2-6WTkmS7Bkt7elVQOa0AXeL55WCGNcknulnIfUK5jYemIKOGDjlrlwgTMHQoIhqgFsdFOcrVXEmDgadb0Snb-YzARctBvEchWwBXJSQjbkPllJ4tPNzPDZh7CTAFlB0klP4Y2anl9r~xhU29MChwqrVhJqNE-h0xz7SNYL9v9MULa-N1lrjA8F8A2gJrDNFuPLf-POnxGLnQgctgPHeR8Sx2wfVDRIKYCE2TIOIuEfb~jNvX3yTmxP4kZ8CupgD1D9ZnJ~w__"
        alt="Resume icon"
      />
      <div className="text-[#6C6969] space-y-2">
        <p>
          We'll parse your resume and use it to prefill your profile
          information. PDFs are recommended for best results when submitting job
          applications.
        </p>
        <p>
          Want to import from Linkedin?{" "}
          <span className="text-[#5CA1C0] cursor-pointer hover:text-[#0885bd]">
            Upload your profile PDF →
          </span>
        </p>
      </div>
    </div>
    <div className="border-dashed mt-4 border-2 py-4 flex flex-col items-center gap-2 border-black/60 rounded-2xl ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="46"
        viewBox="0 0 70 46"
        fill="none"
      >
        <path
          d="M56.149 17.3535C54.1912 7.46063 45.4713 0 35.0034 0C26.6889 0 19.487 4.71213 15.8904 11.6035C7.23954 12.535 0.503418 19.8547 0.503418 28.75C0.503418 38.2777 8.22567 46 17.7534 46H55.1284C63.0663 46 69.5034 39.5629 69.5034 31.625C69.5034 24.035 63.6039 17.8854 56.149 17.3535ZM35.0034 11.5L49.3784 25.875H40.7534V37.375H29.2534V25.875H20.6284L35.0034 11.5Z"
          fill="#9FA6B2"
        />
      </svg>
      <p className="text-[#5CA1C0]">Upload file</p>
      <p>{"(PDF,DOCX,DOC up to 5 MB)"}</p>
    </div>
  </div>
);

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  name: string;
  placeholder?: string;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  placeholder = "Select an option",
  isMulti = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
      setFilteredOptions(options);
    }
  }, [isOpen, options]);

  const handleSelect = useCallback(
    (option: string) => {
      if (isMulti) {
        if (Array.isArray(value)) {
          if (value.includes(option)) {
            onChange(value.filter((item) => item !== option));
          } else {
            onChange([...value, option]);
          }
        } else {
          onChange([option]);
        }
      } else {
        onChange(option);
        setIsOpen(false);
      }
      setSearchTerm("");
    },
    [onChange, value, isMulti]
  );

  const handleRemove = useCallback(
    (option: string) => {
      if (isMulti && Array.isArray(value)) {
        onChange(value.filter((item) => item !== option));
      }
    },
    [onChange, value, isMulti]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOptions(filtered);
    },
    [options]
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="mb-4">
      <label
        className="block text-[#6C6969] text-sm font-[500] mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="flex items-center bg-gray-50 justify-between w-full p-2 border border-gray-300 rounded-md cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="flex flex-wrap items-center  ">
            {isMulti && Array.isArray(value) && value.length > 0 ? (
              value.map((item) => (
                <div
                  key={item}
                  className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  <span>{item}</span>
                  <svg
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 361.4c12.5-12.5 12.5-32.8 0-45.3L209.9 215.9l100.7-100.7c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L164.6 170.6 63.9 69.9c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l100.7 100.7L18.6 316.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L164.6 215.9l100.7 100.7c12.5 12.5 32.8 12.5 45.3 0z" />
                  </svg>
                </div>
              ))
            ) : (
              <span
                className={` ${value ? "text-black" : "text-gray-400 text-sm"}`}
              >
                {value || placeholder}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-2 border-b">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full pr-2 pl-2 py-1 border rounded-md outline-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    (isMulti &&
                      Array.isArray(value) &&
                      value.includes(option)) ||
                    (!isMulti && option === value)
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="p-2 text-gray-500">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EEOCustomSelectComponent = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between itemcs-center">
      <p>{label}</p>
      <div className="flex gap-2 md:gap-4 ">
        {options.map((option, index) => (
          <div className="p-2 min-w-[50px] text-center md:px-6 rounded-md cursor-pointer text-black border border-[1px] border-black bg-transparent hover:bg-black hover:text-white">
            {option}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialLink = () => {
  return (
    <svg
      className="w-4 h-4 ml-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
      <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
    </svg>
  );
};

const LinkedinIcon = () => {
  return (
    <svg
      className="w-6 h-6 ml-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  );
};

const GithubIcon = () => {
  return (
    <svg
      className="w-6 h-6 ml-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
      <path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z" />
    </svg>
  );
};

const PortFolioIcon = () => {
  return (
    <svg
      className="w-6 h-6 ml-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
      <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" />
    </svg>
  );
};

const OtherLinksIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="W-6 h-6 ml-2"
      viewBox="0 0 150 150"
      fill="none"
    >
      <rect width={150} height={150} rx={75} fill="black" />
      <rect x={36} y={65} width={20} height={20} rx={10} fill="white" />
      <rect x={94} y={65} width={20} height={20} rx={10} fill="white" />
      <rect x={65} y={65} width={20} height={20} rx={10} fill="white" />
    </svg>
  );
};
export default OnboardingScreen;
