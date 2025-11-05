import React, { useState, useEffect } from "react";
import type { Project } from "../types/project";
import { api } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import TagFilter from "../components/TagFilter";

export default function Home() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [featured, setFeatured] = useState<Project | null>(null);
	const [tags, setTags] = useState<string[]>([]);
	const [selectedTag, setSelectedTag] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api.getProjects().then((data) => {
			console.log(data);
			const featuredProject = data.find((p) => p.featured) || null;
			// const others = data.filter((p) => !p.featured);
			const others = data;
			setFeatured(featuredProject);
			setProjects(others);
			const allTags = Array.from(new Set(data.flatMap((p) => p.tags || []))).sort();
			setTags(allTags);
			setLoading(false);
		});
	}, []);

	const filtered = selectedTag ? projects.filter((p) => p.tags.includes(selectedTag)) : projects;

	if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;

	// console.log(featured);
	// console.log(tags);
	// console.log(projects);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* FEATURED */}
			{featured && (
				<section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
					<div className="max-w-7xl mx-auto px-4 text-center">
						<h1 className="text-5xl font-bold mb-6">HOT</h1>
						<div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-xl p-8">
							<ProjectCard project={featured} />
						</div>
					</div>
				</section>
			)}

			{/* FILTERS / TAGS */}
			{tags.length > 0 && <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />}

			{/* GRID */}
			<section className="py-12">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{filtered.map((pj) => (
							<ProjectCard key={pj.id} project={pj} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
