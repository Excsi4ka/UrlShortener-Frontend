import HomePage from "./components/HomePage/HomePage.tsx";
import {Navigate, Route, Routes} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import "./App.css"
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import OverviewContent from "./components/Dashboard/Overview/OverviewContent.tsx";
import LinksContent from "./components/Dashboard/Links/LinksContent.tsx";
import AnalyticsContent from "./components/Dashboard/Analytics/AnalyticsContent.tsx";
import {useAuthContext} from "./AuthProvider.tsx";

export default function App() {
    const {loggedIn} = useAuthContext();

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={loggedIn ? <Dashboard/> : <Navigate to={"/login"}/>}>
                <Route index element={<OverviewContent/>}/>
                <Route path="links" element={<LinksContent/>}/>
                <Route path="analytics/:shortUrl" element={<AnalyticsContent/>}/>
            </Route>
        </Routes>
    )
}
