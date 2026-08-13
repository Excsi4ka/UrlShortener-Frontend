import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type {CountryClickBucket} from "../../../../Types.ts";

function formatCountryCode(countryCode: string) {
    return countryCode === "ZZ" ? "Unknown" : countryCode;
}

export default function CountriesBarChart({data}: { data: CountryClickBucket[] }) {
    const sortedData = [...data]
        .sort((a, b) => b.clicks - a.clicks)
        .map((bucket) => ({
            ...bucket,
            countryLabel: formatCountryCode(bucket.countryCode),
        }));

    if (sortedData.length === 0) {
        return <div className="analytics-empty-state">No country data yet.</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart
                data={sortedData}
                layout="vertical"
                margin={{top: 8, right: 18, bottom: 8, left: 8}}
            >
                <CartesianGrid stroke="rgba(12, 36, 108, 0.1)" horizontal={false} />
                <XAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: "#60708a", fontSize: 12}}
                />
                <YAxis
                    dataKey="countryLabel"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: "#60708a", fontSize: 12, fontWeight: 700}}
                    width={72}
                />
                <Tooltip
                    formatter={(value) => [value, "Clicks"]}
                    labelFormatter={(label) => `Country: ${label}`}
                    contentStyle={{
                        border: "1px solid rgba(12, 36, 108, 0.12)",
                        borderRadius: "0.75rem",
                        boxShadow: "0 0.75rem 1.5rem rgba(12, 36, 108, 0.12)",
                    }}
                />
                <Bar dataKey="clicks" fill="#2556b8" radius={[0, 10, 10, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
