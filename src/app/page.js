import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/sections/Footer";

const TileBackground = dynamic(() => import("@/components/ui/TileBackground"), { ssr: false });

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
    loading: () => <div className="min-h-screen" />,
});
const EmailSection = dynamic(() => import("@/components/sections/EmailSection"), {
    loading: () => <div className="min-h-screen" />,
});

export default function Home() {
    return (
        <main className="md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll bg-[var(--background)] no-scrollbar overflow-x-hidden">
            <SpeedInsights />
            <Navbar />
            <TileBackground />

            <section className="md:snap-start relative z-10 w-full min-h-screen flex justify-center items-center">
                <HeroSection />
            </section>

            <section className="md:snap-start relative z-10 min-h-screen">
                <AboutSection />
            </section>

            <section className="md:snap-start relative z-10 min-h-screen flex items-center py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <ProjectsSection />
                </div>
            </section>

            <section className="md:snap-start relative z-10 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 md:px-12 flex-1 flex flex-col justify-center">
                    <EmailSection />
                </div>
                <Footer />
            </section>
        </main>
    );
}