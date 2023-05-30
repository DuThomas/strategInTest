import { Link } from "react-router-dom"
import RedirectLogin from "../RedirectLogin"
import React, { useEffect, useState } from 'react'

const Users = () => {
	const [users, setUsers] = useState([])
	const jwtToken = localStorage.getItem("token")

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
		<div>
			{jwtToken?
				<div className="main_container">
					<div className="projects_container">
						<h1>Liste des utilisateurs</h1>
						<ul>
							{users.map((user, index) => (
								<li key={user._id}>
									<Link to={`/user/${user._id}`}>{user.email}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				:
				<RedirectLogin />
			}
		</div>
	)
}

export default Users