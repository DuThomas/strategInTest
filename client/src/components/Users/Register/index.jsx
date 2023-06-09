import { useState } from "react"
import UserForm from "../../InputContainer"
import Input from "../../Input"

const Register = () => {
	const [data, setData] = useState({ email: "", password: "" })
	const [error_msg, setError_msg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			const resData = await res.json()
			if(resData.error){
				setError_msg(resData.error)
			}
			else {
				window.location = "http://localhost:3000"
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	const inputs = [
		<Input type="email"
			placeholder="Email" name="email"
			onChange={handleChange} value={data.email}
		/>,
		<Input type="password"
			placeholder="Mot de passe" name="password"
			onChange={handleChange} value={data.password}
		/>
	]

	return (
		<UserForm
			title="S'enregistrer"
			inputs={inputs}
			handleSubmit={handleSubmit}
			error_msg={error_msg}
			btn_text="S'enregistrer"
			cancelPage="/"
		/>
	)
}

export default Register
