import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Register from "./components/Users/Register"
import Login from "./components/Users/Login"
import Users from "./components/Users"
import Projects from "./components/Projects"
import GanttPage from "./components/Projects/[projectId]"
import ProjectForm from "./components/Projects/NewProject"
import UpdateProjectForm from "./components/Projects/UpdateProject/[projectId]"
import UserProfile from "./components/Users/Profile"
import Update from "./components/Users/Update/[userId]"
import NotFound from "./components/NotFound"

function App() {
	return (
		<Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/register" exact element={<Register />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/users" exact element={<Users />} />
			<Route path="/updateUser/:userId" exact element={<Update />} />
			<Route path="/user/:userId" exact element={<UserProfile />} />
			<Route path="/projects" exact element={<Projects />} />
			<Route path="/projects/:projectId" exact element={<GanttPage />} />
			<Route path="/newProject" exact element={<ProjectForm />} />
			<Route path="/updateProject/:projectId" exact element={<UpdateProjectForm />} />
  			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
