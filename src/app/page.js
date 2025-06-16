import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import EmailSection from "@/app/components/EmailSection";
import AboutSection from "@/app/components/AboutSectoin";
import ProjectsSection from "@/app/components/ProjectsSection";
import AchievementsSection from "@/app/components/AchievementsSection";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col bg-[var(--background)]">
        <SpeedInsights/>
        <Navbar/>
        <div className="container mt-24 mx-auto px-12 py-4">
            <HeroSection/>
            {/*<AchievementsSection/>*/}
            <AboutSection/>
            <ProjectsSection/>
            <EmailSection/>
        </div>
        <Footer/>
      </main>
  );
}
