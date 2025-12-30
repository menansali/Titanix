import { AIAnalysisResponse } from '../types';

// Mock implementation - no API key required
export const analyzeProjectIdea = async (userIdea: string): Promise<AIAnalysisResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple keyword-based analysis (no AI needed)
  const idea = userIdea.toLowerCase();
  
  // Determine complexity based on keywords
  let complexity: "Low" | "Medium" | "High" = "Medium";
  if (idea.includes('iot') || idea.includes('mobile') || idea.includes('dashboard') || idea.includes('api')) {
    complexity = idea.includes('ai') || idea.includes('machine learning') || idea.includes('blockchain') ? "High" : "Medium";
  } else if (idea.includes('website') || idea.includes('landing page') || idea.includes('portfolio')) {
    complexity = "Low";
  }

  // Generate tech stack based on keywords
  const techStack: string[] = [];
  if (idea.includes('mobile') || idea.includes('app')) {
    techStack.push('React Native');
  }
  if (idea.includes('web') || idea.includes('dashboard') || idea.includes('website')) {
    techStack.push('React', 'TypeScript');
  }
  if (idea.includes('iot') || idea.includes('sensor') || idea.includes('device')) {
    techStack.push('MQTT', 'Node.js');
  }
  if (idea.includes('backend') || idea.includes('api') || idea.includes('server')) {
    techStack.push('Node.js', 'Express');
  }
  if (idea.includes('database') || idea.includes('data')) {
    techStack.push('PostgreSQL');
  }
  
  // Default stack if nothing matches
  if (techStack.length === 0) {
    techStack.push('React', 'TypeScript', 'Node.js');
  }

  // Estimate timeline based on complexity
  let estimatedTimeline = "4-6 weeks";
  if (complexity === "High") {
    estimatedTimeline = "12-16 weeks";
  } else if (complexity === "Low") {
    estimatedTimeline = "2-4 weeks";
  }

  // Generate summary
  const summary = `Based on your idea "${userIdea}", we can create a ${complexity.toLowerCase()} complexity solution. Our team will work with you to refine the requirements and deliver a production-ready application.`;

  return {
    summary,
    techStack: techStack.slice(0, 6), // Limit to 6 technologies
    estimatedTimeline,
    complexity
  };
};
