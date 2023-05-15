import { useState } from "react"
import styles from "./styles.module.css"

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" })
	const [error, setError] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => res.json())
		.then((data) => {
			if(data.error){
				setError(data.error)
			}
			else {
				localStorage.setItem("token", data.jwtToken)
				window.location = "http://localhost:3000"
			}
		})
		.catch((error) => console.error(error))
	}

	return (
		<div className={styles.login_container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Se connecter</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
					className={styles.input}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					className={styles.input}
				/>
				{error && <div className={styles.error_msg}>{error}</div>}
				<button type="submit" className={styles.green_btn}>
					Se connecter
				</button>
			</form>
		</div>
	)
}

export default Login
