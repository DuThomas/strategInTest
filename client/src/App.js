import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Register from "./components/Users/Register"
import Login from "./components/Users/Login"
import Users from "./components/Users"
import Delete from "./components/Users/Delete"
import Projects from "./components/Projects"
import GanttPage from "./components/Projects/[projectId]"
import ProjectForm from "./components/Projects/NewProject"
import UpdateProjectForm from "./components/Projects/UpdateProject/[projectId]"
import UserProfile from "./components/Users/Profile"
import Update from "./components/Users/Update/[userId]"

function App() {
	return (
		<Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/register" exact element={<Register />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/users" exact element={<Users />} />
			<Route path="/delete" exact element={<Delete />} />
			<Route path="/updateUser/:userId" exact element={<Update />} />
			<Route path="/user/:userId" exact element={<UserProfile />} />
			{/* <Route path="/gantt" exact element={<GanttPage />} /> */}
			<Route path="/projects" exact element={<Projects />} />
			<Route path="/projects/:projectId" exact element={<GanttPage />} />
			<Route path="/newProject" exact element={<ProjectForm />} />
			<Route path="/updateProject/:projectId" exact element={<UpdateProjectForm />} />
		</Routes>
	)
}

export default App
