"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Back Button at the top */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 mx-auto mt-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-5 py-2 bg-white rounded-xl shadow border border-gray-200 hover:bg-blue-50 transition text-lg font-medium text-black focus:outline-none"
        >
          <span className="text-2xl">&#8617;</span>
          <span>back</span>
        </button>
        <h2 className="text-3xl font-bold text-blue-700 text-center flex-1">Contact Us</h2>
        <div className="w-24" /> {/* Spacer for alignment */}
      </div>
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-xl shadow-lg bg-white">
          {/* Left: Contact Info */}
          <div className="space-y-10">
            <div className="flex items-start gap-4">
              <span className="text-3xl text-cyan-400">@</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Email & Phone</h3>
                <div className="text-gray-700">contactus@qemertech.com</div>
                <div className="text-gray-700">+251912970734</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-cyan-400">📍</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Our Location</h3>
                <div className="text-gray-700">Sherifa BLDG 8th floor, Meskel flower, Addis Ababa</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-cyan-400">🔔</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Project Inquiry</h3>
                <div className="text-gray-700">+251975491734</div>
                <div className="text-gray-700">+251912970734</div>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name*" className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
              <input type="email" placeholder="E-mail Address*" className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            </div>
            <input type="text" placeholder="Subject*" className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            <textarea placeholder="Message" rows={5} className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-900 text-white font-bold rounded-lg shadow-lg hover:from-cyan-500 hover:to-blue-800 transition">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  );
} 