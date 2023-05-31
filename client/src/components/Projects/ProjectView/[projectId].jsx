import React, { useEffect, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import moment from 'moment'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import "../project.css"
import { Link, useParams } from 'react-router-dom'
import Protected from '../../Protected'
import { createTask, deleteTask, updateTask } from '../../../controllers/task.js'
import { createLink, deleteLink, updateLink } from '../../../controllers/link.js'
import { deleteProject } from '../../../controllers/project'

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

    const fetchProjectTasks = async () => {
			try {
				const taskRes = await fetch('http://localhost:8080/task/projectTasks', {
					method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
					body: JSON.stringify({ projectId })
				})
				const tasksData = await taskRes.json()

        const formattedTasks = tasksData.projectTasks?.map(task => ({
          ...task,
          start_date: moment(task.start_date).format('DD-MM-YYYY'),
        }))

        const linksRes = await fetch('http://localhost:8080/link/projectLinks', {
					method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
					body: JSON.stringify({ projectId })
				})
				const linksData = await linksRes.json()

        const links = linksData.projectLinks

				gantt.clearAll()
        gantt.parse({ data: formattedTasks, links })
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchProjectTasks()

		const fetchProject = async () => {
			try {
				const res = await fetch('http://localhost:8080/project', {
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

  return (
    <Protected>
      <div className='project_view'>
        <h1>{project.title}</h1>
        <div id="gantt-container" style={{ width: '100%', height: '400px' }} />
        <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center' , gap: '10px'}}>
          <Link to={`/updateProject/${project._id}`} className="blue_btn">Renommer le projet</Link>
          <button className='red_btn' onClick={() => deleteProject(projectId)}>Supprimer le projet</button>
        </div>
      </div>
    </Protected>
    )
}

export default ProjectView