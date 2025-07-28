"use client";
import Link from "next/link";
import { Menu } from "@headlessui/react";

const navLinks = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Courses", href: "/admin/dashboard/courses" },
  { name: "Students", href: "/admin/dashboard/students" },
];

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50 font-sans">
      {/* Top Navbar */}
      <header className="h-16 bg-white/80 backdrop-blur shadow flex items-center px-4 md:px-8 justify-between sticky top-0 z-20">
        <span className="text-lg font-bold text-blue-800 tracking-tight">Student Registration System</span>
        {/* Profile Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition shadow-sm">
            <img src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff" alt="avatar" className="w-8 h-8 rounded-full border-2 border-blue-200" />
            <span className="font-medium text-blue-700 hidden sm:block">Admin</span>
            <svg width="20" height="20" fill="currentColor" className="text-blue-700"><path d="M7 10l5 5 5-5z"/></svg>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl shadow-lg focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`block px-4 py-2 text-sm text-gray-700 rounded ${active ? "bg-blue-50" : ""}`}>Profile</a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="/admin/login" className={`block px-4 py-2 text-sm text-red-600 rounded ${active ? "bg-red-50" : ""}`}>Logout</a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-200/80 via-white to-blue-100/80 shadow-xl flex flex-col p-6 space-y-4 border-r border-blue-100 min-h-screen">
          <div className="text-2xl font-bold text-blue-700 mb-8">Admin Panel</div>
          <nav className="flex flex-col gap-2 mt-2">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="py-2 px-4 rounded-lg hover:bg-blue-200/70 text-blue-800 font-medium transition">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link href="/admin/login" className="block py-2 px-4 rounded-lg bg-red-100 text-red-700 font-medium text-center hover:bg-red-200 transition shadow">Logout</Link>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen overflow-x-auto">
          <div className="w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
} 