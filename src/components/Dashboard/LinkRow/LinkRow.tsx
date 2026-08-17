import type {LinkRowProps} from "../../../Types.ts";
import "./LinkRow.css"

function formatDateCreated(dateCreated: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateCreated));
}

export default function LinkRow({shortUrl, longUrl, dateCreated, clicks, selected, onAnalyticsClick}: LinkRowProps) {
    const shortLinkUrl = `${window.location.origin}/${shortUrl}`;

    return (
        <article className={`dashboard-link-row ${selected ? "selected" : ""}`}>
            <div className="dashboard-link-info">
                <a className="dashboard-link-title" href={longUrl}>{longUrl}</a>
                <a className="dashboard-short-link" href={shortLinkUrl}>{shortLinkUrl}</a>
                <span className="dashboard-link-created">Created {formatDateCreated(dateCreated)}</span>
            </div>
            <div className="dashboard-link-actions">
                <span className="dashboard-click-count">{clicks}</span>
                <button
                    className="analytics-button"
                    onClick={onAnalyticsClick}
                    type="button"
                    aria-label={`View analytics for ${shortLinkUrl}`}
                    aria-pressed={selected}
                >
                    <span className="analytics-icon" aria-hidden="true" />
                    <span className="analytics-tooltip">Analytics</span>
                </button>
            </div>
        </article>
    )
}
