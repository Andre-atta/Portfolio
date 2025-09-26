import {SpeedInsights} from "@vercel/speed-insights/next"
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import EmailSection from "@/app/components/EmailSection";
import AboutSection from "@/app/components/AboutSectoin";
import ProjectsSection from "@/app/components/ProjectsSection";
import AchievementsSection from "@/app/components/AchievementsSection";

export default function Home() {
    return (
        <main className="snap-y snap-mandatory h-screen overflow-y-scroll bg-[var(--background)]">
            <SpeedInsights/>
            <Navbar/>

            <section className="snap-start h-screen flex items-center">
                <div className="container mx-auto px-12 py-4">
                    <HeroSection/>
                </div>
            </section>

            <section className="snap-start h-screen flex items-center">
                <div className="container mx-auto px-12 py-4">
                    <AboutSection/>
                </div>
            </section>

            <section className="snap-start h-screen flex items-center">
                <div className="container mx-auto px-12 py-4">
                    <ProjectsSection/>
                </div>
            </section>

            <section className="snap-start h-screen flex items-center">
                <div className="container mx-auto px-12 py-4">
                    <EmailSection/>
                </div>
            </section>
            <Footer/>
        </main>
    );
}
