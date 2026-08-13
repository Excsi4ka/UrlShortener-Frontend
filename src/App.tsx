import HomePage from "./components/HomePage/HomePage.tsx";
import {Route, Routes} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import "./App.css"
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import OverviewContent from "./components/Dashboard/Overview/OverviewContent.tsx";
import LinksContent from "./components/Dashboard/Links/LinksContent.tsx";
import AnalyticsContent from "./components/Dashboard/Analytics/AnalyticsContent.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route index element={<OverviewContent/>}/>
                <Route path="links" element={<LinksContent/>}/>
                <Route path="analytics/:shortUrl" element={<AnalyticsContent/>}/>
            </Route>
        </Routes>
    )
}
