import HomePage from "./components/HomePage/HomePage.tsx";
import {Route, Routes} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import "./App.css"
import DashboardPage from "./components/DashboardPage/DashboardPage.tsx";

export default function App() {
  return <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/dashboard" element={<DashboardPage />}/>
  </Routes>
}