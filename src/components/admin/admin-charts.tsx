"use client";

import { useTheme } from "next-themes";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue (₦)",
        data: [
          350000, 420000, 380000, 450000, 520000, 580000, 620000, 710000,
          680000, 750000, 820000, 900000,
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="h-[300px] w-full">
      <Line options={options} data={data} />
    </div>
  );
}

export function BarChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
    },
  };

  const data = {
    labels: [
      "Airport Pickup",
      "Accommodation",
      "Transportation",
      "Tour Guide",
      "Restaurant",
      "Event Tickets",
    ],
    datasets: [
      {
        label: "Bookings",
        data: [42, 35, 28, 22, 18, 15],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  };

  return (
    <div className="h-[300px] w-full">
      <Bar options={options} data={data} />
    </div>
  );
}
