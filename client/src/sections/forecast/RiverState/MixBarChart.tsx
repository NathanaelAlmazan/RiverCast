import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { RiverChartDaumType } from ".";

type Props = {
  data: RiverChartDaumType[];
};
const MixBarChart = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        barSize={7}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" dy={10} />
        <Tooltip labelStyle={{ color: 'black' }} formatter={(value, name, item, idx, payload) => parseFloat(value as string) > 0 ? `${parseFloat(value as string).toFixed(2)}m` : "None"} />
        <Bar dataKey="Forecast" stackId="a" fill="#49BD65" radius={[10, 10, 0, 0]} />
        <Bar dataKey="Actual" stackId="b" fill="#0A8FDC" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MixBarChart;
