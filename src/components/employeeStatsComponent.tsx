import { useEffect, useState } from "react";
import { AdminAuthContextInterface } from "../types/types";
import { profileService } from "../services/profileService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EmployeeStatsProps {
  admin: AdminAuthContextInterface;
}

export const EmployeeStatsComponent = ({ admin }: EmployeeStatsProps) => {
  const [employeeStats, setEmployeeStats] = useState<{
    totalNumberOfEmployees: number;
    departments: { count: number; department: string }[];
  } | null>(null);

  const { fetchEmployeeStats } = profileService;
  const accessToken = admin.token;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await fetchEmployeeStats(accessToken);
        setEmployeeStats(stats);
      } catch (error) {
        console.error("Error fetching employee stats:", error);
      }
    };
    fetchStats();
  }, [accessToken, fetchEmployeeStats]);

  const chartData = employeeStats
    ? {
        labels: employeeStats.departments.map((dept) => dept.department),
        datasets: [
          {
            label: "Number of Employees",
            data: employeeStats.departments.map((dept) => dept.count),
            backgroundColor: [
              "#4CAF50",
              "#FF9800",
              "#2196F3",
              "#F44336",
              "#9C27B0",
            ],
            borderColor: "#ddd",
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Employees per Department",
      },
    },
  };

  return (
    <div>
      <h3>Employee Statistics</h3>
      {employeeStats ? (
        <div>
          <p>Total Number of Employees: {employeeStats.totalNumberOfEmployees}</p>
          <div style={{ maxWidth: "600px", margin: "auto" }}>
            <Bar data={chartData!} options={chartOptions} />
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};
