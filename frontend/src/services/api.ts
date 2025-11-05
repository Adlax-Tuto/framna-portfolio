import type { Project } from "../types/project";

const API_URL = "http://localhost:8000";

export const api = {
	async getProjects(): Promise<Project[]> {
		const res = await fetch(`${API_URL}/projects`);
		if (!res) throw new Error("Failed to fetch anything");
		return res.json();
	},
	async createProject(data: Partial<Project>): Promise<Project> {
		const res = await fetch(`${API_URL}/projects`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to create project");
		return res.json();
	},
	async updateProject(id: number, data: Partial<Project>): Promise<Project> {
		const res = await fetch(`${API_URL}/projects/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update project");
		return res.json();
	},
	async deleteProject(id: number): Promise<void> {
		const res = await fetch(`${API_URL}/projects/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) throw new Error("Failed to delete project");
	},
};
