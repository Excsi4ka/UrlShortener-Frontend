import {Link} from "react-router";
import "./LoginButton.css"

export default function LoginButton() {
    return (
        <Link className="user-banner" to={"/login"}>
            Sign in
        </Link>
    )
}