import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import type {DashboardLink, DashboardOverviewTotals} from "../../../Types.ts";
import DashboardViewHeader from "../DashboardViewHeader/DashboardViewHeader.tsx";
import LinkRow from "../LinkRow/LinkRow.tsx";
import {fetchDashboardLinks} from "../../../Api.ts";
import "./OverviewContent.css"

export default function OverviewContent() {
    const [links, setLinks] = useState<DashboardLink[]>([]);
    const [totals, setTotals] = useState<DashboardOverviewTotals>({
        totalClicks: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        fetchDashboardLinks()
            .then((dashboardLinks) => {
                if (active) {
                    setLinks(dashboardLinks);
                    setTotals({
                        totalClicks: dashboardLinks.reduce((sum, link) => sum + link.totalClicks, 0),
                    });
                }
            })
            .catch(() => {
                if (active) {
                    setLinks([]);
                    setTotals({
                        totalClicks: 0,
                    });
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const topPerformingLinks = useMemo(
        () => [...links].sort((a, b) => b.totalClicks - a.totalClicks).slice(0, 10),
        [links],
    );

    const showAnalyticsForLink = (link: DashboardLink) => {
        navigate(`/dashboard/analytics/${encodeURIComponent(link.shortUrl)}`);
    };

    return (
        <>
            <DashboardViewHeader
                title="Overview"
                description="Total performance across your shortened links."
            />

            <section className="overview-grid">
                <article className="overview-card">
                    <span>Total clicks</span>
                    <strong>{totals.totalClicks}</strong>
                </article>
            </section>

            <section className="dashboard-panel">
                <div className="dashboard-panel-header">
                    <div>
                        <h2>Top performing links</h2>
                        <p>Links ranked by total clicks.</p>
                    </div>
                    <span>Clicks</span>
                </div>
                <div className="dashboard-link-list">
                    {topPerformingLinks.map((link) => (
                        <LinkRow
                            key={link.shortUrl}
                            link={link}
                            selected={false}
                            onAnalyticsClick={() => showAnalyticsForLink(link)}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
