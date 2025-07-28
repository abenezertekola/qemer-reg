"use client";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", duration: "" });

  useEffect(() => {
    fetch("/api/courses").then(res => res.json()).then(setCourses);
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newCourse = await res.json();
    setCourses([...courses, newCourse]);
    setShowForm(false);
    setForm({ title: "", description: "", category: "", duration: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Courses</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow">Add Course</button>
      </div>
      {showForm && (
        <form onSubmit={handleAddCourse} className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col gap-4 max-w-md">
          <input className="border rounded-lg px-4 py-2" placeholder="Course Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          <input className="border rounded-lg px-4 py-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
          <input className="border rounded-lg px-4 py-2" placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
          <input className="border rounded-lg px-4 py-2" placeholder="Duration" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={idx} className="bg-blue-50 even:bg-white">
                <td className="px-4 py-2">{course.id}</td>
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">{course.description}</td>
                <td className="px-4 py-2">{course.category}</td>
                <td className="px-4 py-2">{course.duration}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
