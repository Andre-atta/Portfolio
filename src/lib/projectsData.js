import { SiNextdotjs, SiTailwindcss, SiReact } from "react-icons/si";

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
];

export default projectsData;