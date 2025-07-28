"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  function formatDescription(description) {
    // If the description contains line breaks or semicolons, split into bullet points
    if (description.includes('\n') || description.includes(';')) {
      return (
        <ul className="text-left mt-2 space-y-2">
          {description.split(/\n|;/).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700 text-base">
              <span className="text-green-500 mt-1">&#10003;</span>
              <span>{item.trim()}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700 mb-3 text-base">{description}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Stepper and Back Button at the top */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 mx-auto mt-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-5 py-2 bg-white rounded-xl shadow border border-gray-200 hover:bg-blue-50 transition text-lg font-medium text-black focus:outline-none"
        >
          <span className="text-2xl">&#8617;</span>
          <span>back</span>
        </button>
        {/* Stepper */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full font-bold text-white mb-1 bg-cyan-500">1</div>
            <span className="text-xs sm:text-sm text-center text-cyan-600 font-semibold">Select Course</span>
          </div>
          <div className="w-20 h-1 bg-gray-200 mx-2" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full font-bold text-white mb-1 bg-gray-300">2</div>
            <span className="text-xs sm:text-sm text-center text-gray-500">Register</span>
          </div>
        </div>
      </div>
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Available Courses</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-7 flex flex-col justify-between border-t-8 border-cyan-400 hover:scale-105 transition-transform duration-200"
            >
              {/* Popular badge for the first course */}
              {idx === 0 && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">POPULAR</span>
              )}
              <div className="flex-1 flex flex-col items-center text-center">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-2 drop-shadow">{course.title}</h3>
                {/* Price or Duration */}
                <span className="text-2xl font-bold text-cyan-700 mb-2">
                  {course.price ? `$${course.price}` : course.duration}
                </span>
                {/* Payment plans badge */}
                <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                  Payment plans available
                </span>
                {/* Description as bullet points if possible */}
                {formatDescription(course.description)}
                <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold mt-4 shadow">{course.duration}</span>
              </div>
              <Link
                href={`/register/${course.id}`}
                className="mt-6 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-colors text-base text-center"
              >
                Register
              </Link>
            </div>
          ))}
        </div>
        </div>
      </main>
    </div>
  );
}
