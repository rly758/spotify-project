import { useEffect } from "react";
import styles from "../styles/FeatureChart.module.scss";
import { Chart } from "chart.js/auto";

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

function FeatureChart(props) {
  //console.log("props: ", props.features);
  useEffect(() => {
    let chart;

    function createDataset(features) {
      const dataset = {};
      properties.forEach((prop) => {
        dataset[prop] = features[prop] ? features[prop] : 0;
      });

      return dataset;
    }

    function createChart(dataset) {
      const ctx = document.getElementById("chart");
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.3)",
                "rgba(255, 159, 64, 0.3)",
                "rgba(255, 206, 86, 0.3)",
                "rgba(75, 192, 192, 0.3)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(104, 132, 245, 0.3)",
                "rgba(153, 102, 255, 0.3)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(104, 132, 245, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Audio Features",
              font: { family: "Circular std, sans-serif", size: 18 },
              color: "#ffffff",
              padding: 30,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              ticks: {
                color: "#ffffff",
              },
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              ticks: {
                color: "#ffffff",
              },
            },
          },
          maintainAspectRatio: true,
          aspectRatio: 1,
          responsive: true,
        },
      });
    }

    const dataset = createDataset(props.features);
    createChart(dataset);

    return () => {
      chart.destroy();
    };
  }, [props]);

  return (
    <div className={styles.container}>
      <canvas id="chart"></canvas>
    </div>
  );
}

export default FeatureChart;
