"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function StudentDetailPage() {
  const { studentId } = useParams();
  const searchParams = useSearchParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", status: "" });
  const router = useRouter();

  useEffect(() => {
    if (!studentId) return;
    fetch(`/api/students?id=${studentId}`)
      .then(res => res.json())
      .then(data => {
        const s = Array.isArray(data) ? data[0] : data;
        setStudent(s);
        setForm({ name: s?.name || "", email: s?.email || "", status: s?.status || "" });
        setLoading(false);
      });
  }, [studentId]);

  useEffect(() => {
    if (searchParams.get("edit") === "1") setEditing(true);
  }, [searchParams]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await fetch(`/api/students?registrationId=${student.registrationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditing(false);
    location.reload();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student registration?")) return;
    await fetch(`/api/students?registrationId=${student.registrationId}`, { method: "DELETE" });
    router.push("/admin/dashboard");
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student Detail</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Course ID:</strong> {student.courseId}</p>
        <p><strong>Registered At:</strong> {student.registrationDate ? new Date(student.registrationDate).toLocaleDateString() : '-'}</p>
        <div className="flex gap-4 mt-4">
          <button className="bg-yellow-400 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && (
        <form className="mt-6 bg-gray-50 p-4 rounded-xl shadow space-y-4" onSubmit={handleEdit}>
          <h2 className="text-lg font-bold">Edit Student</h2>
          <div>
            <label className="block font-medium">Name</label>
            <input className="border rounded px-3 py-2 w-full" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input className="border rounded px-3 py-2 w-full" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <select className="border rounded px-3 py-2 w-full" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
} 