export interface Project {
	id: number;
	title: string;
	description: string;
	image_url: string | null;
	project_url: string | null;
	tags: string[];
	featured: boolean;
	created_at: string;
	updated_at: string;
}
