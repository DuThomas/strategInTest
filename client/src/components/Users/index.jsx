import styles from "./styles.module.css"
import React, { useEffect, useState } from 'react'

const Users = () => {
	const handleLogout = () => {
		localStorage.removeItem("token")
		window.location = 'http://localhost:3000'
	}

	const handleLogin = () => {
		localStorage.removeItem("token")
		window.location = 'http://localhost:3000/login'
	}

	const [users, setUsers] = useState([]);

  useEffect(() => {
		const jwtToken = localStorage.getItem("token");
		console.log('jwt:', jwtToken)
    fetch('http://localhost:8080/users', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwtToken}`
			}
		})
		.then((res) => {
			return res.json()
		})
		.then(data => {
			setUsers(data.emails)
		})
		.catch(error => {
			console.error('Erreur lors de la récupération des utilisateurs:', error);
		});
  }, []);

	return (
		<div>
			{
				users?
				<div>
					<h2>Liste des utilisateurs</h2>
					<ul>
						{users.map((user, index) => (
							<li key={index}>{user}</li>
						))}
					</ul>
					<button className={styles.btn} onClick={handleLogout}>
						Se Déconnecter
					</button>
				</div>
				:
				<div>
					<h2>Veuillez vous connecter pour accéder à la listes des utilisateurs</h2>
					<button className={styles.btn} onClick={handleLogin}>
						Se Connecter
					</button>
				</div>
			}
		</div>
	);
};

export default Users;
