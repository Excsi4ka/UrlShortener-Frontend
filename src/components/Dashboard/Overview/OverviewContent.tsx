import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import type {ListLink} from "../../../Types.ts";
import DashboardViewHeader from "../DashboardViewHeader/DashboardViewHeader.tsx";
import LinkRow from "../LinkRow/LinkRow.tsx";
import {fetchTodaysTopLink} from "../../../Api.ts";
import "./OverviewContent.css"

export default function OverviewContent() {
    const [links, setLinks] = useState<ListLink[]>([]);
    const [totals, setTotals] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopLinksToday = async () => {
            try {
                const links: ListLink[] = await fetchTodaysTopLink();
                setLinks(links);
                const totalClicksToday = links.reduce((sum, link) => sum + link.clicks, 0);
                setTotals(totalClicksToday);
            } catch (error) {
                console.error(error);
            }
        }
        void fetchTopLinksToday();
    }, []);

    const topPerformingLinks = useMemo(
        () => [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 10),
        [links],
    );

    const showAnalyticsForLink = (link: string) => {
        navigate(`/dashboard/analytics/${encodeURIComponent(link)}`);
    };

    return (
        <>
            <DashboardViewHeader
                title="Overview"
                description="Your top performing links today."
            />

            <section className="overview-grid">
                <article className="overview-card">
                    <span>Total Daily Clicks</span>
                    <strong>{totals}</strong>
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
                            shortUrl={link.shortUrl}
                            longUrl={link.longUrl}
                            dateCreated={link.creationDate}
                            clicks={link.clicks}
                            selected={false}
                            onAnalyticsClick={() => showAnalyticsForLink(link.shortUrl)}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
