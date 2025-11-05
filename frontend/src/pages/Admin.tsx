import { useState, useEffect } from "react";
import type { Project } from "../types/project";
import { api } from "../services/api";

export default function Admin() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [form, setForm] = useState<Omit<Project, "id" | "created_at" | "updated_at">>({
		title: "",
		description: "",
		image_url: "",
		project_url: "",
		tags: [],
		featured: false,
	});
	const [editingId, setEditingId] = useState<number | null>(null);

	const loadProjects = () => api.getProjects().then(setProjects);

	useEffect(() => {
		loadProjects();
	}, []);

	const resetForm = () => {
		setForm({
			title: "",
			description: "",
			image_url: "",
			project_url: "",
			tags: [],
			featured: false,
		});
		setEditingId(null);
	};

	const handleEdit = (project: Project) => {
		setForm({
			title: project.title,
			description: project.description,
			image_url: project.image_url,
			project_url: project.project_url,
			tags: project.tags,
			featured: project.featured,
		});
		setEditingId(project.id);
	};

	const handleSubmit = async (elt: React.FormEvent) => {
		elt.preventDefault();
		try {
			if (editingId) {
				await api.updateProject(editingId, form);
			} else {
				await api.createProject(form);
			}
			resetForm();
			loadProjects();
		} catch (error) {
			alert("Error while saving : " + error);
		}
	};

	const handleDelete = async (id: number) => {
		if (confirm("Delete this project?")) {
			await api.deleteProject(id);
			loadProjects();
		}
	};

	// console.log(form);

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Panel</h1>
				{/* FORM */}
				<form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8">
					<div className="grid md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Title"
							value={form.title}
							onChange={(elt) => setForm({ ...form, title: elt.target.value })}
							className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
							required
						/>
						<input
							type="url"
							placeholder="URL of project"
							value={form.project_url ?? ""}
							onChange={(elt) => setForm({ ...form, project_url: elt.target.value })}
							className="p-3 border rounded-lg "
						/>
						<input
							type="url"
							placeholder="URL of image"
							value={form.image_url ?? ""}
							onChange={(elt) => setForm({ ...form, image_url: elt.target.value })}
							className="p-3 border rounded-lg "
						/>
						{/* <input
							type="text"
							placeholder="Tags (seperated by comas)"
							value={form.tags?.join(", ") || ""}
							onChange={(elt) => {
								const input = elt.target.value;
								console.log(input);
								const tags = input
									.split(",")
									.map((t) => t.trim())
									.filter((t) => t !== "");
								console.log(tags);
								setForm({ ...form, tags });
							}}
							className="p-3 border rounded-lg "
						/> */}
						<div className="md:col-span-2 space-y-2">
							<div className="flex items-center justify-between">
								<label className="text-sm font-medium text-gray-700">Tags</label>
								<button
									type="button"
									onClick={() => setForm({ ...form, tags: [...form.tags, ""] })}
									className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
								>
									+ Add a tag
								</button>
							</div>
							{form.tags.map((tag, index) => (
								<div className="flex gap-2 items-center" key={index}>
									<input
										type="text"
										value={tag}
										onChange={(elt) => {
											const newTags = [...form.tags];
											newTags[index] = elt.target.value;
											setForm({ ...form, tags: newTags });
										}}
										placeholder="Tag name"
										className="flex-1 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
									/>
									<button
										type="button"
										onClick={() => {
											const newTags = form.tags.filter((_, i) => i !== index);
											setForm({ ...form, tags: newTags });
										}}
										className="text-red-600 hover:text-red-800 "
									>
										- Delete the tag
									</button>
								</div>
							))}
							{form.tags.length === 0 && <p className="text-sm text-gray-500 italic"> No tag yet. Add one </p>}
						</div>
						<textarea
							placeholder="Description"
							value={form.description}
							className="w-full p-3 border rounded-lg mt-4 h-32"
							onChange={(elt) => setForm({ ...form, description: elt.target.value })}
							required
						/>
						<div className="flex items-center gap-4 mt-4">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.featured}
									className="w-5 h-5 text-blue-600"
									onChange={(elt) => setForm({ ...form, featured: elt.target.checked })}
								/>
								<span>HOT</span>
							</label>
						</div>
						<div className="flex gap-3 mt-6">
							<button
								type="submit"
								className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
							>
								{editingId ? "Update" : "Create"}
							</button>
							{editingId && (
								<button
									type="button"
									onClick={resetForm}
									className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
								>
									Cancel
								</button>
							)}
						</div>
					</div>
				</form>

				{/* LIST */}
				<div className="space-y-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
						>
							<div>
								<h3 className="font-bold text-lg">{project.title}</h3>
								<p className="text-sm text-gray-600">{project.tags.join(", ")}</p>
								{project.featured && (
									<span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">HOT</span>
								)}
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => handleEdit(project)}
									className="bg-yellow-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-yellow-600"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(project.id)}
									className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// export default function Admin() {
// 	return (
// 		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
// 			<div className="bg-white p-10 rounded-xl shadow-lg text-center">
// 				<h1 className="text-4xl font-bold text-gray-800 mb-4">Panel Admin</h1>
// 				<p className="text-gray-600">Connecte-toi pour gérer tes projets</p>
// 			</div>
// 		</div>
// 	);
// }
