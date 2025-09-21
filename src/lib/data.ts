import type { UserProfile, Project } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

// This is a mock database. In a real application, you would use a real database.
export const users: UserProfile[] = [];

export const projects: Project[] = [
    {
        id: 'proj-1',
        name: 'EcoTrack',
        description: 'A mobile app to track and reduce your carbon footprint.',
        longDescription: `EcoTrack is a comprehensive mobile application designed to empower users to monitor and reduce their environmental impact. By tracking daily activities, users can gain insights into their carbon footprint and receive personalized suggestions for a more sustainable lifestyle.

**Key Features:**
- Real-time carbon footprint calculation
- Personalized eco-friendly challenges
- Community-based goals and leaderboards
- Educational resources on sustainability

We are looking for passionate individuals to join our mission and help us build a greener future.`,
        requiredSkills: ['React Native', 'Node.js', 'Firebase', 'UI/UX Design'],
        teamSize: 4,
        ownerId: 'user-123',
        imageUrl: PlaceHolderImages[0].imageUrl,
        imageHint: PlaceHolderImages[0].imageHint,
        compensation: 'equity',
        equitySplit: '2% - 5%',
        incentives: 'Performance-based bonuses',
    },
    {
        id: 'proj-2',
        name: 'MoleculeAI',
        description: 'An AI platform for drug discovery and molecular simulation.',
        longDescription: `MoleculeAI is a cutting-edge platform that leverages artificial intelligence to accelerate drug discovery. By simulating molecular interactions and predicting compound efficacy, we aim to reduce the time and cost of developing new medicines.

**What we're building:**
- A scalable cloud-based simulation engine
- Advanced machine learning models for predictive analysis
- An intuitive interface for researchers and scientists

We are seeking talented developers and scientists to help us revolutionize the pharmaceutical industry.`,
        requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Bioinformatics'],
        teamSize: 6,
        ownerId: 'user-456',
        imageUrl: PlaceHolderImages[1].imageUrl,
        imageHint: PlaceHolderImages[1].imageHint,
        compensation: 'paid',
        incentives: '$10,000 launch bonus',
    },
    {
        id: 'proj-3',
        name: 'NexusNet',
        description: 'A decentralized social network focused on privacy.',
        longDescription: `NexusNet is a next-generation social network built on decentralized principles to ensure user privacy and data ownership. Unlike traditional platforms, NexusNet gives users full control over their data and interactions.

**Core Principles:**
- End-to-end encryption for all communications
- Peer-to-peer data sharing without central servers
- A community-governed content moderation system

Join us in building a more private and secure online social space.`,
        requiredSkills: ['Blockchain', 'P2P Networking', 'Cryptography', 'React'],
        teamSize: 3,
        ownerId: 'user-789',
        imageUrl: PlaceHolderImages[2].imageUrl,
        imageHint: PlaceHolderImages[2].imageHint,
        compensation: 'co-founder',
        equitySplit: '25% co-founder equity',
    },
    {
        id: 'proj-4',
        name: 'Artify',
        description: 'An AI-powered tool for generating unique digital art.',
        longDescription: `Artify is an innovative AI tool that empowers anyone to become a digital artist. By simply providing a text prompt, users can generate stunning, unique artwork in a matter of seconds. Our platform is built on advanced generative models, offering a wide range of artistic styles.

**Features:**
- Text-to-image generation with high-resolution output
- Style transfer and image manipulation
- A gallery to showcase and share generated art

We are looking for creative developers and AI enthusiasts to help us push the boundaries of digital art.`,
        requiredSkills: ['Generative AI', 'Next.js', 'Vercel', 'UI/UX Design'],
        teamSize: 5,
        ownerId: 'user-123',
        imageUrl: PlaceHolderImages[3].imageUrl,
        imageHint: PlaceHolderImages[3].imageHint,
        compensation: 'partnership',
        incentives: 'Revenue sharing from premium features',
    },
];
