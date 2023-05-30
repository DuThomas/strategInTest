import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import RedirectLogin from "../../RedirectLogin"
import Protected from "../../Protected"

const UserProfile = () => {
	const [user, setUser] = useState({})
	const jwtToken = localStorage.getItem("token")
	const { userId } = useParams()
	useEffect(() => {
		const fetchUser = async () => {
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
		fetchUser()
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
		<Protected>
			<div className="main_container">
				<div className="form_container">
					<h1>Profil</h1>
					<div>Email : {user.email}</div>
					<div>Mot de passe : **************</div>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
						<Link to={`/updateUser/${user._id}`} className="blue_btn">Modifier</Link>
						<button className='red_btn' onClick={deleteUser}>Supprimer</button>
					</div>
				</div>
			</div>
		</Protected>
	)
}

export default UserProfile
