import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  komikult,
  leaderboard,
  python,
  tableau,
  math,
  movie,
  nyeusi,
  space,
  coverhunt,
  dcc,
  kelhel,
  microverse,
  towson,
  anacondas,
  nc,
  norad,
  uta,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Scientist / Analyst",
    icon: backend,
  },
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "UI/UX Design",
    icon: ux,
  },
  /*{
    title: 'Software Prototyping',
    icon: prototyping,
  },*/
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Tableau",
    icon: tableau,
  },
  {
    name: "Anacondas",
    icon: anacondas,
  },
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
  /*{
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'graphql',
    icon: graphql,
  },
  {
    name: 'postgresql',
    icon: postgresql,
  },
  */
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  /*{
    name: 'docker',
    icon: docker,
  },*/
];

const experiences = [
  {
    title: "Towson University",
    company_name: "Bachelors in Cell and Molecular Biology",
    icon: towson,
    iconBg: "#333333",
    date: "Aug 2017 - June 2022",
  },
  {
    title: "Nucamp Coding Bootcamp",
    company_name: "Certified Full Stack Developer",
    icon: nc,
    iconBg: "#333333",
    date: "Aug 2022 - Jan 2023",
  },
  {
    title: "Web Developer Intern",
    company_name: "NORAD",
    icon: norad,
    iconBg: "#333333",
    date: "Jan 2023 - Jun 2023",
  },
  {
    title: " The University of Texas at Austin",
    company_name: "Post Graduate Degree in Data Science and Business Analytics",
    icon: uta,
    iconBg: "#333333",
    date: "Sep 2022 - Present",
  },
];

const projects = [
  {
    id: "project-1",
    name: "Placeholder 1",
    description: "Description of placeholder 1",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: komikult,
    repo: "https://github.com/OQures",
    demo: "https://github.com/OQures",
  },
  {
    id: "project-2",
    name: "Placeholder 2",
    description: "Description of placeholder 2",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: leaderboard,
    repo: "https://github.com/OQures",
    demo: "https://github.com/OQures",
  },
  {
    id: "project-3",
    name: "Placeholder 3",
    description: "Description of placeholder 3",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: math,
    repo: "https://github.com/OQures",
    demo: "https://github.com/OQures",
  },
  {
    id: "project-4",
    name: "Placeholder 4",
    description: `Description of placeholder 4`,
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: movie,
    repo: "https://github.com/OQures",
    demo: "https://github.com/OQures",
  },
  {
    id: "project-5",
    name: "Placeholder 5",
    description: "Description of placeholder 5",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: nyeusi,
    repo: "https://github.com/OQures",
    demo: "https://github.com/OQures",
  },
];

export { services, technologies, experiences, projects };
