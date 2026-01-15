import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaLaptopCode, FaBook, FaEnvelope, FaBrain, FaBolt, FaUtensils, FaAws, FaGoogle, FaMicrosoft, FaUniversity, FaSchool, FaCodeBranch } from "react-icons/fa";
// Add other icons as needed from react-icons
import profilePhoto from "./photo.jpg";
import profilePhotoFull from "./photo2.jpg";
import resumePdf from "./resume.pdf";
import p1 from "./paper1.pdf";
import p2 from "./paper2.pdf";
import p3 from "./paper3.pdf";
import p4 from "./paper4.pdf";
import kiitLogo from "./kiit.png"; // Placeholder: Ensure this file exists or update path
import schoolLogo from "./school.png"; // Placeholder: Ensure this file exists or update path
import pr1 from "./project1.png";
import pr2 from "./project2.png";
import pr3 from "./project3.png";
import pr4 from "./project4.png";
import pr5 from "./project5.png";
import pr6 from "./project6.png";
import pr7 from "./project7.png";

export const personalInfo = {
    name: "Tushar Mitra",
    role: "Final-year CSE • Researcher • ML & Systems",
    email: "tushar24.mitra@gmail.com",
    phone: "+91 9709229224",
    location: "India",
    about: "By exploring varying areas of computing, I have developed a unique blend of skills. However, my academic journey has sparked a keen interest in Data Science and its related fields such as Machine Learning, Deep Learning, Big Data, Natural Language Processing, Computer Vision and Data Visualization tools like PowerBI and Tableau. These are the areas which I find both challenging and rewarding. This website is my platform for sharing the projects that I work on, and the technologies that I encounter in my explorations.",
    resumeUrl: resumePdf, // Replace with actual link
    photoUrl: profilePhoto, // Replace with your photo
    photoFull: profilePhotoFull,
};

export const education = [
    {
        institution: "Loyola High School",
        place: "Patna, Bihar",
        year: "2009 - 2021",
        icon: FaSchool,
        image: schoolLogo
    },
    {
        institution: "Kalinga Institute of Industrial Technology (KIIT)",
        place: "Bhubaneswar, Odisha",
        degree: "Bachelor of Technology",
        year: "2022 - 2026",
        details: ["Major: Computer Science and Engineering", "Minor: Financial Economics"],
        icon: FaUniversity,
        image: kiitLogo
    }
];

import { DiJava, DiPython, DiMysql, DiMongodb, DiHtml5, DiCss3, DiGit, DiDocker, DiLinux, DiTerminal } from "react-icons/di";
import { SiC, SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy } from "react-icons/si";

