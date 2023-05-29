import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import Users from "./components/Users"
import Delete from "./components/Delete"
import Update from "./components/Update"
import GanttPage from "./components/Gantt"
import Projects from "./components/Projects"

function App() {
	return (
		<Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/register" exact element={<Register />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/users" exact element={<Users />} />
			<Route path="/delete" exact element={<Delete />} />
			<Route path="/update" exact element={<Update />} />
			<Route path="/gantt" exact element={<GanttPage />} />
			<Route path="/projects" exact element={<Projects />} />
		</Routes>
	)
}

export default App
