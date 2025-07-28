"use client";
import { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import { FaRegEye, FaRegEdit, FaRegTrashAlt, FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const courses = [
  "All Courses",
  "Full-Stack Web Development",
  "Graphics Design",
  "App Development",
];

const activityLogs = [
  { time: "09:00", activity: "Admin approved John Doe's registration." },
  { time: "10:15", activity: "New student registered: Jane Smith." },
  { time: "11:30", activity: "Admin rejected Jane Smith's registration." },
  { time: "12:00", activity: "New course added: App Development." },
];

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const router = useRouter();

  // Fetch students from API
  useEffect(() => {
    fetch("/api/students").then(res => res.json()).then(setStudents);
  }, []);

  // Fetch registration data for chart
  useEffect(() => {
    fetch("/api/registration")
      .then(res => res.json())
      .then((registrations) => {
        // Group by date
        const counts = {};
        registrations.forEach((reg) => {
          const date = new Date(reg.createdAt).toLocaleDateString();
          counts[date] = (counts[date] || 0) + 1;
        });
        // Sort by date
        const sortedDates = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
        let runningTotal = 0;
        const cumulative = sortedDates.map(date => {
          runningTotal += counts[date];
          return runningTotal;
        });
        setChartData({
          labels: sortedDates,
          datasets: [
            {
              label: "Registrations",
              data: cumulative,
              fill: true,
              backgroundColor: "rgba(59,130,246,0.1)",
              borderColor: "#2563eb",
              tension: 0.4,
            },
          ],
        });
      });
  }, []);

  const handleStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase());
    const matchesCourse =
      filter === "All Courses" || s.course === filter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            className="border rounded-lg px-4 py-2 flex-1 min-w-0"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Students Table */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
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
                <td className="px-4 py-2">{student.course}</td>
                <td className="px-4 py-2">{student.registrationDate ? new Date(student.registrationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                <td className="px-4 py-2 flex gap-2 items-center">
                  <Link href={`/admin/dashboard/students/${student.id}`} title="View Detail">
                    <FaRegEye className="text-blue-500 hover:text-blue-700" />
                  </Link>
                  <button
                    title="Edit"
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => router.push(`/admin/dashboard/students/${student.id}?edit=1`)}
                  >
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
      {/* Visual Stats Section (Chart and Activity Log) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-4 md:p-6 col-span-2 flex flex-col">
          <h2 className="text-lg font-bold text-blue-700 mb-2">Registrations Growth</h2>
          <div className="w-full h-48 md:h-64 flex items-center">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top', labels: { color: '#2563eb', font: { weight: 'bold' } } },
                  title: { display: true, text: 'Cumulative Student Registrations', color: '#2563eb', font: { size: 18, weight: 'bold' } },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: {
                    title: { display: true, text: 'Date', color: '#2563eb', font: { weight: 'bold' } },
                    grid: { color: '#e0e7ef' },
                    ticks: { color: '#2563eb' },
                  },
                  y: {
                    title: { display: true, text: 'Registrations', color: '#2563eb', font: { weight: 'bold' } },
                    beginAtZero: true,
                    grid: { color: '#e0e7ef' },
                    ticks: { color: '#2563eb', stepSize: 1 },
                  },
                },
                elements: {
                  line: { borderWidth: 4, borderColor: '#2563eb', backgroundColor: ctx => {
                    const chart = ctx.chart;
                    const {ctx: c, chartArea} = chart;
                    if (!chartArea) return null;
                    const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(59,130,246,0.2)');
                    gradient.addColorStop(1, 'rgba(59,130,246,0.01)');
                    return gradient;
                  } },
                  point: { radius: 6, backgroundColor: '#2563eb', borderColor: '#fff', borderWidth: 2 },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col">
          <h2 className="text-lg font-bold text-blue-700 mb-2">Activity Log</h2>
          <ul className="divide-y divide-blue-50">
            {activityLogs.map((log, idx) => (
              <li key={idx} className="py-2 text-sm text-gray-700 flex gap-2 items-center">
                <span className="text-xs text-blue-500 font-mono w-12">{log.time}</span>
                <span>{log.activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
