import type {LinkingProps} from "../../../Types.ts";
import "./SocialLink.css"

export default function SocialLink({href, name, imageUrl}: LinkingProps) {
    return (
        <div className="social-link-button">
            <a className="social-link-anchor" href={href}>
                <img className="social-link-anchor-image" src={imageUrl} alt=""/>
                <span>{name}</span>
            </a>
        </div>
    )
}