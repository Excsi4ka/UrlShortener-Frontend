import type {LinkingProps} from "../../../Types.ts";
import "./OAuthButton.css"

export default function OAuthButton({href, name, imageUrl}: LinkingProps) {
    return (
        <div className="oauth-button">
            <a className="oauth-anchor" href={href}>
                <img className="oauth-anchor-image" src={imageUrl} alt=""/>
                <span>{"Sign in with " + name}</span>
            </a>
        </div>
    )
}