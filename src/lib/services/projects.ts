import { Project } from '@/types';
import localProjects from '@/data/projects.json';

interface ProjectSource {
  type: 'github' | 'gitlab' | 'local';
  url?: string;
  token?: string;
}

interface ProjectsConfig {
  sources: ProjectSource[];
  cacheTimeout?: number; // in minutes
  excludeArchived?: boolean;
  excludePrivate?: boolean;
  includeTopics?: string[];
  excludeTopics?: string[];
}

export class ProjectsService {
  private config: ProjectsConfig;
  private cache: {
    projects: Project[];
    lastUpdated: Date;
  } | null = null;

  constructor(config: ProjectsConfig) {
    this.config = {
      cacheTimeout: 60, // Default 1 hour cache
      excludeArchived: true,
      excludePrivate: true,
      ...config
    };
  }

  async getProjects(): Promise<Project[]> {
    // Check cache first
    if (this.cache && this.isCacheValid()) {
      return this.cache.projects;
    }

    const projects: Project[] = [];

    // Fetch from all configured sources
    for (const source of this.config.sources) {
      try {
        const sourceProjects = await this.fetchFromSource(source);
        projects.push(...sourceProjects);
      } catch (error) {
        console.error(`Failed to fetch projects from source ${source.type}:`, error);
      }
    }

    // Update cache
    this.cache = {
      projects,
      lastUpdated: new Date()
    };

    return projects;
  }

  private isCacheValid(): boolean {
    if (!this.cache) return false;
    
    const cacheAge = (new Date().getTime() - this.cache.lastUpdated.getTime()) / 1000 / 60;
    return cacheAge < (this.config.cacheTimeout || 60);
  }

  private async fetchFromSource(source: ProjectSource): Promise<Project[]> {
    switch (source.type) {
      case 'github':
        return this.fetchFromGitHub(source);
      case 'gitlab':
        return this.fetchFromGitLab(source);
      case 'local':
        return this.fetchFromLocal();
      default:
        throw new Error(`Unsupported source type: ${source.type}`);
    }
  }

  private async fetchFromGitHub(source: ProjectSource): Promise<Project[]> {
    if (!source.token) {
      throw new Error('GitHub token is required');
    }

    // Example GitHub API query
    const query = `
      query {
        search(query: "is:public", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              primaryLanguage {
                name
              }
              stargazerCount
              updatedAt
              topics: repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              isArchived
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 1) {
                      nodes {
                        committedDate
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Implementation would use GitHub GraphQL API
    // For now, return empty array
    return [];
  }

  private async fetchFromGitLab(source: ProjectSource): Promise<Project[]> {
    if (!source.token) {
      throw new Error('GitLab token is required');
    }

    // Implementation would use GitLab API
    // For now, return empty array
    return [];
  }

  private async fetchFromLocal(): Promise<Project[]> {
    return localProjects.projects;
  }
}

// Example configuration
export const defaultConfig: ProjectsConfig = {
  sources: [
    {
      type: 'local'
    }
  ],
  cacheTimeout: 60,
  excludeArchived: true,
  excludePrivate: true,
  includeTopics: [],
  excludeTopics: []
};
