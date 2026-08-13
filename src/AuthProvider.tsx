import {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import type {AuthContext, User} from "./Types.ts";
import {useNavigate} from "react-router";

const Context = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
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

                const data: { token: string } = await csrfResponse.json();
                setCsrfToken(data.token);

                const authResponse = await fetch("/v1/auth/me", {
                    credentials: "include",
                    headers: {
                        "X-XSRF-Token": data.token,
                    }
                });

                if (!authResponse.ok) {
                    setLoggedIn(false);
                    setUser(null);
                    return;
                }

                const user: User = await authResponse.json();

                setLoggedIn(true);
                setUser(user);

            } catch (error) {
                console.error("Authentication error", error);
                setLoggedIn(false);
                setCsrfToken("");
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        void authFunc();

    }, []);

    const logoutFunc = async () => {
        try {
            await fetch("/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-XSRF-Token": csrfToken,
                }
            });

            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoggedIn(false);
            setLoading(false);
            setCsrfToken("");
            setUser(null);
        }
    }

    const appAuthContext: AuthContext = {
        loggedIn: loggedIn,
        loading: loading,
        csrfToken: csrfToken,
        user: user,
        logout: logoutFunc
    }

    //app blank while loading
    if (loading) {
        return <></>;
    }

    return (
        <Context.Provider value={appAuthContext}>
            {children}
        </Context.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContext {
    const context = useContext(Context);

    if (context === null) {
        throw new Error("useAuthContext must be used inside AuthProvider component");
    }

    return context;
}