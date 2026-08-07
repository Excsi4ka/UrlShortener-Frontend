import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import "./HomePage.css"

export default function HomePage() {
    return (
        <main className="home-page">
            <Header/>
            <section className="content-box">
                <section className="url-shortening">

                </section>
            </section>
            <Footer/>
        </main>
    )
}