import { useState } from "react"
import EmailInput from "../EmailInput"
import PwdInput from "../PwdInput"
import UserForm from "../UserForm"

const Login = () => {
	console.log(process.env.TEST);
	const [data, setData] = useState({ email: "", password: "" })
	const [error_msg, setError_msg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
	
			const resData = await res.json()
			if (resData.error) {
				setError_msg(resData.error)
			}
			else {
				localStorage.setItem("token", resData.jwtToken)
				window.location = "http://localhost:3000"
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	const inputs = [
		<EmailInput
			placeholder="Email" name="email"
			onChange={handleChange} value={data.email}
		/>,
		<PwdInput
			placeholder="Mot de passe" name="password"
			onChange={handleChange} value={data.password}
		/>
	]

	return (
		<UserForm
			title="Se connecter"
			inputs={inputs}
			handleSubmit={handleSubmit}
			error_msg={error_msg}
			btn_text="Se connecter"
		/>
	)
	
}

export default Login
