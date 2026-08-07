import {Link} from "react-router";
import "./LoginButton.css"

export default function LoginButton() {
    return (
        <Link className="login-button" to={"/login"}>
            Sign in
        </Link>
    )
}