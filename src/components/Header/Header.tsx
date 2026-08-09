import "./Header.css"
import LoginButton from "./Auth/LoginButton.tsx";
import LogoutButton from "./Auth/LogoutButton.tsx";
import {useAuthContext} from "../../AuthProvider.tsx";

export default function Header() {
    const loggedIn: boolean = useAuthContext().loggedIn;

    return (
        <header className="header">
            <p className="header-text">URL Shortener</p>
            {loggedIn ? <LogoutButton/> : <LoginButton/>}
        </header>
    )
}