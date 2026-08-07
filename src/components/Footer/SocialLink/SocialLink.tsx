import type {LinkingProps} from "../../../Types.ts";
import "./SocialLink.css"

export default function SocialLink(props: LinkingProps) {
    return (
        <div className="social-link-button">
            <a className="social-link-anchor" href={props.href}>
                <img className="social-link-anchor-image" src={props.imageUrl} alt=""/>
                <span>{props.name}</span>
            </a>
        </div>
    )
}