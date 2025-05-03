import { useNavigate } from "react-router-dom"

export default function SummaryPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 border rounded shadow bg-white text-center">
      <div className="flex flex-col items-center justify-center">
        <svg className="mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#16a34a" />
          <path d="M17 9l-5.25 6L7 11.5l1.5-1.5 3.25 3.25L15.5 7.5z" fill="#fff" />
        </svg>
        <h1 className="text-2xl font-bold mb-2 text-green-700">Application Submitted!</h1>
        <p className="text-gray-700 mb-6">Thank you for submitting your OSAP part-time application.<br />We have received your information and will process your application soon.</p>
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}