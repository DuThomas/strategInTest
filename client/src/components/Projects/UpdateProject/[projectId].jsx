import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../../index.css'
import UserForm from '../../InputContainer'
import Input from '../../Input'
import Protected from '../../Protected'

const UpdateProjectForm = () => {
	const [project, setProject] = useState({ title: "" })
	const [error_msg, setError_msg] = useState("")
	const { projectId } = useParams()

	const handleChange = ({ currentTarget: input }) => {
		setProject({ ...project, [input.name]: input.value })
	}

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await fetch('http://localhost:8080/project/fetch', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ _id: projectId })
				})
				const data = await res.json()
				setProject(data.project)

			} catch (error) {
				throw new Error(error)
			}
		}
		fetchProject()
	}, [])
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/project/', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: projectId ,title: project.title })
			})

			const resData = await res.json()
			if (resData.error) {
				setError_msg(resData.error)
			}
			else {
				window.location = `http://localhost:3000/projects/${projectId}`
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	const inputs = [
		<Input type="text"
			placeholder="Nom du projet" name="title"
			onChange={handleChange} value={project.title}
		/>
	]

	return (
		<Protected>
			<UserForm
				title="Renommer le Projet"
				handleSubmit={handleSubmit}
				inputs={inputs}
				btn_text="Enregistrer"
				error_msg={error_msg}
				cancelPage={`/projects/${projectId}`}
			/>
		</Protected>
	)
}

export default UpdateProjectForm