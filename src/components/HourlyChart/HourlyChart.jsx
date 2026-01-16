import { useEffect, useState, useRef } from "react";
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
  const chartContainerRef = useRef(null);
  const [chartColors, setChartColors] = useState({
    text: "#000000",
    grid: "#d2d2d2",
  });

  const updateChartColors = () => {
    if (chartContainerRef.current) {
      const computedStyle = getComputedStyle(chartContainerRef.current);
      const textColor = computedStyle
        .getPropertyValue("--HourlyChart-text")
        .trim();
      const gridColor = computedStyle
        .getPropertyValue("--HourlyChart-grid")
        .trim();

      setChartColors({
        text: textColor || "#000000",
        grid: gridColor || "#d2d2d2",
      });
    }
  };

  useEffect(() => {
    updateChartColors();

    const observer = new MutationObserver(() => {
      setTimeout(updateChartColors, 10);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
          color: chartColors.text,
          font: { size: 14 },
        },
        grid: {
          color: chartColors.grid,
          lineWidth: 1,
        },
      },
      y: {
        ticks: {
          color: chartColors.text,
          callback: (value) => value + "°C",
          font: { size: 14 },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: chartColors.text,
        },
      },
    },
  };

  return (
    <Container>
      <div className={styles.HourlyChart} ref={chartContainerRef}>
        <h2 className={styles.HourlyChart_title}>Hourly forecast</h2>
        <Line key={chartColors.text} data={chartData} options={options} />
      </div>
    </Container>
  );
};
