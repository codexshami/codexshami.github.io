import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  
  starbucks,
  tesla,
  
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  
];

const services: TService[] = [
  {
    title: "Data Scientist",
    icon: web,
  },
  {
    title: "Data Analyst",
    icon: mobile,
  },
  {
    title: "ML Engineer",
    icon: backend,
  },
  {
    title: "Data Engineer",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
 
  {
    title: "Data Science Intern",
    companyName: "Codec Technologies India",
    icon: starbucks, 
    iconBg: "#020202",
    date: "Jul 2025 - Sep 2025",
    points: [
      "Worked on Data Science and Machine Learning projects.",
      "Performed data preprocessing, analysis, and visualization.",
      "Built predictive models using Python and ML libraries.",
      "Collaborated with team members to develop real-world data solutions.",
    ],
  },
  {
    title: "DS & Analytics Intern",
    companyName: "Future Interns",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jun 2025 - Jul 2025",
    points: [
      "Worked on Data Science and Analytics projects.",
      "Performed exploratory data analysis and data cleaning.",
      "Created dashboards and reports for data insights.",
      "Applied statistical and machine learning techniques for analysis.",
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Working with Mohd Shami was an amazing experience. His data analysis and machine learning skills helped us turn complex datasets into clear business insights.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've rarely seen a data scientist who explains complex models so clearly. Mohd delivered accurate predictions and meaningful visualizations for our project.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "I've rarely seen a data scientist who explains complex models so clearly. Mohd delivered accurate predictions and meaningful visualizations for our project.",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "Revive - ML Disease Prediction",
    description:
      "Revive is a Machine Learning powered web application that predicts multiple diseases using patient medical data. The system integrates trained ML and Deep Learning models with a Flask web application to provide accurate health predictions.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "flask",
        color: "green-text-gradient",
      },
      {
        name: "machinelearning",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://github.com/codexshami/Revive",
  },
  {
    name: "Churn-Shield AI",
    description:
      "AI-powered customer churn prediction system that helps businesses identify customers at risk of leaving and provides actionable insights for retention using machine learning models and an interactive dashboard.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "machinelearning",
        color: "green-text-gradient",
      },
      {
        name: "dataanalytics",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com/codexshami/ChurnShield-AI",
  },
  {
    name: "HamOrSpam Classifier",
    description:
      "AI-powered email spam detection system that classifies emails as spam or ham using Natural Language Processing and Machine Learning techniques with high prediction accuracy.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "nlp",
        color: "green-text-gradient",
      },
      {
        name: "machinelearning",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com/codexshami/HamOrSpam-Classifier",
  },
];

export { services, technologies, experiences, testimonials, projects };
