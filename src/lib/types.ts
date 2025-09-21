export type UserProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  startupName: string;
  description: string;
  skills: string[];
  experience: string;
  productDetails: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  requiredSkills: string[];
  teamSize: number;
  ownerId: string;
  imageUrl: string;
  imageHint: string;
  compensation: 'paid' | 'equity' | 'partnership' | 'co-founder';
  incentives?: string;
  equitySplit?: string;
  saved?: boolean;
};
