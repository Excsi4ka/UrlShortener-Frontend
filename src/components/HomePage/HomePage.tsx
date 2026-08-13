import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthContext} from "../../AuthProvider.tsx";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import "./HomePage.css"

export default function HomePage() {
    const {loggedIn, csrfToken} = useAuthContext();
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const shortenUrl = async () => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }

        if (!longUrl.trim()) {
            setMessage("Enter a URL to shorten.");
            return;
        }

        setSubmitting(true);
        setMessage("");
        setShortUrl("");

        try {
            const response = await fetch("/v1/shorten", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-Token": csrfToken,
                },
                body: JSON.stringify({longUrl: longUrl.trim()}),
            });

            if (!response.ok) {
                throw new Error("Error shortening the url.");
            }

            const data: { shortUrl?: string } = await response.json();
            setShortUrl(data.shortUrl ?? "https://example.com");
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="home-page">
            <Header/>
            <section className="home-content">
                <section className="hero-section">
                    <h1>Short links & Analytics</h1>
                    <h2>Create, share and track short links.</h2>
                </section>
                <section className="url-shortening">
                    <div className="url-shortening-copy">
                        <h3>Shorten a URL</h3>
                    </div>
                    <div className="url-shortening-controls">
                        <input
                            aria-label="URL to shorten"
                            className="url-input"
                            onChange={(event) => setLongUrl(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    void shortenUrl();
                                }
                            }}
                            placeholder="https://example.com/very/long/link"
                            type="url"
                            value={longUrl}
                        />
                        <button className="shorten-button" disabled={submitting} onClick={() => void shortenUrl()}>
                            {submitting ? "Shortening..." : "Shorten"}
                        </button>
                    </div>

                    {(message || shortUrl) && (
                        <div className="shorten-result" role="status">
                            {shortUrl ? (
                                <>
                                    <span>Your short link:</span>
                                    <a href={shortUrl}>{shortUrl}</a>
                                </>
                            ) : (
                                <span>{message}</span>
                            )}
                        </div>
                    )}
                </section>
            </section>
            <Footer/>
        </main>
    )
}
