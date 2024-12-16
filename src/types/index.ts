export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ContributionType = 
  | 'Documentation'
  | 'Testing'
  | 'Bug Reports'
  | 'Translation'
  | 'User Feedback';

export interface ContributionArea {
  type: ContributionType;
  difficulty: Difficulty;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  repository: string;
  language: string;
  stars: number;
  lastUpdated: string;
  topics: string[];
  needsHelp: ContributionArea[];
  status: 'active' | 'inactive';
  contributionGuidelines?: string;
  issueCount?: number;
  maintainers: string[];
  recentActivity?: {
    type: string;
    description: string;
    date: string;
  }[];
}

export interface FilterState {
  searchTerm: string;
  selectedAreas: ContributionType[];
  difficulty: Difficulty[];
  language: string[];
}
