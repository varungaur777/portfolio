import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetailsClient from '@/components/ProjectDetailsClient';

// Pre-build static paths for all slugs for 90+ Lighthouse Performance and zero-runtime query times
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
