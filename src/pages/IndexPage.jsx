import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

export default function IndexPage() {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/step1");
  };

  return (
    <div>
      <Header />
      
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="my-8">
          {/* OSAP Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              <span className="bg-black text-white px-4 py-2 text-3xl font-bold">osap</span>
              <svg className="ml-2" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#16a34a"/>
                <path d="M17 9l-5.25 6L7 11.5l1.5-1.5 3.25 3.25L15.5 7.5z" fill="#fff"/>
              </svg>
            </div>
            <h1 className="text-3xl font-semibold ml-3">Part-time application</h1>
          </div>
          <h2 className="text-2xl font-medium">Start a new application</h2>
          <p className="text-lg text-gray-600 mt-3">There are just 4 steps to the application. It will take you about 15 minutes to complete.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Steps overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StepBox 
              number="1" 
              color="purple" 
              title="School & program" 
              description="Tell us what school you're going to and what program you're taking." 
            />
            <StepBox 
              number="2" 
              color="orange" 
              title="About you" 
              description="Tell us if you're single or married and if you have children. You'll need to provide financial information." 
            />
            <StepBox 
              number="3" 
              color="red" 
              title="About your family" 
              description="You might need to share information about your spouse or children." 
            />
            <StepBox 
              number="4" 
              color="green" 
              title="Submit" 
              description="Review your application, submit it and track the status." 
            />
          </div>

          {/* Form */}
          <form onSubmit={handleNext} className="space-y-6">
            <h3 className="font-medium text-xl mb-4">Ready to apply?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name:</label>
                <input
                  type="text"
                  className="border rounded px-4 py-3 w-full"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Last Name:</label>
                <input
                  type="text"
                  className="border rounded px-4 py-3 w-full"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Email:</label>
                <input
                  type="email"
                  className="border rounded px-4 py-3 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone Number:</label>
                <input
                  type="tel"
                  className="border rounded px-4 py-3 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div>
              <p className="text-lg mb-3">When do your classes start for the current academic year?</p>

              <div className="flex gap-6 max-w-xl">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">Month:</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="border rounded px-4 py-3 w-full"
                    required
                  >
                    <option value="">Select Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">Year:</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border rounded px-4 py-3 w-full"
                    required
                  >
                    <option value="">Select Year</option>
                    {[2024, 2025, 2026, 2027].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="mr-3 h-5 w-5"
                  required
                />
                <label htmlFor="agree" className="text-gray-700">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-5 mt-8">
              <button type="button" className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md border text-lg">
                Exit
              </button>
              <button type="submit" className="px-8 py-3 bg-blue-700 text-white rounded-md text-lg">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function StepBox({ number, color, title, description }) {
  const colorMap = {
    purple: { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-700" },
    orange: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
    red: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-600" },
    green: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-600" },
  };

  return (
    <div className={`border rounded-lg p-5 ${colorMap[color].bg}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`font-bold text-3xl ${colorMap[color].text}`}>{number}</span>
        <span className={`w-4 h-4 rounded-full ${colorMap[color].dot}`}></span>
      </div>
      <p className="font-medium text-lg mb-2">{title}</p>
      <p className="text-base text-gray-700">{description}</p>
      <a href="#" className="text-sm text-blue-600 mt-3 block hover:underline">More info</a>
    </div>
  );
}