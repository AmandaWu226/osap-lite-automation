import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import Header from "./Header";

export default function Step1School() {
  const navigate = useNavigate();
  const { formData, updateFormData, clearFormData, isFormComplete, markPreviousStepComplete } = useAppContext();
  
  // Initialize state from context or default values
  const [school, setSchool] = useState(formData.schoolInfo.school || "");
  const [notOnList, setNotOnList] = useState(formData.schoolInfo.otherSchool ? true : false);
  const [otherSchool, setOtherSchool] = useState(formData.schoolInfo.otherSchool || "");
  const [program, setProgram] = useState(formData.schoolInfo.program || "");
  const [startDate, setStartDate] = useState(formData.schoolInfo.startDate || { month: "", day: "", year: "" });
  const [endDate, setEndDate] = useState(formData.schoolInfo.endDate || { month: "", day: "", year: "" });
  const [percentage, setPercentage] = useState(formData.schoolInfo.percentage || "");
  const [inClassCourses, setInClassCourses] = useState(formData.schoolInfo.inClassCourses || "");
  const [onlineCourses, setOnlineCourses] = useState(formData.schoolInfo.onlineCourses || "");
  const [studyLevel, setStudyLevel] = useState(formData.schoolInfo.studyLevel || "");
  const [studentNumber, setStudentNumber] = useState(formData.schoolInfo.studentNumber || "");
  const [campus, setCampus] = useState(formData.schoolInfo.campus || "");
  
  // Track if form is complete for enabling/disabling Next button
  const [formComplete, setFormComplete] = useState(false);
  
  // Check if form is complete whenever relevant fields change
  useEffect(() => {
    const currentData = {
      school,
      otherSchool,
      program,
      startDate,
      endDate,
      percentage,
      inClassCourses,
      onlineCourses,
      studyLevel
    };
    
    setFormComplete(isFormComplete('schoolInfo', currentData));
  }, [school, otherSchool, program, startDate, endDate, percentage, inClassCourses, onlineCourses, studyLevel, isFormComplete]);

  const handleNext = (e) => {
    e.preventDefault();
    updateFormData('schoolInfo', {
      school,
      otherSchool,
      program,
      campus,
      studentNumber,
      startDate,
      endDate,
      percentage,
      inClassCourses,
      onlineCourses,
      studyLevel,
      completed: true
    });
    navigate("/step2");
  };

  // Only clear school-related fields
  const handleClearSchool = () => {
    setSchool("");
    setNotOnList(false);
    setOtherSchool("");
    // Optionally update context for just these fields
    updateFormData('schoolInfo', {
      ...formData.schoolInfo,
      school: "",
      otherSchool: "",
    });
  };

  return (
    <div>
      <Header />
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200">
        <div className="bg-blue-600 h-2" style={{ width: "25%" }}></div>
      </div>

      {/* Step indicators */}
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="flex flex-wrap justify-between mb-8">
          <StepIndicator 
            number="1" 
            color="purple" 
            title="School & program" 
            active={true} 
            completed={formData.schoolInfo.completed}
            subtitle="School" 
          />
          <StepIndicator 
            number="2" 
            color="orange" 
            title="About you" 
            active={false} 
            completed={formData.personalInfo.completed}
          />
          <StepIndicator 
            number="3" 
            color="red" 
            title="About your family" 
            active={false} 
            completed={formData.financialInfo.completed}
          />
          <StepIndicator 
            number="4" 
            color="green" 
            title="Submit" 
            active={false} 
            completed={false}
          />
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
          <h2 className="text-2xl font-semibold mb-8">Step 1: Your program</h2>
          
          <form onSubmit={handleNext} className="space-y-8">
            <div>
              <label className="block font-medium text-lg mb-3">Select your school:</label>
              <div className="flex gap-6 items-start">
                <select
                  className="w-full max-w-xl border px-4 py-3 rounded-md text-base"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required={!notOnList}
                  disabled={notOnList}
                >
                  <option value="">Select school</option>
                  <option value="UofT">University of Toronto</option>
                  <option value="Waterloo">University of Waterloo</option>
                  <option value="YorkU">York University</option>
                  <option value="Seneca">Seneca College</option>
                  <option value="Sheridan">Sheridan College</option>
                  <option value="George_Brown">George Brown College</option>
                  <option value="Humber">Humber College</option>
                  <option value="McMaster">McMaster University</option>
                  <option value="Western">Western University</option>
                  <option value="Queens">Queen's University</option>
                </select>
                <button 
                  type="button" 
                  className="bg-gray-200 text-gray-800 px-5 py-3 rounded-md text-base"
                  onClick={handleClearSchool}
                >
                  Clear school
                </button>
              </div>
              
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="notOnList"
                  checked={notOnList}
                  onChange={() => setNotOnList(!notOnList)}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor="notOnList" className="text-base">School not on list?</label>
              </div>
              
              {notOnList && (
                <div className="mt-4">
                  <label className="block font-medium mb-2">Enter your school name:</label>
                  <input
                    type="text"
                    className="w-full max-w-xl border px-4 py-3 rounded-md"
                    value={otherSchool}
                    onChange={(e) => setOtherSchool(e.target.value)}
                    required={notOnList}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">What is the name of your program?</label>
              <input
                type="text"
                className="w-full max-w-xl border px-4 py-3 rounded-md"
                placeholder="e.g. Computer Science"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Campus (if applicable):</label>
              <input
                type="text"
                className="w-full max-w-xl border px-4 py-3 rounded-md"
                placeholder="e.g. Downtown Campus"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">Student Number (if known):</label>
              <input
                type="text"
                className="w-full max-w-xl border px-4 py-3 rounded-md"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-3">What is the start date of your 2024-25 part-time study period?</label>
              <div className="flex gap-4 max-w-xl">
                <select
                  value={startDate.month}
                  onChange={(e) => setStartDate({...startDate, month: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                
                <select
                  value={startDate.day}
                  onChange={(e) => setStartDate({...startDate, day: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Day</option>
                  {Array.from({length: 31}, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                
                <select
                  value={startDate.year}
                  onChange={(e) => setStartDate({...startDate, year: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Year</option>
                  {[2024, 2025].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-3">What is the end date of your 2024-25 part-time study period?</label>
              <div className="flex gap-4 max-w-xl">
                <select
                  value={endDate.month}
                  onChange={(e) => setEndDate({...endDate, month: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                
                <select
                  value={endDate.day}
                  onChange={(e) => setEndDate({...endDate, day: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Day</option>
                  {Array.from({length: 31}, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                
                <select
                  value={endDate.year}
                  onChange={(e) => setEndDate({...endDate, year: e.target.value})}
                  className="border rounded-md px-4 py-3 w-1/3"
                  required
                >
                  <option value="">Year</option>
                  {[2024, 2025].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">What percentage of a full course load will you be taking?</label>
              <a href="#" className="text-blue-600 hover:underline block mb-3">How to calculate your course load</a>
              <div className="flex items-center max-w-xs">
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="border rounded-md px-4 py-3 w-24"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  required
                />
                <span className="ml-3 text-lg">%</span>
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">How many courses are you taking in-class?</label>
              <input
                type="number"
                min="0"
                className="border rounded-md px-4 py-3 w-24"
                value={inClassCourses}
                onChange={(e) => setInClassCourses(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-2">How many courses are you taking online, through correspondence or distance education?</label>
              <input
                type="number"
                min="0"
                className="border rounded-md px-4 py-3 w-24"
                value={onlineCourses}
                onChange={(e) => setOnlineCourses(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block font-medium text-lg mb-3">What will be your level of study?</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="diploma"
                    name="studyLevel"
                    value="Diploma"
                    checked={studyLevel === "Diploma"}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="mr-3 h-5 w-5"
                    required
                  />
                  <label htmlFor="diploma" className="text-base">Diploma</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="certificate"
                    name="studyLevel"
                    value="Certificate"
                    checked={studyLevel === "Certificate"}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="certificate" className="text-base">Certificate</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bachelors"
                    name="studyLevel"
                    value="Bachelor's degree"
                    checked={studyLevel === "Bachelor's degree"}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="bachelors" className="text-base">Bachelor's degree</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="masters"
                    name="studyLevel"
                    value="Master's degree"
                    checked={studyLevel === "Master's degree"}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="masters" className="text-base">Master's degree</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="doctoral"
                    name="studyLevel"
                    value="Doctoral degree"
                    checked={studyLevel === "Doctoral degree"}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor="doctoral" className="text-base">Doctoral degree</label>
                </div>
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
                onClick={handleClearSchool}
              >
                Clear page
              </button>
              <button 
                type="submit" 
                className={`px-8 py-3 ${formComplete ? 'bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white rounded-md text-lg`}
                disabled={!formComplete}
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

  // Determine status text
  let statusText = "Incomplete";
  if (completed) statusText = "Complete";
  if (active) statusText = "Go to:";

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
        <p className="text-sm text-gray-600">{statusText}</p>
        {active && subtitle && <p className="text-sm text-blue-600">{subtitle}</p>}
      </div>
    </div>
  );
}