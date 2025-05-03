import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../AppContext";
import Header from "./Header";

export default function Step2Marital() {
  const navigate = useNavigate();
  const { formData, updateFormData, markPreviousStepComplete } = useAppContext();
  const [maritalStatus, setMaritalStatus] = useState(formData.personalInfo.maritalStatus || "");
  const [spouseName, setSpouseName] = useState(formData.personalInfo.spouseName || {firstName: "", lastName: ""});
  const [spouseOccupation, setSpouseOccupation] = useState(formData.personalInfo.spouseOccupation || "");
  const [spouseIncome, setSpouseIncome] = useState(formData.personalInfo.spouseIncome || "");
  const [hasChildren, setHasChildren] = useState(formData.personalInfo.hasChildren || false);
  const [numberOfChildren, setNumberOfChildren] = useState(formData.personalInfo.numberOfChildren || "");
  const [childAges, setChildAges] = useState(formData.personalInfo.childAges || "");
  const [hasDisability, setHasDisability] = useState(formData.personalInfo.hasDisability || false);
  const [hasIndigenousStatus, setHasIndigenousStatus] = useState(formData.personalInfo.hasIndigenousStatus || false);
  const [indigenousGroup, setIndigenousGroup] = useState(formData.personalInfo.indigenousGroup || "");
  const [isFirstGeneration, setIsFirstGeneration] = useState(formData.personalInfo.isFirstGeneration || false);

  const handleNext = (e) => {
    e.preventDefault();
    updateFormData('personalInfo', {
      maritalStatus,
      spouseName,
      spouseOccupation,
      spouseIncome,
      hasChildren,
      numberOfChildren,
      childAges,
      hasDisability,
      hasIndigenousStatus,
      indigenousGroup,
      isFirstGeneration,
      completed: true
    });
    navigate("/step3");
  };

  return (
    <div>
      <Header />
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200">
        <div className="bg-blue-600 h-2" style={{ width: "50%" }}></div>
      </div>

      {/* Step indicators */}
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="flex flex-wrap justify-between mb-8">
          <StepIndicator number="1" color="purple" title="School & program" active={false} completed={formData.schoolInfo.completed} />
          <StepIndicator number="2" color="orange" title="About you" active={true} completed={formData.personalInfo.completed} subtitle="Personal Info" />
          <StepIndicator number="3" color="red" title="About your family" active={false} completed={formData.financialInfo.completed} />
          <StepIndicator number="4" color="green" title="Submit" active={false} completed={false} />
        </div>

        {/* OSAP Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center">
            <span className="bg-black text-white px-4 py-2 text-3xl font-bold">osap</span>
            <svg className="ml-2" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#16a34a"/>
              <path d="M17 9l-5.25 6L7 11.5l1.5-1.5 3.25 3.25L15.5 7.5z" fill="#fff"/>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold ml-3">2024-25 Part-time application</h1>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-8">Step 2: About You</h2>
          
          <form onSubmit={handleNext} className="space-y-8">
            <div>
              <label className="block font-medium text-lg mb-3">Marital Status:</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="single"
                    name="maritalStatus"
                    value="single"
                    checked={maritalStatus === "single"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                    required
                  />
                  <label htmlFor="single" className="text-base">Single</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="married"
                    name="maritalStatus"
                    value="married"
                    checked={maritalStatus === "married"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="married" className="text-base">Married</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="commonLaw"
                    name="maritalStatus"
                    value="commonLaw"
                    checked={maritalStatus === "commonLaw"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="commonLaw" className="text-base">Common-law</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="separated"
                    name="maritalStatus"
                    value="separated"
                    checked={maritalStatus === "separated"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="separated" className="text-base">Separated</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="divorced"
                    name="maritalStatus"
                    value="divorced"
                    checked={maritalStatus === "divorced"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="divorced" className="text-base">Divorced</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="widowed"
                    name="maritalStatus"
                    value="widowed"
                    checked={maritalStatus === "widowed"}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="widowed" className="text-base">Widowed</label>
                </div>
              </div>
            </div>
            
            {(maritalStatus === "married" || maritalStatus === "commonLaw") && (
              <>
                <div>
                  <label className="block font-medium text-lg mb-3">Spouse Information:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name:</label>
                      <input
                        type="text"
                        className="border rounded px-4 py-3 w-full"
                        placeholder="Enter spouse's first name"
                        value={spouseName.firstName}
                        onChange={(e) => setSpouseName({...spouseName, firstName: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name:</label>
                      <input
                        type="text"
                        className="border rounded px-4 py-3 w-full"
                        placeholder="Enter spouse's last name"
                        value={spouseName.lastName}
                        onChange={(e) => setSpouseName({...spouseName, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Spouse's Occupation:</label>
                  <input
                    type="text"
                    className="border rounded px-4 py-3 w-full max-w-xl"
                    placeholder="Enter spouse's occupation"
                    value={spouseOccupation}
                    onChange={(e) => setSpouseOccupation(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Spouse's Annual Income (CAD):</label>
                  <div className="flex items-center max-w-xs">
                    <span className="mr-2 text-lg">$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      className="border rounded px-4 py-3 w-full"
                      placeholder="e.g. 45000"
                      value={spouseIncome}
                      onChange={(e) => setSpouseIncome(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasChildren"
                  checked={hasChildren}
                  onChange={() => setHasChildren(!hasChildren)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="hasChildren" className="text-lg font-medium">Do you have children?</label>
              </div>
              
              {hasChildren && (
                <>
                  <div className="ml-8 mb-4">
                    <label className="block text-gray-700 mb-2">Number of children:</label>
                    <input
                      type="number"
                      min="1"
                      className="border rounded px-4 py-3 w-24"
                      value={numberOfChildren}
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                      required={hasChildren}
                    />
                  </div>
                  
                  <div className="ml-8">
                    <label className="block text-gray-700 mb-2">Ages of children (comma separated):</label>
                    <input
                      type="text"
                      className="border rounded px-4 py-3 w-full max-w-xl"
                      placeholder="e.g. 2, 5, 7"
                      value={childAges}
                      onChange={(e) => setChildAges(e.target.value)}
                      required={hasChildren}
                    />
                  </div>
                </>
              )}
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasDisability"
                  checked={hasDisability}
                  onChange={() => setHasDisability(!hasDisability)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="hasDisability" className="text-lg font-medium">Do you have a permanent disability?</label>
              </div>
              
              {hasDisability && (
                <p className="ml-8 text-green-700">
                  You may be eligible for additional funding. Documentation will be required.
                </p>
              )}
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasIndigenousStatus"
                  checked={hasIndigenousStatus}
                  onChange={() => setHasIndigenousStatus(!hasIndigenousStatus)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="hasIndigenousStatus" className="text-lg font-medium">Do you identify as an Indigenous person?</label>
              </div>
              
              {hasIndigenousStatus && (
                <div className="ml-8">
                  <label className="block text-gray-700 mb-2">Please specify:</label>
                  <select
                    className="border rounded px-4 py-3 w-full max-w-xl"
                    value={indigenousGroup}
                    onChange={(e) => setIndigenousGroup(e.target.value)}
                    required={hasIndigenousStatus}
                  >
                    <option value="">Select an option</option>
                    <option value="FirstNations">First Nations</option>
                    <option value="Metis">Métis</option>
                    <option value="Inuit">Inuit</option>
                    <option value="Other">Other Indigenous identity</option>
                  </select>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFirstGeneration"
                  checked={isFirstGeneration}
                  onChange={() => setIsFirstGeneration(!isFirstGeneration)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="isFirstGeneration" className="text-lg font-medium">
                  Are you the first in your family to attend post-secondary education?
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-5 mt-10">
              <button 
                type="button" 
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md border text-lg"
                onClick={() => navigate("/")}
              >
                Exit
              </button>
              <button 
                type="button" 
                className="px-8 py-3 bg-gray-300 text-gray-800 rounded-md border text-lg"
                onClick={() => navigate("/step1")}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-blue-700 text-white rounded-md text-lg"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, color, title, active, completed, subtitle }) {
  const colorMap = {
    purple: { text: "text-purple-800", bg: "bg-purple-700" },
    orange: { text: "text-orange-800", bg: "bg-orange-500" },
    red: { text: "text-red-800", bg: "bg-red-600" },
    green: { text: "text-green-800", bg: "bg-green-600" },
  };

  let statusText = "";
  if (active) {
    statusText = "Go to:";
  } else if (completed) {
    statusText = "Complete";
  } else {
    statusText = "Incomplete";
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <div className={`relative flex items-center justify-center w-20 h-20 rounded-full ${colorMap[color].bg} text-white font-bold text-3xl`}>
        {number}
        {completed && !active && (
          <svg className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="text-green-600" />
          </svg>
        )}
      </div>
      <div className="text-center mt-3">
        <p className="font-medium text-lg">{title}</p>
        <p className={`text-sm ${completed && !active ? 'text-green-600' : 'text-gray-600'}`}>{statusText}</p>
        {active && subtitle && <p className="text-sm text-blue-600">{subtitle}</p>}
      </div>
    </div>
  );
}