import { useState, useEffect, useContext } from 'react'
import { Link, Router, useHistory } from 'react-router-dom'
import '../../index.css'
import UserForm from '../UserForm'
import Input from '../Input'
import Protected from '../Protected'

const ProjectForm = () => {
	const [project, setProject] = useState({ title: ""})
	const [error_msg, setError_msg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setProject({ ...project, [input.name]: input.value })
	}
 
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch('http://localhost:8080/project/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title: project.title })
			})

			const resData = await res.json()
			if(resData.error){
				setError_msg(resData.error)
			}
			else {
				window.location = "http://localhost:3000/projects"
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
				title="Nouveau Projet"
				handleSubmit={handleSubmit}
				inputs={inputs}
				btn_text="Créer"
				error_msg={error_msg}
				cancelPage="/projects"
			/>
		</Protected>
	)
}

export default ProjectForm