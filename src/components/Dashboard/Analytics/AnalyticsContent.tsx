import {useEffect, useState} from "react";
import {useParams} from "react-router";
import type {CountryClickBucket, DashboardLink, DeviceClickBucket} from "../../../Types.ts";
import ClicksLineChart from "./ClicksLineChart/ClicksLineChart.tsx";
import CountriesBarChart from "./CountriesBarChart/CountriesBarChart.tsx";
import DevicesPieChart from "./DevicesPieChart/DevicesPieChart.tsx";
import {
    fetchDashboardLinkAnalytics,
    fetchDashboardLinkCountryAnalytics,
    fetchDashboardLinkDeviceAnalytics,
} from "../../../Api.ts";
import "./AnalyticsContent.css"

type ChartRangeDays = 7 | 30;

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export default function AnalyticsContent() {
    const {shortUrl} = useParams();
    const [selectedLink, setSelectedLink] = useState<DashboardLink | null>(null);
    const [countryAnalytics, setCountryAnalytics] = useState<CountryClickBucket[]>([]);
    const [deviceAnalytics, setDeviceAnalytics] = useState<DeviceClickBucket[]>([]);
    const [chartRangeDays, setChartRangeDays] = useState<ChartRangeDays>(30);

    useEffect(() => {
        let active = true;

        if (!shortUrl) {
            setSelectedLink(null);
            return;
        }

        fetchDashboardLinkAnalytics(shortUrl, chartRangeDays)
            .then((link) => {
                if (active) {
                    setSelectedLink(link);
                }
            })
            .catch(() => {
                if (active) {
                    setSelectedLink(null);
                }
            });

        return () => {
            active = false;
        };
    }, [shortUrl, chartRangeDays]);

    useEffect(() => {
        let active = true;

        if (!shortUrl) {
            setCountryAnalytics([]);
            setDeviceAnalytics([]);
            return;
        }

        Promise.all([
            fetchDashboardLinkCountryAnalytics(shortUrl),
            fetchDashboardLinkDeviceAnalytics(shortUrl),
        ])
            .then(([countries, devices]) => {
                if (active) {
                    setCountryAnalytics(countries);
                    setDeviceAnalytics(devices);
                }
            })
            .catch(() => {
                if (active) {
                    setCountryAnalytics([]);
                    setDeviceAnalytics([]);
                }
            });

        return () => {
            active = false;
        };
    }, [shortUrl]);

    const displayShortUrl = selectedLink?.shortUrl ?? shortUrl ?? "";
    const dailyClicks = selectedLink?.dailyClicks ?? [];
    const shortLinkUrl = `${window.location.origin}/${displayShortUrl}`;

    return (
        <>
            <section className="analytics-detail-header">
                <div>
                    <p className="dashboard-eyebrow">Analytics</p>
                    <h1>{shortLinkUrl || "Link analytics"}</h1>
                </div>
                <div className="selected-link-meta">
                    <span>Created</span>
                    <strong>{selectedLink ? formatDate(selectedLink.dateCreated) : "—"}</strong>
                </div>
            </section>

            <section className="analytics-summary-grid">
                <article className="analytics-stat-card">
                    <span>Total clicks</span>
                    <strong>{selectedLink?.totalClicks ?? 0}</strong>
                </article>
                <article className="analytics-stat-card">
                    <span>Today's clicks</span>
                    <strong>{selectedLink?.todayClicks ?? 0}</strong>
                </article>
                <article className="analytics-stat-card wide">
                    <span>Destination</span>
                    <strong>{selectedLink?.longUrl ?? "—"}</strong>
                </article>
            </section>

            <section className="analytics-grid">
                <article className="dashboard-panel clicks-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>Clicks by day</h2>
                            <p>Daily click buckets for the past {chartRangeDays} days.</p>
                        </div>
                        <div className="chart-range-actions" aria-label="Chart date range">
                            <button
                                className={`chart-range-button ${chartRangeDays === 7 ? "active" : ""}`}
                                onClick={() => setChartRangeDays(7)}
                                type="button"
                                aria-pressed={chartRangeDays === 7}
                            >
                                7 days
                            </button>
                            <button
                                className={`chart-range-button ${chartRangeDays === 30 ? "active" : ""}`}
                                onClick={() => setChartRangeDays(30)}
                                type="button"
                                aria-pressed={chartRangeDays === 30}
                            >
                                30 days
                            </button>
                        </div>
                    </div>
                    <ClicksLineChart data={dailyClicks} />
                </article>

                <article className="dashboard-panel analytics-secondary-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>Countries</h2>
                            <p>Clicks grouped by country code.</p>
                        </div>
                    </div>
                    <CountriesBarChart data={countryAnalytics} />
                </article>

                <article className="dashboard-panel analytics-secondary-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>Devices</h2>
                            <p>Click share by device type.</p>
                        </div>
                    </div>
                    <DevicesPieChart data={deviceAnalytics} />
                </article>
            </section>
        </>
    )
}
