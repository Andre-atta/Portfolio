require('dotenv').config()
import HeroSection from "@/app/components/HeroSection";
import Navbar from "@/app/components/Navbar";
import AboutSection from "@/app/components/AboutSectoin";
import ProjectsSection from "@/app/components/ProjectsSection";
import EmailSection from "@/app/components/EmailSection";
import Footer from "@/app/components/Footer";
import AchievementsSection from "@/app/components/AchievementsSection";

export default function Home() {
  console.log('API Key:', process.env.RESEND_API_KEY);
  console.log('From Email:', process.env.FROM_MAIL);

  return (
      <main className="flex min-h-screen flex-col bg-background">
        <Navbar/>
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection/>
          <AchievementsSection/>
          <AboutSection/>
          <ProjectsSection/>
          <EmailSection/>
        </div>
        <Footer/>
      </main>
  );
}
