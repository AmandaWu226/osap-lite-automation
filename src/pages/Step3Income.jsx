import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../AppContext";
import Header from "./Header";

export default function Step3Income() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useAppContext();
  const [income, setIncome] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [scholarships, setScholarships] = useState("");
  const [governmentBenefits, setGovernmentBenefits] = useState("");
  const [investments, setInvestments] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [expectedContribution, setExpectedContribution] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [financialHardship, setFinancialHardship] = useState(false);
  const [hardshipDetails, setHardshipDetails] = useState("");
  
  const handleNext = (e) => {
    e.preventDefault();
    updateFormData('financialInfo', {
      income,
      employmentStatus,
      employerName,
      scholarships,
      governmentBenefits,
      investments,
      otherIncome,
      expectedContribution,
      assetValue,
      financialHardship,
      hardshipDetails,
      completed: true
    });
    navigate("/summary");
  };

  return (
    <div>
      <Header />
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200">
        <div className="bg-blue-600 h-2" style={{ width: "75%" }}></div>
      </div>

      {/* Step indicators */}
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="flex flex-wrap justify-between mb-8">
          <StepIndicator number="1" color="purple" title="School & program" active={false} completed={formData.schoolInfo.completed} />
          <StepIndicator number="2" color="orange" title="About you" active={false} completed={formData.personalInfo.completed} />
          <StepIndicator number="3" color="red" title="About your family" active={true} completed={formData.financialInfo.completed} subtitle="Financial Info" />
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
          <h2 className="text-2xl font-semibold mb-8">Step 3: Your Income</h2>
          
          <form onSubmit={handleNext} className="space-y-8">
            <div>
              <label className="block font-medium text-lg mb-2">Employment Status:</label>
              <select
                className="border rounded px-4 py-3 w-full max-w-xl"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                required
              >
                <option value="">Select your employment status</option>
                <option value="fullTime">Full-time</option>
                <option value="partTime">Part-time</option>
                <option value="selfEmployed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
            </div>
            
            {(employmentStatus === "fullTime" || employmentStatus === "partTime" || employmentStatus === "selfEmployed") && (
              <div>
                <label className="block font-medium text-lg mb-2">Current Employer:</label>
                <input
                  type="text"
                  className="border rounded px-4 py-3 w-full max-w-xl"
                  placeholder="Enter employer name"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  required={employmentStatus !== "unemployed" && employmentStatus !== "retired"}
                />
              </div>
            )}
            
            <div>
              <label className="block font-medium text-lg mb-2">Annual Gross Income (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 30000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  required
                />
              </div>
              
              {income && parseInt(income) < 20000 && (
                <p className="text-base text-green-600 mt-2">
                  You may be eligible for additional financial support based on income.
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Scholarships, Bursaries, and Awards (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 5000"
                  value={scholarships}
                  onChange={(e) => setScholarships(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Government Benefits (e.g., CCB, EI, ODSP) (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 4800"
                  value={governmentBenefits}
                  onChange={(e) => setGovernmentBenefits(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Investment Income (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 1000"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Other Income (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 2000"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Expected Financial Contribution from Parents/Guardians (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 5000"
                  value={expectedContribution}
                  onChange={(e) => setExpectedContribution(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Value of Assets (CAD):</label>
              <div className="flex items-center max-w-xs">
                <span className="mr-2 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="border rounded px-4 py-3 w-full"
                  placeholder="e.g. 10000"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Include savings, investments, and vehicles. Do not include your primary residence.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="financialHardship"
                  checked={financialHardship}
                  onChange={() => setFinancialHardship(!financialHardship)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="financialHardship" className="text-lg font-medium">
                  Are you experiencing financial hardship?
                </label>
              </div>
              
              {financialHardship && (
                <div className="ml-8">
                  <label className="block text-gray-700 mb-2">Please provide details:</label>
                  <textarea
                    className="border rounded px-4 py-3 w-full"
                    rows="4"
                    placeholder="Describe your financial hardship situation..."
                    value={hardshipDetails}
                    onChange={(e) => setHardshipDetails(e.target.value)}
                    required={financialHardship}
                  ></textarea>
                </div>
              )}
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
                onClick={() => navigate("/step2")}
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

  return (
    <div className="flex flex-col items-center mb-4">
      <div className={`flex items-center justify-center w-20 h-20 rounded-full ${colorMap[color].bg} text-white font-bold text-3xl`}>
        {number}
      </div>
      <div className="text-center mt-3">
        <p className="font-medium text-lg">{title}</p>
        <p className="text-base text-gray-600">{active ? "Go to:" : "Incomplete"}</p>
        {active && subtitle && <p className="text-base text-blue-600">{subtitle}</p>}
      </div>
    </div>
  );
}