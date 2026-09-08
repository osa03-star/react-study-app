import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {dataType} from '../type/type.ts'

type Props = {
  data: dataType[];
};

const TimeChart = ({ data }: Props) => {
  const weeks = ["月", "火", "水", "木", "金", "土", "日"];

  const chartData = weeks.map((day) => {
    const time = data
      .filter((item) => item.day === day)
      .reduce((sum, item) => sum + Number(item.time), 0);

    return {
      day,
      time,
    };
  });


  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="time" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;