import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
  const [formData, setFormData] = useState({
    // Step 1 data
    schoolInfo: {
      school: "",
      otherSchool: "",
      program: "",
      campus: "",
      studentNumber: "",
      startDate: { month: "", day: "", year: "" },
      endDate: { month: "", day: "", year: "" },
      percentage: "",
      inClassCourses: "",
      onlineCourses: "",
      studyLevel: "",
      completed: false
    },
    
    // Step 2 data
    personalInfo: {
      maritalStatus: "",
      spouseName: { firstName: "", lastName: "" },
      spouseOccupation: "",
      spouseIncome: "",
      hasChildren: false,
      numberOfChildren: "",
      childAges: "",
      hasDisability: false,
      hasIndigenousStatus: false,
      indigenousGroup: "",
      isFirstGeneration: false,
      completed: false
    },
    
    // Step 3 data
    financialInfo: {
      employmentStatus: "",
      employerName: "",
      income: "",
      scholarships: "",
      governmentBenefits: "",
      investments: "",
      otherIncome: "",
      expectedContribution: "",
      assetValue: "",
      financialHardship: false,
      hardshipDetails: "",
      completed: false
    }
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('osapFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('osapFormData', JSON.stringify(formData));
  }, [formData]);

  // Function to update form data and mark step as completed
  const updateFormData = (step, data) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        ...data,
        completed: true
      }
    }));
  };

  // Function to clear form data for a specific step
  const clearFormData = (step) => {
    if (step === 'schoolInfo') {
      setFormData(prevData => ({
        ...prevData,
        schoolInfo: {
          school: "",
          otherSchool: "",
          program: "",
          campus: "",
          studentNumber: "",
          startDate: { month: "", day: "", year: "" },
          endDate: { month: "", day: "", year: "" },
          percentage: "",
          inClassCourses: "",
          onlineCourses: "",
          studyLevel: "",
          completed: false
        }
      }));
    } else if (step === 'personalInfo') {
      setFormData(prevData => ({
        ...prevData,
        personalInfo: {
          maritalStatus: "",
          spouseName: { firstName: "", lastName: "" },
          spouseOccupation: "",
          spouseIncome: "",
          hasChildren: false,
          numberOfChildren: "",
          childAges: "",
          hasDisability: false,
          hasIndigenousStatus: false,
          indigenousGroup: "",
          isFirstGeneration: false,
          completed: false
        }
      }));
    } else if (step === 'financialInfo') {
      setFormData(prevData => ({
        ...prevData,
        financialInfo: {
          employmentStatus: "",
          employerName: "",
          income: "",
          scholarships: "",
          governmentBenefits: "",
          investments: "",
          otherIncome: "",
          expectedContribution: "",
          assetValue: "",
          financialHardship: false,
          hardshipDetails: "",
          completed: false
        }
      }));
    }
  };
  
  // Function to check if a form has all required fields filled
  const isFormComplete = (step, data) => {
    if (step === 'schoolInfo') {
      // Check if required fields for school info are filled
      return (
        ((data.school && data.school !== "") || (data.otherSchool && data.otherSchool !== "")) &&
        (data.program && data.program !== "") &&
        (data.startDate && data.startDate.month && data.startDate.day && data.startDate.year) &&
        (data.endDate && data.endDate.month && data.endDate.day && data.endDate.year) &&
        (data.percentage && data.percentage !== "") &&
        (data.inClassCourses && data.inClassCourses !== "") &&
        (data.onlineCourses && data.onlineCourses !== "") &&
        (data.studyLevel && data.studyLevel !== "")
      );
    } else if (step === 'personalInfo') {
      // Check if required fields for personal info are filled
      const isMaritalStatusComplete = data.maritalStatus && data.maritalStatus !== "";
      
      // Additional checks for married/common-law
      const isSpouseInfoRequired = data.maritalStatus === "married" || data.maritalStatus === "commonLaw";
      const isSpouseInfoComplete = !isSpouseInfoRequired || (
        data.spouseName && 
        data.spouseName.firstName && 
        data.spouseName.lastName && 
        data.spouseOccupation && 
        data.spouseIncome
      );
      
      // Additional checks for children info
      const isChildrenInfoRequired = data.hasChildren;
      const isChildrenInfoComplete = !isChildrenInfoRequired || (
        data.numberOfChildren && 
        data.childAges
      );
      
      // Additional checks for indigenous status
      const isIndigenousInfoRequired = data.hasIndigenousStatus;
      const isIndigenousInfoComplete = !isIndigenousInfoRequired || (
        data.indigenousGroup && data.indigenousGroup !== ""
      );
      
      return (
        isMaritalStatusComplete && 
        isSpouseInfoComplete && 
        isChildrenInfoComplete && 
        isIndigenousInfoComplete
      );
    } else if (step === 'financialInfo') {
      // Check if required fields for financial info are filled
      const isEmploymentComplete = data.employmentStatus && data.employmentStatus !== "";
      
      // Check if employer info is required and complete
      const isEmployerRequired = ["fullTime", "partTime", "selfEmployed"].includes(data.employmentStatus);
      const isEmployerComplete = !isEmployerRequired || (data.employerName && data.employerName !== "");
      
      // Check if income is provided
      const isIncomeComplete = data.income && data.income !== "";
      
      // Check if hardship details are provided if financial hardship is selected
      const isHardshipComplete = !data.financialHardship || (data.hardshipDetails && data.hardshipDetails !== "");
      
      return (
        isEmploymentComplete && 
        isEmployerComplete && 
        isIncomeComplete && 
        isHardshipComplete
      );
    }
    
    return false;
  };

  // Function to mark previous step as complete when navigating forward
  const markPreviousStepComplete = (currentStep) => {
    if (currentStep === 'personalInfo' && !formData.schoolInfo.completed) {
      // Check if school info has required fields filled
      if (isFormComplete('schoolInfo', formData.schoolInfo)) {
        setFormData(prevData => ({
          ...prevData,
          schoolInfo: {
            ...prevData.schoolInfo,
            completed: true
          }
        }));
      }
    } else if (currentStep === 'financialInfo' && !formData.personalInfo.completed) {
      // Check if personal info has required fields filled
      if (isFormComplete('personalInfo', formData.personalInfo)) {
        setFormData(prevData => ({
          ...prevData,
          personalInfo: {
            ...prevData.personalInfo,
            completed: true
          }
        }));
      }
    } else if (currentStep === 'summary' && !formData.financialInfo.completed) {
      // Check if financial info has required fields filled
      if (isFormComplete('financialInfo', formData.financialInfo)) {
        setFormData(prevData => ({
          ...prevData,
          financialInfo: {
            ...prevData.financialInfo,
            completed: true
          }
        }));
      }
    }
  };

  return (
    <AppContext.Provider value={{ 
      formData, 
      updateFormData, 
      clearFormData,
      markPreviousStepComplete,
      isFormComplete 
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  return useContext(AppContext);
}