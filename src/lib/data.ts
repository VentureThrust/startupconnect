import type { UserProfile, Project } from "./types";

export const users: UserProfile[] = [
  {
    id: "user-1",
    name: "Alex Innovator",
    avatarUrl: "https://picsum.photos/seed/user1/200/200",
    startupName: "CodeGenius",
    description: "Building tools to make software development 10x faster.",
    skills: ["React", "TypeScript", "Node.js", "AI Integration", "UI/UX Design"],
    experience: "5 years as a full-stack developer at a FAANG company. Launched two successful side-projects. Passionate about developer productivity and beautiful interfaces.",
    productDetails: "Working on an AI-powered code generation tool that integrates directly into VS Code. It helps automate boilerplate, write tests, and refactor code with natural language prompts.",
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "EcoTrack",
    description: "A mobile app to track and reduce your carbon footprint.",
    longDescription: "EcoTrack is a comprehensive mobile application designed to empower individuals to combat climate change. By tracking daily activities, from transit to diet, the app provides real-time feedback on your carbon footprint. It offers personalized challenges, sustainable alternatives, and a community feature to share progress and tips. We're looking for passionate individuals to help us refine the user experience and expand our feature set.",
    requiredSkills: ["React Native", "Firebase", "UI/UX Design", "Node.js"],
    teamSize: 3,
    ownerId: "user-2",
    imageUrl: "https://picsum.photos/seed/proj1/600/400",
    imageHint: "nature technology",
  },
  {
    id: "proj-2",
    name: "QuantumLeap AI",
    description: "An AI platform for drug discovery and molecular simulation.",
    longDescription: "QuantumLeap AI is at the forefront of computational chemistry, leveraging machine learning to accelerate drug discovery. Our platform allows researchers to simulate molecular interactions at an unprecedented scale and accuracy. We are seeking a machine learning expert to help us develop and optimize our predictive models and a frontend developer to build intuitive data visualization tools.",
    requiredSkills: ["Python", "PyTorch", "Machine Learning", "Data Visualization", "React"],
    teamSize: 5,
    ownerId: "user-3",
    imageUrl: "https://picsum.photos/seed/proj2/600/400",
    imageHint: "science lab",
  },
  {
    id: "proj-3",
    name: "ConnectSphere",
    description: "A decentralized social network focused on privacy.",
    longDescription: "Tired of centralized platforms harvesting your data? ConnectSphere is a next-generation social network built on decentralized principles. Users own their data and control their digital identity. We're using cutting-edge peer-to-peer technology and cryptography to build a more equitable and private online social space. We need a security engineer to help audit our protocols and a mobile developer to build out our client apps.",
    requiredSkills: ["Solidity", "IPFS", "Cryptography", "Security", "Swift/Kotlin"],
    teamSize: 2,
    ownerId: "user-4",
    imageUrl: "https://picsum.photos/seed/proj3/600/400",
    imageHint: "digital network",
  },
  {
    id: "proj-4",
    name: "Artify",
    description: "An AI-powered tool for generating unique digital art.",
    longDescription: "Artify is a creative platform that empowers anyone to become a digital artist. Using advanced generative adversarial networks (GANs), users can generate stunning, unique artworks from simple text prompts. We're looking for a UI/UX designer to create a magical and intuitive user experience, and a backend engineer to manage our GPU-powered art generation pipeline.",
    requiredSkills: ["UI/UX Design", "Figma", "Generative AI", "Python", "AWS"],
    teamSize: 4,
    ownerId: "user-1",
    imageUrl: "https://picsum.photos/seed/proj4/600/400",
    imageHint: "abstract art",
  },
];
