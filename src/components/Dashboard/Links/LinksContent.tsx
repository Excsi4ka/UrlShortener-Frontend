import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import type {DashboardLink, SortMode} from "../../../Types.ts";
import DashboardViewHeader from "../DashboardViewHeader/DashboardViewHeader.tsx";
import LinkRow from "../LinkRow/LinkRow.tsx";
import {fetchDashboardLinks} from "../../../Api.ts";
import "./LinksContent.css"

export default function LinksContent() {
    const [links, setLinks] = useState<DashboardLink[]>([]);
    const [sortMode, setSortMode] = useState<SortMode>("clicks");
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        fetchDashboardLinks()
            .then((dashboardLinks) => {
                if (active) {
                    setLinks(dashboardLinks);
                }
            })
            .catch(() => {
                if (active) {
                    setLinks([]);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const sortedLinks = useMemo(() => {
        return [...links].sort((a, b) => {
            if (sortMode === "created") {
                return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
            }

            return b.totalClicks - a.totalClicks;
        });
    }, [links, sortMode]);

    const showAnalyticsForLink = (link: DashboardLink) => {
        navigate(`/dashboard/analytics/${encodeURIComponent(link.shortUrl)}`);
    };

    return (
        <>
            <DashboardViewHeader
                title="All links"
                description="Review every created link and sort by clicks or creation date."
            />

            <section className="dashboard-panel">
                <div className="dashboard-panel-header">
                    <div>
                        <h2>Links</h2>
                        <p>Click analytics to open the selected link's dashboard section.</p>
                    </div>
                    <div className="sort-actions" aria-label="Sort links">
                        <button
                            className={`sort-button ${sortMode === "clicks" ? "active" : ""}`}
                            onClick={() => setSortMode("clicks")}
                            type="button"
                        >
                            Clicks
                        </button>
                        <button
                            className={`sort-button ${sortMode === "created" ? "active" : ""}`}
                            onClick={() => setSortMode("created")}
                            type="button"
                        >
                            Date
                        </button>
                    </div>
                </div>

                <div className="dashboard-link-list">
                    {sortedLinks.map((link) => (
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
