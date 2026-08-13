import {useEffect, useState} from "react";
import {useParams} from "react-router";
import type {DashboardLink} from "../../../Types.ts";
import ClicksLineChart from "./ClicksLineChart/ClicksLineChart.tsx";
import {fetchDashboardLinkAnalytics} from "../../../Api.ts";
import "./AnalyticsContent.css"

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

    useEffect(() => {
        let active = true;

        if (!shortUrl) {
            setSelectedLink(null);
            return;
        }

        fetchDashboardLinkAnalytics(shortUrl)
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
    }, [shortUrl]);

    const displayShortUrl = selectedLink?.shortUrl ?? shortUrl ?? "";
    const dailyClicks = selectedLink?.dailyClicks ?? [];
    const displayedRangeClicks = dailyClicks.reduce((sum, bucket) => sum + bucket.clicks, 0);

    return (
        <>
            <section className="analytics-detail-header">
                <div>
                    <p className="dashboard-eyebrow">Analytics</p>
                    <h1>{displayShortUrl || "Link analytics"}</h1>
                    {displayShortUrl && <a href={displayShortUrl}>{displayShortUrl}</a>}
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
                    <span>Clicks shown</span>
                    <strong>{displayedRangeClicks}</strong>
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
                            <p>Daily click buckets from the analytics endpoint.</p>
                        </div>
                    </div>
                    <ClicksLineChart data={dailyClicks} />
                </article>

                <article className="dashboard-panel analytics-secondary-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>Referrers</h2>
                            <p>Reserved for source breakdowns.</p>
                        </div>
                    </div>
                </article>

                <article className="dashboard-panel analytics-secondary-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>Devices</h2>
                            <p>Reserved for device analytics.</p>
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}
