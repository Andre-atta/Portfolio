import {SpeedInsights} from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import Footer from "@/app/components/Footer";

const TileBackground = dynamic(() => import("@/app/components/ui/TileBackground"), { ssr: false });

const AboutSection = dynamic(() => import("@/app/components/AboutSection"), {
    loading: () => (
        <section className="py-24 flex justify-center">
            <div className="animate-pulse w-11/12 max-w-6xl h-64 rounded-xl bg-white/5" />
        </section>
    ),
    ssr: false,
});
const ProjectsSection = dynamic(() => import("@/app/components/ProjectsSection"), {
    loading: () => (
        <section className="py-24 flex justify-center">
            <div className="animate-pulse w-11/12 max-w-6xl h-72 rounded-xl bg-white/5" />
        </section>
    ),
});
const EmailSection = dynamic(() => import("@/app/components/EmailSection"), {
    loading: () => (
        <section className="py-24 flex justify-center">
            <div className="animate-pulse w-11/12 max-w-3xl h-60 rounded-xl bg-white/5" />
        </section>
    ),
});

export default function Home() {
    return (
        <main className="md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll bg-[var(--background)] no-scrollbar">
            <SpeedInsights/>
            <Navbar/>
            <TileBackground />
            <section className="snap-start relative z-10 w-full min-h-full overflow-hidden flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <HeroSection/>
                </div>
            </section>
            <section className="snap-start relative z-10">
                <AboutSection />
            </section>
            <section className="snap-start relative z-10 min-h-[80vh] md:h-screen flex items-center pt-16 md:pt-24 sm:pt-32 lg:pt-36 pb-16 md:pb-0">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <ProjectsSection/>
                </div>
            </section>
            <section className="snap-start relative z-10 min-h-[80vh] md:h-screen flex items-center pt-16 md:pt-24 sm:pt-32 lg:pt-36 pb-16 md:pb-0">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <EmailSection/>
                    <div className="mt-10">
                        <Footer/>
                    </div>
                </div>
            </section>
        </main>
    );
}