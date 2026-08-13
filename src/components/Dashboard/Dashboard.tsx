import "./Dashboard.css"
import {Link, NavLink, type NavLinkRenderProps, Outlet} from "react-router";
import Logo from "../../assets/logo.svg";

export default function Dashboard() {

    const isActive = ({isActive}: NavLinkRenderProps) => {
        return isActive ? "section-dashboard-active" : "section-dashboard"
    };

    return (
        <main className="dashboard">
            <section className="sidebar-dashboard">
                <div className="banner-button">
                    <Link className="oauth-anchor" to={"/"}>
                        <img className="banner-button-image" src={Logo} alt=""/>
                        <span className="header-text">MiniLink</span>
                    </Link>
                </div>
                <section className="sidebar-dashboard-sections">
                    <NavLink className={isActive} to="/dashboard" end>
                        Overview
                    </NavLink>
                    <NavLink className={isActive} to="/dashboard/links">
                        Links
                    </NavLink>
                </section>
            </section>
            <section className="content-dashboard">
                <Outlet />
            </section>
        </main>
    )
}
