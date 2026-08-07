import "./Footer.css"
import SocialLink from "./SocialLink/SocialLink.tsx";
import GithubWhiteLogo from "../../assets/footer/Github-white.svg"
import DiscordWhiteLogo from "../../assets/footer/Discord-white.svg"

export default function Footer() {
    return (
        <footer className="footer">
            <SocialLink name={"View sources"} href={"https://github.com/Excsi4ka/UrlShortener-Frontend"} imageUrl={GithubWhiteLogo} />
            <SocialLink name={"Contact"} href={"https://discord.com/users/335136158830952450"} imageUrl={DiscordWhiteLogo} />
        </footer>
    )
}