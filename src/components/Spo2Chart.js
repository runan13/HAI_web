import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const Canvas = styled.div`
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 400px;
`;

const categories = ["Max SpO2", "Min SpO2", "Avg SpO2"].reverse();

function Spo2Chart(spo2) {
  const obj = Object.values(spo2);
  console.log(obj);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: null,
    },
    xAxis: [
      {
        categories: categories,
        reversed: false,
        labels: {
          align: "center",
          step: 1,
          reserveSpace: false,
          x: -5,
          style: {
            fontSize: "12px",
            color: "black",
          },
        },
        lineWidth: 0,
        tickLength: 0,
        left: "50%",
      },
    ],
    yAxis: [
      {
        title: {
          text: null,
        },
        labels: {
          format: "{value}%",
          style: {
            fontSize: "11px",
          },
        },
        reversed: true,
        left: 0,
        width: "45%",
        offset: 0,
        min: 0,
        max: 100,
      },
      {
        title: {
          text: null,
        },
        labels: {
          format: "{value}%",
          style: {
            fontSize: "11px",
          },
        },
        left: "55%",
        width: "45%",
        offset: 0,
        min: 0,
        max: 100,
      },
    ],
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    tooltip: {
      backgroundColor: "#fff",
      borderColor: "black",
      borderRadius: 10,
      borderWidth: 1,
    },
    series: [
      {
        name: "이전 SpO2",
        data: [30.2, 87.5, 51.7].reverse(),
      },
      {
        name: "현재 SpO2",
        data: [69.8, 12.5, 48.3].reverse(),
        yAxis: 1,
      },
    ],
  };

  return (
    <>
      <Section>
        <Container>
          <Title>SpO2 측정값 비교</Title>
          <Canvas>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Canvas>
        </Container>
      </Section>
    </>
  );
}

export default Spo2Chart;
