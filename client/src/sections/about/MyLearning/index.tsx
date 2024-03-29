import React from "react";
import AppCard from "@crema/components/AppCard";
import AppList from "@crema/components/AppList";
import LearningItem from "./LearningItem";


import { GiFlood } from "react-icons/gi";
import { FaCloudSunRain } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaComments, FaQuoteLeft } from "react-icons/fa";

const MyLearning = () => {
  return (
    <AppCard
      title="Table of Contents"
      contentStyle={{ px: 0 }}
    >
      <AppList
        animation="transition.slideRightBigIn"
        data={learningData}
        renderRow={(data, index) => <LearningItem key={index} course={data} />}
      />
    </AppCard>
  );
};

export default MyLearning;


const learningData = [
  {
      id: 1, 
      desc: "We aim to develop a model that could forecast river behavior using meteorological data.",
      title: "Our Mission",
      icon: <GiFlood style={{ width: 30, height: 30 }} />
  },
  {
      id: 2, 
      desc: "Precipitation, temperature, wind speed, and humidity impacts Marikina River level.",
      title: "The Variables",
      icon: <FaCloudSunRain style={{ width: 30, height: 30 }} />
  },
  {
      id: 3, 
      desc: "We utilized a Transformer architecture to analyze meteorological and hydrological behavior over time.",
      title: "Time Series Forecasting",
      icon: <IoMdAnalytics style={{ width: 30, height: 30 }} />
  },
  {
    id: 3, 
    desc: "The model utilized embedding, self-attention, and neural network layers to estimate Marikina River level.",
    title: "The Auto-Regressive Transformer",
    icon: <HiMiniCpuChip style={{ width: 30, height: 30 }} />
  }
];
