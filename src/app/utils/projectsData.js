const projectsData = [
    {
        id: 1,
        title: "Next.js Portfolio Website",
        description: "Welcome to my portfolio, a dynamic and responsive website built with Next.js, Tailwind CSS and React. This project showcases my growth as a developer" +
            " and serves as a collection of my work. I created it not only for convenience but also as a personal challenge, using technologies not covered in university," +
            " which I have learned independently.\n For now, the website is complete, but only temporarily. Over time, I plan to improve both its code and design" +
            " to make it even more functional and effective.",
        image: "/images/projects/1.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/Andre-atta/Portfolio",
        previewUrl: "/",
        technologies: ["Next.js", "Tailwind CSS", "React"],
        status: "Completed",
    },
    {
        id: 2,
        title: "CitySense",
        description: "CitySense is an application developed for the Software Engineering course. Built with Android Studio and Java, it integrates a" +
            " Firebase database for data management and Google APIs for location services.\n The app encourages citizens to actively participate in their community by" +
            " providing tools for waste sorting and sharing useful information about local events. Users can report problematic situations, contributing to a safer and more" +
            " livable environment.\n At the end of the course, the project was graded 28/30. Currently, development is on hold, but potential collaboration" +
            " opportunities remain open for those interested.",
        image: "/images/projects/2.png",
        tag: ["All", "Mobile", "Uni"],
        gitUrl: "https://github.com/Andre-atta/ProgettoIDS",
        previewUrl: "/",
        technologies: ["Google Api", "Android Studio" ,"Firebase", "Java"],
        status: "In Progress",
    },
    {
        id: 3,
        title: "Calendar Mestre",
        description: "Dove.ti.va is a personal project that leverages Flask and Python to create an automated web calendar. The goal is to simplify the management" +
            " and display of events selected from the Instagram page @dove.ti.va, making them more accessible and enhancing the experience for the page's followers." +
            " With this tool, users can easily and intuitively browse events in an organized manner, optimizing the way information is consumed.",
        image: "/images/projects/2.png",
        tag: ["All", "Mobile"],
        gitUrl: "/",
        previewUrl: "/",
        technologies: ["Flask", "Python"],
        status: "Not Started",
    },
];

export default projectsData;