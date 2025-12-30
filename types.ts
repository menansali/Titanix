export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AIAnalysisResponse {
  summary: string;
  techStack: string[];
  estimatedTimeline: string;
  complexity: 'Low' | 'Medium' | 'High';
}