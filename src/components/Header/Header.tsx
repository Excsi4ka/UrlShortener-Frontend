import "./Header.css"
import LoginButton from "./Auth/LoginButton.tsx";
import LogoutButton from "./Auth/LogoutButton.tsx";

export default function Header() {
    const loggedIn: boolean = false;
    return (
        <header className="header">
            <p className="header-text">URL Shortener</p>
            {loggedIn ? <LogoutButton/> : <LoginButton/>}
        </header>)
}