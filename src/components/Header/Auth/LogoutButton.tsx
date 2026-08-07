import "./LoginButton.css"
import {useNavigate} from "react-router";

export default function LogoutButton() {
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await fetch("/logout", {
                method: "POST",
                credentials: "include",
                //TODO add csrf token
            })
        } catch (error) {
            console.error("Error logging out", error);
        }
        navigate("/");
    }

    return (
        <button className="login-button" onClick={onLogout}>
            Log out
        </button>
    )
}
