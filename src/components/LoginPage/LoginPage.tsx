import "./LoginPage.css"
import GoogleIcon from "../../assets/oauth/Google.svg"
import DiscordIcon from "../../assets/oauth/Discord.svg"
import GithubIcon from "../../assets/oauth/Github.svg"
import OAuthButton from "./OAuthButton/OAuthButton.tsx";
import Footer from "../Footer/Footer.tsx";

export default function LoginPage() {
    const OAuthPath: string = "/oauth2/authorization/";

    return (
        <main className="login-page">
            <section className="login-content">
                <section className="oauth-card">
                    <h1 className="login-text-top">Sign in</h1>
                    <h2 className="login-text-bottom">Create short links and view analytics after signing in!</h2>
                    <OAuthButton name="Google" href={OAuthPath + "google"} imageUrl={GoogleIcon}/>
                    <OAuthButton name="Discord" href={OAuthPath + "discord"} imageUrl={DiscordIcon}/>
                    <OAuthButton name="Github" href={OAuthPath + "github"} imageUrl={GithubIcon}/>
                </section>
            </section>
            <Footer/>
        </main>
    )
}