import { useEffect, useState } from "react"
import UserForm from "../../UserForm"
import Input from "../../Input"
import { useParams } from "react-router-dom"
import Protected from "../../Protected"

const Update = () => {
	const [data, setData] = useState({ newEmail: "", newPassword: "" })
	const [error_msg, setError_msg] = useState("")
	const [update_msg, setUpdated_msg] = useState("")
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
				console.log("data", data);
				if (data.user.length > 0) {
					setData({ newEmail: data.user[0].email })
				}
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchUser()
	}, [])

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
				body: JSON.stringify({ ...data, _id: userId })
			})
			const resData = await res.json()
			if (resData.error) {
				setError_msg(resData.error)
				setUpdated_msg('')
			}
			else {
				setError_msg("")
				setUpdated_msg('Données mis à jour')
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	const inputs = [
		<Input type="email"
			placeholder="Nouveau Email" name="newEmail"
			onChange={handleChange} value={data.newEmail}
		/>,
		<Input type="password"
			placeholder="Nouveau mot de passe" name="newPassword"
			onChange={handleChange} value={data.newPassword}
		/>
	]

	return (
		<Protected>
			<UserForm
				title="Modification"
				inputs={inputs}
				handleSubmit={handleSubmit}
				error_msg={error_msg}
				success_msg={update_msg}
				btn_text="Enregistrer"
				cancelPage={`/user/${userId}`}
			/>
		</Protected>
	)
}

export default Update
