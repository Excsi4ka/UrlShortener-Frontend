import AnalyticsIcon from "../../../assets/analytics.svg";
import type {LinkRowProps} from "../../../Types.ts";
import "./LinkRow.css"

export default function LinkRow({link, selected, onAnalyticsClick}: LinkRowProps) {
    return (
        <article className={`dashboard-link-row ${selected ? "selected" : ""}`}>
            <div className="dashboard-link-info">
                <a className="dashboard-link-title" href={link.longUrl}>{link.longUrl}</a>
                <a className="dashboard-short-link" href={link.shortUrl}>{link.shortUrl}</a>
            </div>
            <div className="dashboard-link-actions">
                <span className="dashboard-click-count">{link.totalClicks}</span>
                <button
                    className="analytics-button"
                    onClick={onAnalyticsClick}
                    type="button"
                    aria-label={`View analytics for ${link.shortUrl}`}
                    aria-pressed={selected}
                >
                    <span
                        className="analytics-icon"
                        style={{
                            WebkitMaskImage: `url(${AnalyticsIcon})`,
                            maskImage: `url(${AnalyticsIcon})`,
                        }}
                        aria-hidden="true"
                    />
                    <span className="analytics-tooltip">Analytics</span>
                </button>
            </div>
        </article>
    )
}
