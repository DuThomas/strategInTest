import React, { useEffect, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import moment from 'moment'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import "../project.css"
import { Link, useParams } from 'react-router-dom'
import Protected from '../../Protected'
import { createTask, deleteTask, updateTask } from '../../../controllers/taskController'
import { createLink, deleteLink, updateLink } from '../../../controllers/linkController'
import { fetchProject, fetchProjectTasks } from '../../../controllers/projectController'

const ProjectView = () => {
	const [project, setProject] = useState([])
	const { projectId } = useParams()

  useEffect(() => {
    const ganttContainer = document.getElementById('gantt-container')
    gantt.init(ganttContainer)

    gantt.attachEvent('onAfterTaskAdd', (id, item) => {
      createTask(item, projectId)
    })

    gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
      updateTask(item)
    })

    gantt.attachEvent('onAfterTaskDelete', (id, item) => {
      deleteTask(id)
    })

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      createLink(link, projectId)
    })

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      updateLink(link)
    })

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      deleteLink(id)
    })

		fetchProjectTasks(projectId)
		setProject(fetchProject(projectId))
  }, [])

  const deleteProject = async () => {
    try {
			await fetch('http://localhost:8080/project/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: projectId })
			})
      window.location = "http://localhost:3000/projects"
		} catch (error) {
			throw new Error(error)
		}
  }

  return (
    <Protected>
      <div className='project_view'>
        <h1>{project.title}</h1>
        <div id="gantt-container" style={{ width: '100%', height: '400px' }} />
        <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center' , gap: '10px'}}>
          <Link to={`/updateProject/${project._id}`} className="blue_btn">Renommer le projet</Link>
          <button className='red_btn' onClick={deleteProject}>Supprimer le projet</button>
        </div>
      </div>
    </Protected>
    )
}

export default ProjectView