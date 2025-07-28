"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage({ params }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState(null);
  const router = useRouter();
  const { courseId } = params;

  useEffect(() => {
    fetch(`/api/courses?id=${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourse(Array.isArray(data) ? data[0] : data))
      .catch(() => setCourse(null));
  }, [courseId]);

  const steps = [
    "Personal Info",
    "Contact Details",
    "Review",
    "Success"
  ];

  const handleNext = (e) => {
    e && e.preventDefault();
    if (step === 1 && (!name || !email)) return setError("Please fill in all fields.");
    if (step === 2 && !phone) return setError("Please enter your phone number.");
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, courseId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setStep(4);
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white mb-1 ${step === idx + 1 ? 'bg-cyan-500' : idx + 1 < step ? 'bg-blue-400' : 'bg-gray-300'}`}>{idx + 1}</div>
              <span className={`text-xs sm:text-sm text-center ${step === idx + 1 ? 'text-cyan-600 font-semibold' : 'text-gray-500'}`}>{label}</span>
              {idx < steps.length - 1 && <div className="w-full h-1 bg-gray-200 mt-1 mb-1" />}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register for {course ? course.title : `Course #${courseId}`}</h2>
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div className="flex justify-between">
              <button type="button" className="text-blue-600 font-semibold" onClick={() => router.back()}>Back</button>
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors">Next</button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div className="flex justify-between">
              <button type="button" className="text-blue-600 font-semibold" onClick={handleBack}>Back</button>
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors">Next</button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="mb-2"><span className="font-semibold text-gray-700">Full Name:</span> {name}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Email:</span> {email}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Phone:</span> {phone}</div>
              <div><span className="font-semibold text-gray-700">Course:</span> {course ? course.title : `Course #${courseId}`}</div>
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div className="flex justify-between">
              <button type="button" className="text-blue-600 font-semibold" onClick={handleBack}>Back</button>
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors" disabled={loading}>{loading ? "Registering..." : "Confirm & Register"}</button>
            </div>
          </form>
        )}
        {step === 4 && (
          <div className="text-green-600 text-center font-semibold text-lg">Registration successful! We will contact you soon.</div>
        )}
      </div>
    </div>
  );
}
