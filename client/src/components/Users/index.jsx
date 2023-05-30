import { Link } from "react-router-dom"
import RedirectLogin from "../RedirectLogin"
import React, { useEffect, useState } from 'react'
import Protected from "../Protected"

const Users = () => {
	const [users, setUsers] = useState([])
	const jwtToken = localStorage.getItem("token")
	console.log("JWT", jwtToken);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch('http://localhost:8080/users', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${jwtToken}`
					}
				})
				const data = await res.json()
				setUsers(data.users)
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchUsers()
	}, [])

	return (
		<Protected>
			<div className="main_container">
				<div className="projects_container">
					<h1>Liste des utilisateurs</h1>
					<ul>
						{users?.map((user, index) => (
							<li key={user._id}>
								<Link to={`/user/${user._id}`}>{user.email}</Link>
							</li>
						))}
					</ul>
					<Link to={`/register`} className="blue_btn">Nouveau compte</Link>
				</div>
			</div>
		</Protected>
	)
}

export default Users