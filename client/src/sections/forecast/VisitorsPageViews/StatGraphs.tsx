import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { ForecastActualType } from '.';

type Props = {
  data: ForecastActualType[];
};

const StatGraphs = ({ data = [] }: Props) => {
  const theme = useTheme();
  return (
    <ResponsiveContainer width='100%' height={260}>
      <LineChart
        data={data}
        margin={{ top: 50, right: 0, left: -25, bottom: 0 }}
      >
        <XAxis
          dataKey='Datetime'
          tickLine={false}
          axisLine={false}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis 
          type="number" 
          domain={[Math.min(...data.map(obj => obj.Forecast)) - 2, Math.max(...data.map(obj => obj.Forecast)) + 2]}
          tickLine={false}
          axisLine={false}
          hide
        />
        <Tooltip
          labelStyle={{ color: 'black' }}
          formatter={(value, name, item, idx, payload) => parseFloat(value as string) > 0 ? `${parseFloat(value as string).toFixed(2)}m` : "None"}
          contentStyle={{
            borderRadius: 12,
            borderColor: '#31354188',
            background: '#FFFFFFCA',
          }}
        />
        <CartesianGrid stroke='#eee' horizontal={true} vertical={false} />
        <Line
          type='monotone'
          dataKey='Forecast'
          stroke={theme.palette.primary.main}
          dot={false}
          strokeWidth={2}
          activeDot={{ r: 4 }}
        />
        <Line
          type='monotone'
          dot={false}
          strokeWidth={2}
          dataKey='Actual'
          stroke={theme.palette.secondary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatGraphs;

StatGraphs.propTypes = {
  data: PropTypes.array,
};
