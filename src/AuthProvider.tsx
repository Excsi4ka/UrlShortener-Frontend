import {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import type {AuthContext, User} from "./Types.ts";
import {useNavigate} from "react-router";

const dummyAuth: AuthContext = {
    loggedIn: false,
    csrfToken: "",
    user: null,
    logout: async () => {}
}

const Context = createContext<AuthContext>(dummyAuth);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authFunc = async () => {
            try {
                const csrfResponse = await fetch("/v1/auth/csrf");

                if (!csrfResponse.ok) {
                    setLoggedIn(false);
                    setCsrfToken("");
                    setUser(null);
                    return;
                }

                const data: {token: string} = await csrfResponse.json();

                const authResponse = await fetch("/v1/auth/me", {
                    credentials: "include",
                    headers: {
                        "X-CSRF-Token": data.token,
                    }
                });

                if (!authResponse.ok) {
                    setLoggedIn(false);
                    setUser(null);
                    return;
                }

                const user: User = await authResponse.json();

                setLoggedIn(true);
                setCsrfToken(data.token);
                setUser(user);

            } catch (error) {
                console.error(error);
                setLoggedIn(false);
                setCsrfToken("");
                setUser(null);
            }
        }

        authFunc();

    }, []);

    const logoutFunc = async () => {
        try {
            await fetch("/v1/auth/logout", {
                credentials: "include",
                headers: {
                    "X-CSRF-Token": csrfToken,
                }
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    const appAuthContext: AuthContext = {
        loggedIn: loggedIn,
        csrfToken: csrfToken,
        user: user,
        logout: logoutFunc
    }

    return <Context.Provider value={appAuthContext}>
        {children}
    </Context.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContext {
    return useContext(Context);
}