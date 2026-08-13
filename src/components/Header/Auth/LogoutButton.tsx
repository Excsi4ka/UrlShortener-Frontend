import "./LoginButton.css"
import type {AuthContext} from "../../../Types.ts";
import {useAuthContext} from "../../../AuthProvider.tsx";

export default function LogoutButton() {
    const appAuthContext: AuthContext = useAuthContext();

    return (
        <button className="user-banner" onClick={appAuthContext.logout}>
            Log out
        </button>
    )
}
