import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import Users from "./components/Users"

function App() {
	return (
		<Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/register" exact element={<Register />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/users" exact element={<Users />} />
		</Routes>
	)
}

export default App
