import { useState } from "react"
import EmailInput from "../EmailInput"
import UserForm from "../UserForm"

const Delete = () => {
	const [data, setData] = useState({ email: ""})
	const [error_msg, setError_msg] = useState("")
	const [deleted_msg, setDeleted_msg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
	
			const resData = await res.json()
			if(resData.error){
				setError_msg(resData.error)
				setDeleted_msg('')
			}
			else {
				setError_msg("")
				setDeleted_msg(`${data.email} à été suppprimé`)
				setData({ email: "" })
			}
		} catch (error) {
			throw new Error(error)
		}
	}
	
	const inputs = [
		<EmailInput
			placeholder="Email" name="email"
			onChange={handleChange} value={data.email}
		/>
	]

	return (
		<UserForm
			title="Supprimer un utilisateur"
			inputs={inputs}
			handleSubmit={handleSubmit}
			error_msg={error_msg}
			success_msg={deleted_msg}
			btn_text="Supprimer"
		/>
	)
}

export default Delete
