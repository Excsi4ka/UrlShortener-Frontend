import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import type {DeviceClickBucket} from "../../../../Types.ts";

const DEVICE_COLORS = ["#0c246c", "#2556b8", "#50a1da", "#9bb8ff"];

function formatDeviceType(deviceType: string) {
    return deviceType.toLowerCase().replace(/^\w/, (character) => character.toUpperCase());
}

export default function DevicesPieChart({data}: { data: DeviceClickBucket[] }) {
    const totalClicks = data.reduce((sum, bucket) => sum + bucket.clicks, 0);
    const chartData = data
        .filter((bucket) => bucket.clicks > 0)
        .map((bucket) => {
            const percentage = totalClicks === 0 ? 0 : Math.round((bucket.clicks / totalClicks) * 100);
            const deviceLabel = formatDeviceType(bucket.deviceType);

            return {
                ...bucket,
                deviceLabel,
                legendLabel: `${deviceLabel} (${percentage}%)`,
                percentage,
            };
        });

    if (chartData.length === 0) {
        return <div className="analytics-empty-state">No device data yet.</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={260}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="clicks"
                    nameKey="legendLabel"
                    cx="50%"
                    cy="45%"
                    outerRadius={82}
                    innerRadius={48}
                    paddingAngle={3}
                    label={(props) => {
                        const payload = props.payload as {percentage?: number} | undefined;

                        return `${payload?.percentage ?? 0}%`;
                    }}
                    labelLine={false}
                >
                    {chartData.map((bucket, index) => (
                        <Cell key={bucket.deviceType} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => [value, "Clicks"]}
                    contentStyle={{
                        border: "1px solid rgba(12, 36, 108, 0.12)",
                        borderRadius: "0.75rem",
                        boxShadow: "0 0.75rem 1.5rem rgba(12, 36, 108, 0.12)",
                    }}
                />
                <Legend
                    iconType="circle"
                    wrapperStyle={{
                        color: "#60708a",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        paddingTop: "0.5rem",
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}
