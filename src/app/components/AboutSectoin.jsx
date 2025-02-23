"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./button/TabButton";

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>C</li>
                <li>C++</li>
                <li>Java</li>
                <li>Next.js</li>
                <li>Flutter</li>
            </ul>
        ),
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>Remondini indirizzo logistico</li>
                <li>ICT student at Ca&apos; Foscari University of Venice</li>
            </ul>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>Per ora solo quello di nascita</li>
                <li>Magari è ora di prendere sto B2</li>
            </ul>
        ),
    },
];

const AboutSection = () => {
    const [tab, setTab] = useState("skills");
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section className="text-[var(--text)]" id="about">
            <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
                <Image src="/images/about-image.png" width={500} height={500}  alt="Me_myself_and_I"/>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-[var(--secondary)] mb-4">About Me</h2>
                    <p className="text-base lg:text-lg">
                        Eru decide di radunare tutti gli Ainur e di proporre un unico grande Tema su cui costruire una
                        grande sinfonia: la Grande Musica...
                    </p>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                        >
                            {" "}
                            Skills{" "}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("education")}
                            active={tab === "education"}
                        >
                            {" "}
                            Education{" "}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("certifications")}
                            active={tab === "certifications"}
                        >
                            {" "}
                            Certifications{" "}
                        </TabButton>
                    </div>
                    <div className="mt-8">
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
