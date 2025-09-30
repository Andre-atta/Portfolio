import {SpeedInsights} from "@vercel/speed-insights/next"
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import EmailSection from "@/app/components/EmailSection";
import AboutSection from "@/app/components/AboutSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import AchievementsSection from "@/app/components/AchievementsSection";

export default function Home() {
    return (
        <main className="md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll bg-[var(--background)]">
            <SpeedInsights/>
            <Navbar/>
            <section className="snap-start relative w-full min-h-full overflow-hidden flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <HeroSection/>
                </div>
            </section>
            <section className="snap-start">
                <AboutSection />
            </section>
            <section className="snap-start min-h-[80vh] md:h-screen flex items-center pt-16 md:pt-24 sm:pt-32 lg:pt-36 pb-16 md:pb-0">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <ProjectsSection/>
                </div>
            </section>
            <section className="snap-start min-h-[80vh] md:h-screen flex items-center pt-16 md:pt-24 sm:pt-32 lg:pt-36 pb-16 md:pb-0">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <EmailSection/>
                </div>
            </section>
            <Footer/>
        </main>
    );
}