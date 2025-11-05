import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
	return (
		<Router>
			<nav className="bg-white shadow p-4">
				<div className="max-w-7xl mx-auto flex justify-between">
					<Link to="/" className="text-2xl font-bold text-blue-600">
						Home
					</Link>
					<Link to="/admin" className="text-blue-600 hover:underline">
						Admin
					</Link>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="*" element={<div className="text-center py-20">404 - Not Found</div>} />
			</Routes>
		</Router>
	);
}

export default App;
