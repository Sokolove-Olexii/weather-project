import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "../Container/Container";
import styles from "./HourlyChart.module.scss";
import { colors } from "@mui/material";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export const HourlyChart = ({ data }) => {
  const oneDayData = data.slice(0, 24);

  const chartData = {
    labels: oneDayData.map((item) => item.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: oneDayData.map((item) => item.temp),
        borderWidth: 3,
        borderColor: "rgba(255, 179, 108, 1)",
        tension: 0.3,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#000",
          font: { size: 14 },
        },
        grid: {
          color: "#d2d2d2",
          lineWidth: 1,
        },
      },
      y: {
        ticks: {
          color: "#000",
          callback: (value) => value + "°C",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <Container>
      <div className={styles.HourlyChart}>
        <h2 className={styles.HourlyChart_title}>Hourly forecast</h2>
        <Line data={chartData} options={options} />
      </div>
    </Container>
  );
};
