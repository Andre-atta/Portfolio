"use client";
import { motion } from "framer-motion";
import TabButton from "./button/TabButton";
import React, { useTransition, useState } from "react";

import { FaFigma, FaJava, FaReact } from "react-icons/fa";
import { SiFlutter, SiCplusplus } from "react-icons/si";

const skills = [
    { name: "Figma", level: 85, icon: <FaFigma className="text-xl" /> },
    { name: "C++", level: 75, icon: <SiCplusplus className="text-xl" /> },
    { name: "Java", level: 50, icon: <FaJava className="text-xl" /> },
    { name: "Flutter", level: 30, icon: <SiFlutter className="text-xl" /> },
    { name: "Next.js", level: 30, icon: <FaReact className="text-xl" /> },
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
                    <br /> <em>High School Diploma</em> <br />
                    Gained foundational understanding of logistics and supply chain management, developing analytical and problem-solving skills.
                </li>
            </ul>
        ),
    },
    {
        title: "Currently Learning",
        id: "learning",
        content: (
            <ul className="list-disc pl-2" style={{ color: "var(--text)" }}>
                <li>
                    <strong>Flutter & Dart</strong>
                    <br />
                    <em>Building mobile apps and exploring state management with Riverpod.</em>
                </li>
                <li>
                    <strong>Firebase</strong>
                    <br />
                    <em>Authentication, Firestore, and cloud storage integration.</em>
                </li>
                <li>
                    <strong>Next.js</strong>
                    <br />
                    <em>Web app development with React, Tailwind CSS, and server-side rendering.</em>
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
        <section className="relative text-[var(--text)] overflow-hidden group" id="about">
            {/* Background grid + vignette */}

            <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
                <h2 className="border-b-2 border-[var(--primary)] text-4xl font-bold text-[var(--secondary)] mb-12 text-center lg:text-left">
                    About Me
                </h2>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <p className="text-justify text-base lg:text-lg leading-relaxed">
                        I&apos;m a student of Information Technologies and Sciences at Ca&apos;Foscari University in Venice.
                        Currently studying IT at Ca&apos;Foscari, I enjoy experimenting with web and mobile apps, building small projects, and learning by doing.
                        Beyond tech, I have a passion for photography, cinema, music and, also, calisthenics.
                    </p>

                    <div className="mt-8 lg:mt-0 text-left flex flex-col h-full">
                        <div className="flex flex-row justify-start flex-wrap gap-2">
                            <TabButton
                                selectTab={() => handleTabChange("skills")}
                                active={tab === "skills"}
                            >
                                Skills
                            </TabButton>
                            <TabButton
                                selectTab={() => handleTabChange("education")}
                                active={tab === "education"}
                            >
                                Education
                            </TabButton>
                            <TabButton
                                selectTab={() => handleTabChange("learning")}
                                active={tab === "learning"}
                            >
                                Learning
                            </TabButton>
                        </div>
                        <div className="mt-6">{TAB_DATA.find((t) => t.id === tab).content}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;