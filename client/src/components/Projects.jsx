import { useState, useEffect, useContext } from 'react'
import { Link, Router } from 'react-router-dom'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
			try {
				const res = await fetch('http://localhost:8080/project', {
          headers: {
            'Content-Type': 'application/json'
          },
				})
				const data = await res.json()
        setProjects(data.projects)
        console.log(data);

			} catch (error) {
				throw new Error(error)
			}
		}
		fetchProjects()
  }, [])



  return (
    <div>
      <h1 className=''> Projects </h1>
      {projects.map((project) => (
        <div key={project._id}>
          <Link to={`/gantt/${project._id}`}>{project.title}</Link>
        </div>
      ))}
    </div>
  )
}