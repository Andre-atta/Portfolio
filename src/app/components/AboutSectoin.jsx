"use client";
import Image from "next/image";
import TabButton from "./button/TabButton";
import React, { useTransition, useState } from "react";

import { FaFigma, FaJava, FaReact } from "react-icons/fa";
import { SiFlutter, SiCplusplus } from "react-icons/si";

const skills = [
    { name: "Figma", level: 85, icon: <FaFigma className="text-xl" /> },
    { name: "Flutter", level: 30, icon: <SiFlutter className="text-xl" /> },
    { name: "Next.js", level: 30, icon: <FaReact className="text-xl" /> },
    { name: "C++", level: 75, icon: <SiCplusplus className="text-xl" /> },
    { name: "Java", level: 50, icon: <FaJava className="text-xl" /> },
];

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <div className="space-y-4" style={{ color: "var(--text)" }}>
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                {skill.icon}
                                <span className="font-medium">{skill.name}</span>
                            </div>
                            <span className="text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2 dark:bg-[var(--secondary)]">
                            <div
                                className="bg-[var(--primary)] h-2 rounded-full"
                                style={{ width: `${skill.level}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>
                    <strong>ICT student at Ca&apos;Foscari University of Venice</strong> (2023 - Present)
                    <br />
                    <em>Bachelor of Science in Information Technologies and Sciences</em>
                    <br />
                    Relevant coursework: Data Structures, Algorithms, Object-Oriented Programming.
                </li>
                <li>
                    <strong>IIS G.A. Remondini Logistics & Transportation Curriculum</strong> (2018 - 2023)
                    <br />
                    <em>High School Diploma</em>
                    <br />
                    Gained foundational understanding of logistics and supply chain management, developing analytical and problem-solving skills.
                </li>
            </ul>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>
                    <strong>Cla B2</strong> (Issued: 2022)
                    <br />
                    <em>English Language Certification (B2 Level)</em>
                </li>
                <li>
                    <strong>ECDL</strong> (Issued: 2020)
                    <br />
                    <em>European Computer Driving Licence - Demonstrates proficiency in essential computer applications.</em>
                </li>
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
            <div className="md:grid md:grid-cols-2 items-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
                <Image
                    src="/images/about-image.png"
                    alt="Me_myself_and_I"
                    width={500}
                    height={500}
                    layout="responsive"
                />
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="border-b-2 border-[var(--primary)] text-4xl font-bold text-[var(--secondary)] pb-2 mb-3">
                        About Me
                    </h2>
                    <p className=" text-justify text-base lg:text-lg">
                        I&apos;m a student of Information Technologies and Sciences at Ca&apos; Foscari University in Venice.
                        Driven by curiosity and creativity, I enjoy tackling challenges and exploring new ideas.
                        While coding may not be my greatest strength, I embrace problem-solving with enthusiasm.
                        Beyond tech, I have a passion for photography, music and cinema. Also I&apos;m a calisthenics bro.
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
