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
        <main className="md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll bg-[var(--background)]">
            <SpeedInsights/>
            <Navbar/>
            <section className="snap-start relative w-full min-h-full overflow-hidden flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <HeroSection/>
                </div>
            </section>
            <section className="snap-start h-screen flex items-center pt-24 sm:pt-32 lg:pt-36">
                <div className="container mx-auto px-12 py-4">
                    <AboutSection/>
                </div>
            </section>
            <section className="snap-start h-screen flex items-center pt-24 sm:pt-32 lg:pt-36">
                <div className="container mx-auto px-12 py-4">
                    <ProjectsSection/>
                </div>
            </section>
            <section className="snap-start h-screen flex items-center pt-24 sm:pt-32 lg:pt-36">
                <div className="container mx-auto px-12 py-4">
                    <EmailSection/>
                </div>
            </section>
            <Footer/>
        </main>
    );
}