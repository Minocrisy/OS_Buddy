"use client";

import { useState, useEffect } from 'react';
import { Project, FilterState } from '@/types';
import { ProjectCard } from '@/components/features/project-card';
import { SearchFilter } from '@/components/features/search-filter';
import { ProjectsService, defaultConfig } from '@/lib/services/projects';

// Initialize projects service with local data source
const projectsService = new ProjectsService({
  ...defaultConfig,
  sources: [
    {
      type: 'local'
    }
  ]
});

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projectsService.getProjects();
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (filters: FilterState) => {
    let results = projects;

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.topics.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }

    // Apply contribution area filter
    if (filters.selectedAreas.length > 0) {
      results = results.filter(project =>
        project.needsHelp.some(area =>
          filters.selectedAreas.includes(area.type)
        )
      );
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      results = results.filter(project =>
        project.needsHelp.some(area =>
          filters.difficulty.includes(area.difficulty)
        )
      );
    }

    // Apply language filter
    if (filters.language.length > 0) {
      results = results.filter(project =>
        filters.language.includes(project.language)
      );
    }

    setFilteredProjects(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Open Source Projects
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Find projects that match your interests and skill level
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <SearchFilter onSearch={handleSearch} />
            </div>

            {/* Projects Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Loading projects...
                  </h3>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
                    Error: {error}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Please try again later or contact support if the problem persists.
                  </p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No projects found
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try adjusting your filters to find more projects
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onContribute={() => {
                        window.open(project.repository, '_blank');
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
