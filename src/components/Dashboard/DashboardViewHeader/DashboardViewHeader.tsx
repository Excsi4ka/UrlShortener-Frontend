import type {DashboardViewHeaderProps} from "../../../Types.ts";
import "./DashboardViewHeader.css"

export default function DashboardViewHeader({title, description}: DashboardViewHeaderProps) {
    return (
        <section className="dashboard-view-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    )
}
