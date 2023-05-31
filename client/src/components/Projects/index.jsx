import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'
import Protected from '../Protected'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
			try {
				const res = await fetch('http://localhost:8080/project/fetch', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
				})
				const data = await res.json()
        setProjects(data.projects)

			} catch (error) {
				throw new Error(error)
			}
		}
		fetchProjects()
  }, [])

  return (
    <Protected>
      <div className='main_container'>
        <div className='projects_container'>
          <h1 className=''> Liste des projets </h1>
          <div >
            {projects?.map(({ _id, title }) => (
              <div key={_id}>
                {'>'}<Link to={`/projects/${_id}`}>{title}</Link>
              </div>
            ))}
          </div>
          <Link to={`/newProject`} className="blue_btn">Nouveau projet</Link>
        </div>
      </div>
    </Protected>
  ) 
}

export default Projects