export const skills = {
    languages: [
        { name: "Java", icon: DiJava, color: "text-orange-600" },
        { name: "Python", icon: DiPython, color: "text-blue-500" },
        { name: "C", icon: SiC, color: "text-blue-700" },
    ],
    development: [
        { name: "HTML5", icon: DiHtml5, color: "text-orange-500" },
        { name: "CSS", icon: DiCss3, color: "text-blue-500" },
        { name: "MySQL", icon: DiMysql, color: "text-cyan-700" },
        { name: "MongoDB", icon: DiMongodb, color: "text-green-500" },
    ],
    ml: [
        { name: "PyTorch", icon: SiPytorch, color: "text-orange-500" },
        { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-400" },
        { name: "Scikit-Learn", icon: SiScikitlearn, color: "text-orange-300" },
        { name: "Pandas", icon: SiPandas, color: "text-purple-600" },
        { name: "Numpy", icon: SiNumpy, color: "text-blue-400" },
        // Matplotlib doesn't have a direct simple icon in common sets, using generic or maybe skipped
        { name: "Matplotlib", icon: FaCode, color: "text-teal-600" },
    ],
    tools: [
        { name: "Git", icon: DiGit, color: "text-red-500" },
        { name: "Docker", icon: DiDocker, color: "text-blue-500" },
        { name: "Linux", icon: DiLinux, color: "text-amber-500" },
        { name: "Shell", icon: DiTerminal, color: "text-slate-500" },
    ],
    cloud: [
        { name: "AWS", icon: FaAws, color: "text-orange-500" },
        { name: "GCP", icon: FaGoogle, color: "text-red-500" },
        { name: "Azure", icon: FaMicrosoft, color: "text-blue-600" },
    ]
};

export const projects = [
    {
        title: "Micro Object Detection",
        description: "Implemented a micro object detection project for detecting small objects like buildings, planes, boats and vehicles in satellite imagery using YOLOv12s.",
        tech: ["Object Detection", "YOLO", "Python", "OpenCV", "TensorFlow"],
        link: "#",
        github: "https://github.com/realmitratushar/micro-object-detection",
        image: pr1,
    },
    {
        title: "Talk to Pdf",
        description: "Implemented a Generative AI project in a web app to upload PDFs and respond to queries related to those PDFs.",
        tech: ["Generative AI", "Langchain", "FAISS", "Streamlit", "Python"],
        link: "#",
        github: "https://github.com/realmitratushar/Talk-with-PDF",
        image: pr2,
    },
    {
        title: "Weather Web App",
        description: "Implemented a weather web app using python, flask and html. Hosted on onrender.",
        tech: ["HTML", "Python", "Flask", "Onrender"],
        link: "#",
        github: "https://github.com/realmitratushar/weather-app",
        image: pr3,
    },
    {
        title: "Vision-based Attendance System",
        description: "Implemented a Vision-based attendance system using computer vision and haarcascade frontalface classifier.",
        tech: ["Computer Vision", "Haarcascade", "Python", "OpenCV", "Streamlit"],
        link: "#",
        github: "https://github.com/realmitratushar/vision-based-attendance-system",
        image: pr4,
    },
    {
        title: "ETL Pipeline",
        description: "Implemented an ETL (Extract, Transform, Load) Pipeline using Apache Airflow, Astronomer, PostgreSQL and Open Meteo API.",
        tech: ["ETL", "Apache Airflow", "Astronomer", "PostgreSQL", "Open Meteo API"],
        link: "#",
        github: "https://github.com/realmitratushar/etl-pipeline",
        image: pr5,
    },
    {
        title: "Credit Card Fraud Detection",
        description: "Implemented a Classification ML algorithm to detect fraudulent transactions and probability of fraud.",
        tech: ["Classification", "Machine Learning", "Python", "Scikit-Learn", "Pandas", "Numpy"],
        link: "#",
        github: "https://github.com/realmitratushar/creditcardfrauddetection",
        image: pr6,
    },
    {
        title: "Diamond Price Prediction",
        description: "Implemented a Regression ML algorithm to calculate the price of diamond based on 9 different input features like carat, cut, clarity, depth, etc.",
        tech: ["Regression", "Machine Learning", "Python", "Scikit-Learn", "Pandas", "Numpy"],
        link: "#",
        github: "https://github.com/realmitratushar/diamondpriceprediction",
        image: pr7,
    },
];

export const experience = [
    {
        company: "Smart India Hackathon 2024",
        role: "Internal Hackathon and Screening Round",
        period: "August 2024-November 2024",
        description: [
            "Our team 'Tech Titans' Qualified for the Screening Round of 'Smart India Hackathon'. We came in the Top 45 teams out of the 297 registered teams from our University. We submitted our presentation and prototype for the Geolocation-based Attendance System under Problem Statement 1707 for GAIL(Gas Authority of India Limited), under the Ministry of Petroleum and Natural Gas.",
            "After the Screening Round, we got selected for the Internal Hackathon Round. In this round, our problem statement, presentation and prototype was given for submission to be graded by the internal team of SIH 2024.",
        ],
    },
];

export const research = [
    {
        title: "Food Choices and Sustainable Consumption Pattern",
        authors: "Tushar Mitra",
        year: "February 2025",
        abstract: "Examining Indian youth, this study highlights preferences for local, seasonal, and home-cooked food, driven by cultural and family influences rather than advertising. Although aware of food waste’s impact, consumers face challenges with habits and storage. The research advocates for educational and policy interventions to promote sustainable and responsible food consumption.",
        link: p1,
        status: "Published",
    },
    {
        title: "Micro Object Detection",
        authors: "Tushar Mitra, Apoorva Aanand, Durjaya Das, Prachi Sayesha Parida, Utkarsh Dubey, Sidhant Dash",
        year: "April 2025",
        abstract: "YOLOv12s optimizes micro-object detection using a Residual ELAN backbone and Flash Attention for efficiency. Key features like 7x7 Separable Convolutions and Feature Map Segmentation improve localization. Tested on xView imagery, it performed well on boats, buildings, and planes, though tiny vehicles remain a challenge for future refinement.",
        link: p2,
        status: "Under Review",
    },
    {
        title: "Public–Private Partnerships and Risk-Sharing for Green Infrastructure",
        authors: "Tushar Mitra, Sukriti Gupta, Prof. Swapnamoyee Palit",
        year: "October 2025",
        abstract: "To bridge India's green infrastructure financing gap, this study advocates for Public-Private Partnerships (PPPs) and innovative risk-sharing mechanisms like viability gap funding and blended finance. By equitably distributing risks, these models enhance investor confidence in renewable energy and sustainable transport, accelerating India's progress toward global climate commitments.",
        link: p3,
        status: "Under Review",
    },
    {
        title: "Cheating Detection using Eye Tracking and Object Detection",
        authors: "Yellapantula Arvind Atreya, Yashi Garg, Aakriti Rai, Tushar Mitra, Swastik Ranjan Mandal, Yashodip Madhav Kulkarni",
        year: "December 2025",
        abstract: "This AI-based tool enhances online exam integrity by combining Eye Tracking (gaze and head pose) with YOLO Object Detection (spotting phones). A Random Forest classifier analyzes these inputs to detect suspicious behavior in real-time. Designed for scalability, it automates proctoring to ensure fairness across universities and corporate assessments.",
        link: p4,
        status: "Under Review",
    },
];

export const socialLinks = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/realmitratushar", stats: "9 Public Repositories" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/tushar-mitra-867028261/", stats: "500+ Connections" },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/mitratushar04" },
    { name: "HuggingFace", icon: FaBrain, url: "https://huggingface.co/realmitratushar", stats: "3 Models" },
    { name: "LeetCode", icon: FaCode, url: "https://leetcode.com/u/mitratushar04/", stats: "121 Solved" },
    { name: "CodeForces", icon: FaBolt, url: "https://codeforces.com/profile/mitratushar", stats: "Rating: 756 (Newbie)" },
    { name: "HackerRank", icon: FaCodeBranch, url: "https://www.hackerrank.com/profile/tushar24_mitra", stats: "4 Star (Problem Solving)" },
    { name: "HackerEarth", icon: FaLaptopCode, url: "https://www.hackerearth.com/@tushar24.mitra" },
    { name: "CodeChef", icon: FaUtensils, url: "https://www.codechef.com/users/mitratushar04" },
];
