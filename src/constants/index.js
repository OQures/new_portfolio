import {
  frontend,
  backend,
  ux,
  prototyping,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "services",
    title: "Services",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Interior Detailing",
    icon: frontend,
    description: "Complete interior refinement including leather conditioning, carpet cleaning, and upholstery restoration to luxury standards.",
  },
  {
    title: "Exterior Polishing",
    icon: backend,
    description: "Professional paint correction, polishing, and ceramic coating to restore and protect your aircraft's exterior finish.",
  },
  {
    title: "Engine Bay Cleaning",
    icon: ux,
    description: "Meticulous engine compartment cleaning and detailing to maintain optimal performance and appearance.",
  },
  {
    title: "Full Aircraft Restoration",
    icon: prototyping,
    description: "Comprehensive restoration services bringing aging aircraft back to showroom condition inside and out.",
  },
];

export { services };
