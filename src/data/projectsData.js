import {SiNextdotjs, SiTailwindcss, SiReact, SiFlask, SiPython, SiPostgresql} from "react-icons/si";

const projectsData = [
    {
        id: 1,
        title: "Next.js Portfolio",
        preview: "Personal portfolio built with Next.js, Tailwind and React — a self-taught project outside of university.",
        description: "Welcome to my portfolio, a dynamic and responsive website built with Next.js, Tailwind CSS and React. This project showcases my growth as a developer" +
            " and serves as a collection of my work. I created it not only for convenience but also as a personal challenge, using technologies not covered in university," +
            " which I have learned independently.\n Over time, I plan to improve both its code and design to make it even more functional and effective.",
        image: "/images/projects/1.png",
        tag: ["All", "Web", "React"],
        gitUrl: "https://github.com/Andre-atta/Portfolio",
        previewUrl: "https://www.andre-atta.dev/",
        technologies: [
            { name: "Next.js",      icon: SiNextdotjs },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "React",        icon: SiReact },
        ],
        status: "Completed",
    },
    {
        id: 2,
        title: "OverseasHub",
        preview: "Group university project for the Database Systems course (A.Y. 2025/26). " +
            "I took the lead on the database schema design and the implementation of security policies. " +
            "Final grade: 29/30.",
        description: "This project involved developing a comprehensive web platform to manage the Overseas mobility program for Ca' Foscari University students. " +
            "Built by a highly collaborative 4-person team, we efficiently divided tasks while maintaining a cross-functional approach. " +
            "I specifically focused on the backend architecture, handling the conceptual and logical design of the relational database, as well as implementing robust security " +
            "measures and role-based access control. " +
            "It was a highly rewarding experience and an excellent capstone for the course, allowing us to apply theoretical DB concepts to a complex, " +
            "real-world administrative scenario.",
        image: "/images/projects/2.png",
        tag: ["All", "Uni", "Web"],
        gitUrl: "https://github.com/Andre-atta/OverseasHub",
        previewUrl: "",
        technologies: [
            { name: "Flask",        icon: SiFlask },
            { name: "Python",       icon: SiPython },
            { name: "PostgreSQL",   icon: SiPostgresql },
        ],
        status: "Completed",
    }
];

export default projectsData;