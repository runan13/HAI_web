import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  width: 1000%;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Spo2Chart = (value) => {
  const dataBar = {
    labels: [
      "1회",
      "2회",
      "3회",
      "4회",
      "5회",
      "6회",
      "7회",
      "8회",
      "9회",
      "10회",
    ],
    datasets: [
      {
        label: "수축기 혈압",
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,0,0,0.6)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: value.bpUp,
      },
      {
        label: "이완기 혈압",
        backgroundColor: "rgba(43,202,255,0.4)",
        borderColor: "rgba(43,202,255,0.4)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(43,202,255,0.6)",
        hoverBorderColor: "rgba(43,202,255,1)",
        data: value.bpDown,
      },
    ],
  };

  const optionsChart = {
    legend: {
      display: true,
      position: "top",
      labels: {
        fontColor: "#262626",
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontColor: "black",
            min: 40,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "black",
          },
        },
      ],
    },
    tooltips: {
      mode: "label",
    },
  };

  return (
    <Section>
      <Container>
        <Title>최근 측정 SpO2값으로 예측한 혈압</Title>
        <Bar data={dataBar} options={optionsChart} width={100} height={50} />
      </Container>
    </Section>
  );
};

export default Spo2Chart;
