interface Props {
	tags: string[];
	selected: string;
	onSelect: (tag: string) => void;
}

export default function TagFilter({ tags, selected, onSelect }: Props) {
	return (
		<div className="flex flex-wrap gap-2 justify-center py-4">
			<button
				onClick={() => onSelect("")}
				className={`px-4 py-2 rounded-full font-medium transition ${
					!selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
				}`}
			>
				All
			</button>
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => onSelect(tag)}
					className={`px-4 py-2 rounded-full font-medium ${
						selected === tag ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
}
