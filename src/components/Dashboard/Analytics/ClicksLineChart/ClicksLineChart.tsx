import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type {DailyClickBucket} from "../../../../Types.ts";

export default function ClicksLineChart({data}: { data: DailyClickBucket[] }) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{top: 12, right: 18, bottom: 8, left: -16}}>
                <CartesianGrid stroke="rgba(12, 36, 108, 0.1)" vertical={false} />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: "#60708a", fontSize: 12}}
                />
                <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: "#60708a", fontSize: 12}}
                />
                <Tooltip
                    contentStyle={{
                        border: "1px solid rgba(12, 36, 108, 0.12)",
                        borderRadius: "0.75rem",
                        boxShadow: "0 0.75rem 1.5rem rgba(12, 36, 108, 0.12)",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#2556b8"
                    strokeWidth={3}
                    dot={{fill: "#ffffff", r: 4, stroke: "#2556b8", strokeWidth: 2}}
                    activeDot={{r: 6}}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
