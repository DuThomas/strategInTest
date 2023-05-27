import { useState } from "react"
import EmailInput from "../EmailInput"
import PwdInput from "../PwdInput"
import UserForm from "../UserForm"

const Update = () => {
	const [data, setData] = useState({ email: "", newEmail: "", newPassword: "" })
	const [error_msg, setError_msg] = useState("")
	const [update_msg, setUpdated_msg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/update', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			const resData = await res.json()
			if(resData.error){
				setError_msg(resData.error)
				setUpdated_msg('')
			}
			else {
				setError_msg("")
				setUpdated_msg('Données mis à jour')
				setData({ email: "", newEmail: "", newPassword: "" })
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
		<EmailInput
			placeholder="Nouveau Email" name="newEmail"
			onChange={handleChange} value={data.newEmail}
		/>,
		<PwdInput
			placeholder="Nouveau mot de passe" name="newPassword"
			onChange={handleChange} value={data.newPassword}
		/>
	]

	return (
		<UserForm
			title="Modification"
			inputs={inputs}
			handleSubmit={handleSubmit}
			error_msg={error_msg}
			success_msg={update_msg}
			btn_text="Enregistrer"
		/>
	)
}

export default Update
