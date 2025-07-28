"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Define the course type for TypeScript/JSX
const initialCourses = [
  { id: 1, title: "Full-Stack Web Development", description: "Build modern web apps.", duration: "3 months" },
  { id: 2, title: "Graphics Design", description: "Master design tools.", duration: "2 months" },
  { id: 3, title: "App Development", description: "Create mobile apps.", duration: "4 months" },
];

function FeaturedCourses() {
  const [courses, setCourses] = useState(initialCourses);
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data.slice(0, 3));
        }
      })
      .catch(() => setCourses(initialCourses));
  }, []);
  return (
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8">
      {courses.map((course, idx) => (
        <div
          key={course.id}
          className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-7 flex flex-col justify-between border-t-8 border-cyan-400 hover:scale-105 transition-transform duration-200"
        >
          {/* Recommended badge for the first course */}
          {idx === 0 && (
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">RECOMMENDED</span>
          )}
          <div className="flex-1 flex flex-col items-center text-center">
            <h3 className="text-2xl font-extrabold text-blue-800 mb-2 drop-shadow">{course.title}</h3>
            <p className="text-gray-700 mb-3 text-base">{course.description}</p>
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow">{course.duration}</span>
          </div>
          <Link
            href={`/register/${course.id}`}
            className="mt-4 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-colors text-base text-center"
          >
            Register
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef(null);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-4 sm:px-10 py-4 bg-black bg-opacity-90 fixed top-0 left-0 z-20">
        <div className="flex items-center gap-3">
          <Image src="/qemerlogo.png" alt="Qemer Logo" width={90} height={90} className="rounded-full" />
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 items-center">
          <a href="#" className="text-white text-lg font-semibold hover:text-blue-400 transition">Home</a>
          <a href="#about" className="text-white text-lg font-semibold hover:text-blue-400 transition">About</a>
          <Link href="/contact" className="text-white text-lg font-semibold hover:text-blue-400 transition">Contact</Link>
          <a href="/login" className="text-white text-lg font-bold ml-8 hover:text-cyan-400 transition">Login</a>
          <a href="/courses" className="ml-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition text-base">Browse Courses</a>
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <MobileMenu onContactClick={() => setShowContact(true)} />
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center w-full h-[60vh] min-h-[400px] pt-24 pb-0 sm:pb-0"
        style={{ backgroundImage: 'url(/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-4 w-full max-w-2xl mx-auto pb-10 sm:pb-16">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight break-words" style={{ letterSpacing: '1px' }}>
            <span className="block text-cyan-400">EMPOWERING</span>
            <span className="block text-blue-900">Digital Transformation</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-white font-medium mb-6 sm:mb-8 max-w-xl shadow-lg bg-black bg-opacity-30 rounded-lg px-3 py-2 sm:px-6 sm:py-3">
            Software Technology PLC - Unlock your potential with practical, hands-on tech training.
          </p>
          <Link href="/courses" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-2xl transition text-lg sm:text-xl mb-2 focus:outline-none focus:ring-4 focus:ring-cyan-300 animate-pulse-slow">Browse Courses</Link>
        </div>
        {/* SVG Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 sm:h-20">
            <path fill="#ECF8FE" d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Success Highlight Section */}
      <section className="w-full flex flex-col items-center justify-center py-8 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-extrabold text-cyan-600">20+</span>
            <span className="text-lg font-medium text-gray-700">Batches of Graphics Design</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-extrabold text-blue-700">10+</span>
            <span className="text-lg font-medium text-gray-700">Batches of Web Development</span>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600 text-base sm:text-lg max-w-xl">
          We have successfully trained and certified over 20 batches of Graphics Design and 10 batches of Web Development & Programming trainees.
        </p>
      </section>

      {/* Featured Courses Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-[-60px] z-10 relative">
        <div className="max-w-5xl w-full text-center bg-white rounded-xl shadow-lg p-10 mt-10 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">Featured Courses</h2>
          <FeaturedCourses />
        </div>
      </main>

      {/* Celebration Announcement Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 bg-gradient-to-r from-blue-100 to-cyan-50">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl shadow-xl border-t-8 border-cyan-400">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4 drop-shadow">Celebrating Completion Phase 1!</h2>
            <h3 className="text-xl font-bold text-cyan-700 mb-2">Software Development Training with the Ethiopian Federal Police</h3>
            <p className="text-gray-700 text-lg mb-4">
              We are proud to announce the successful completion of Phase 1 of our software development training in partnership with the Ethiopian Federal Police. This milestone marks a significant step in empowering officers with essential digital skills and advancing digital transformation in Ethiopia.
            </p>
            <p className="text-gray-600 text-base mb-2 italic">Congratulations to all participants and partners for making this achievement possible!</p>
          </div>
          <div className="flex-1 flex justify-center items-center min-h-[220px]">
            <div className="relative z-10">
              <Image
                src="/photo_2025-07-25_13-20-00.jpg"
                alt="Celebration with Ethiopian Federal Police"
                width={320}
                height={220}
                className="rounded-2xl shadow-2xl border-4 border-cyan-200 object-cover"
                style={{ maxHeight: 220, maxWidth: 320 }}
              />
              <div className="absolute bottom-2 left-2 bg-cyan-600 text-white text-xs px-3 py-1 rounded-full shadow-lg opacity-90 font-semibold">Phase 1 Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Skills Training - Adama Announcement Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl shadow-xl border-t-8 border-blue-400">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4 drop-shadow">Other Digital Skills Training - Adama, Ethiopia</h2>
            <h3 className="text-xl font-bold text-cyan-700 mb-2">Day one of our digital skills training, at Adama city, sponsored by Child Fund, was a success!</h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 justify-center items-center">
            <Image
              src="/adama.jpg"
              alt="Digital Skills Training Adama Day 1"
              width={200}
              height={150}
              className="rounded-xl shadow-lg border-4 border-blue-200 object-cover"
              style={{ maxHeight: 150, maxWidth: 200 }}
            />
            <Image
              src="/admp2.jpg"
              alt="Digital Skills Training Adama Day 1 - Group"
              width={200}
              height={150}
              className="rounded-xl shadow-lg border-4 border-blue-200 object-cover"
              style={{ maxHeight: 150, maxWidth: 200 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function MobileMenu({ onContactClick }: { onContactClick?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="text-white focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-20 right-4 bg-black bg-opacity-95 rounded-xl shadow-lg flex flex-col items-end gap-4 p-6 z-50 min-w-[180px]">
          <a href="#" className="text-white text-lg font-semibold hover:text-blue-400 transition">Home</a>
          <Link href="/contact" className="text-white text-lg font-semibold hover:text-blue-400 transition">Contact</Link>
          <a href="#about" className="text-white text-lg font-semibold hover:text-blue-400 transition">About</a>
          <a href="/login" className="text-white text-lg font-bold hover:text-cyan-400 transition">Login</a>
          <a href="/courses" className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition text-base">Browse Courses</a>
        </div>
      )}
    </>
  );
}
