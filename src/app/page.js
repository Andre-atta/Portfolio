import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import dynamic from "next/dynamic";
import Navbar from "@/app/components/sections/Navbar";
import Footer from "@/app/components/sections/Footer";
import HeroSection from "@/app/components/sections/HeroSection";

const TileBackground = dynamic(() => import("@/app/components/ui/TileBackground"), { ssr: false });

const AboutSection = dynamic(() => import("@/app/components/sections/AboutSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});
const ProjectsSection = dynamic(() => import("@/app/components/sections/ProjectsSection"), {
    loading: () => <div className="min-h-screen" />,
});
const EmailSection = dynamic(() => import("@/app/components/sections/EmailSection"), {
    loading: () => <div className="min-h-screen" />,
});

export default function Home() {
    return (
        <main className="lg:snap-y lg:snap-mandatory lg:h-screen lg:overflow-y-scroll bg-[var(--background)] no-scrollbar overflow-x-clip touch-pan-y touch-manipulation">
            <SpeedInsights />
            <Analytics/>
            <Navbar />
            <TileBackground />

            <section className="lg:snap-start relative z-10 w-full min-h-screen flex justify-center items-center">
                <HeroSection />
            </section>

            <section className="lg:snap-start relative z-10 min-h-screen">
                <AboutSection />
            </section>

            <section className="lg:snap-start relative z-10 w-full min-h-screen flex items-start lg:items-center">
                <ProjectsSection />
            </section>

            <section className="lg:snap-start relative z-10 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 md:px-12 flex-1 flex flex-col justify-center">
                    <EmailSection />
                </div>
                <Footer />
            </section>
        </main>
    );
}