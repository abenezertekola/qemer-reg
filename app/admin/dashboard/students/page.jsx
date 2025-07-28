"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/students").then(res => res.json()).then(setStudents);
    fetch("/api/courses").then(res => res.json()).then(setCourses);
  }, []);

  const filtered = students.filter(s =>
    (!search || s.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || s.courseId === Number(filter))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Students</h1>
        <div className="flex gap-2">
          <input
            className="border rounded-lg px-4 py-2"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr key={idx} className="bg-blue-50 even:bg-white">
                <td className="px-4 py-2">
                  <Link href={`/admin/dashboard/students/${student.id}`} className="font-bold hover:underline">
                    {student.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{courses.find(c => c.id === student.courseId)?.title || '-'}</td>
                <td className="px-4 py-2">{student.registrationDate ? new Date(student.registrationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'APPROVED' ? 'bg-green-100 text-green-700' : student.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{student.status}</span>
                </td>
                <td className="px-4 py-2 flex gap-2 items-center">
                  <Link href={`/admin/dashboard/students/${student.id}`} title="View Detail">
                    <FaRegEye className="text-blue-500 hover:text-blue-700" />
                  </Link>
                  <button title="Edit" className="text-yellow-500 hover:text-yellow-700">
                    <FaRegEdit />
                  </button>
                  <button title="Delete" className="text-red-500 hover:text-red-700">
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
