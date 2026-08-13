import "./Header.css"
import LoginButton from "./Auth/LoginButton.tsx";
import LogoutButton from "./Auth/LogoutButton.tsx";
import {useAuthContext} from "../../AuthProvider.tsx";
import Logo from "../../assets/logo.svg"
import {Link} from "react-router";

export default function Header() {
    const {loggedIn, user} = useAuthContext();

    return (
        <header className="header">
            <div className="banner-button">
                <Link className="oauth-anchor" to={"/"}>
                    <img className="banner-button-image" src={Logo} alt=""/>
                    <span className="header-text">MiniLink</span>
                </Link>
            </div>
            <div className="header-actions">
                {loggedIn && user && (
                    <Link className="user-banner" to={"/dashboard"}>
                        {/*<img className="user-banner-image" src={user.pictureUrl} alt=""/>*/}
                        {/*<span className="user-banner-name">{user.name}</span>*/}
                        Dashboard
                    </Link>
                )}
                {loggedIn ? <LogoutButton/> : <LoginButton/>}
            </div>
        </header>
    )
}
