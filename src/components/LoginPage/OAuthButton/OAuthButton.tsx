import type {LinkingProps} from "../../../Types.ts";
import "./OAuthButton.css"

export default function OAuthButton(props: LinkingProps) {
    return (
        <div className="oauth-button">
            <a className="oauth-anchor" href={props.href}>
                <img className="oauth-anchor-image" src={props.imageUrl} alt=""/>
                <span>{"Sign in with " + props.name}</span>
            </a>
        </div>
    )
}