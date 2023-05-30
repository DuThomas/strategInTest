import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import RedirectLogin from "../../RedirectLogin"

const UserProfile = () => {
	const [user, setUser] = useState({})
	const jwtToken = localStorage.getItem("token")
	const { userId } = useParams()
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch('http://localhost:8080/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ _id: userId })
				})
				const data = await res.json()
				if (data.user.length > 0) {
					setUser(data.user[0])
				}
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchUsers()
	}, [])

	const deleteUser = async () => {
		try {
			const res = await fetch('http://localhost:8080/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: user.email })
			})

			// const resData = await res.json()
		} catch (error) {
			throw new Error(error)
		}
    window.location = "http://localhost:3000/users"
	}

	return (
		<div>
			{jwtToken?
				<div className="main_container">
					<div className="projects_container">
						<h1>Profil</h1>
						<div>Email : {user.email}</div>
						<button className='red_btn' onClick={deleteUser}>Supprimer le compte</button>
					</div>
				</div>
				:
				<RedirectLogin />
			}
		</div>
	)
}

export default UserProfile
