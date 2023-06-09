import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Protected from "../../Protected"

const API_URL = 'http://localhost:8080'

const UserProfile = () => {
	const [user, setUser] = useState({})
	const { userId } = useParams()
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(API_URL + '/users', {
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
			await fetch((API_URL + '/'), {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: user.email })
			})
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
