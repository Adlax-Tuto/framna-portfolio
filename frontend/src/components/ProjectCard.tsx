import type { Project } from "../types/project";

interface Props {
	project: Project;
}

export default function ProjectCard({ project }: Props) {
	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:-translate-x-1">
			{project.image_url ? (
				<img src={project.image_url} alt={project.title} className="w-full h-56 object-cover" />
			) : (
				<div className="bg-gray-200 h-56 flex items-center justify-center">
					<span className="text-gray-500">No image</span>
				</div>
			)}
			<div className="p-6">
				<h3 className="text-xl font-bold mb-2">{project.title}</h3>
				<p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
				<div className="flex flex-wrap gap-1 mb-3">
					{project.tags.map((tag) => (
						<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded" key={tag}>
							{tag}
						</span>
					))}
				</div>
				{project.project_url && (
					<a href={project.project_url} target="_blank" className="text-blue-600 hover:underline text-sm">
						See the project
					</a>
				)}
			</div>
		</div>
	);
}
