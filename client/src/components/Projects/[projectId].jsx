import React, { useEffect, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import moment from 'moment'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import "./project.css"
import { Link, useParams } from 'react-router-dom'
import Protected from '../Protected'
import { createTask, deleteTask, updateTask } from './taskController'
import { createLink } from './linkController'

const GanttPage = () => {
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
      deleteTask(item.id)
    })


    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      console.log('Nouveau lien créé :', link);
      createLink(link, projectId)
    })

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      console.log('Lien mis à jour :', link);
    })

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      console.log('Nouveau lien suprimé :', link);
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
				console.log("fetch task data :", tasksData)

        const formattedTasks = tasksData.projectTasks.map(task => ({
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

        const formattedLinks = tasksData.projectTasks.map(task => ({
          ...task,
          start_date: moment(task.start_date).format('DD-MM-YYYY'),
        }))

        const links = linksData.projectLinks

        
				// console.log("fetch link data :", links)

        // const formattedTasks = tasksData.projectTasks.map(task => ({
        //   ...task,
        //   start_date: moment(task.start_date).format('DD-MM-YYYY'),
        // }))

        // const links = [{'source': '1685455698438', 'target': '1685455698439', 'type': '0', 'id': 1685455698443}]

        const tasks = {
          "data": [
            {"id": 1, "text": "P1", "start_date": "01/06/2023", "duration": 5, "_id": "sdfdsfdsdff4s4d5f6sdf6sdf5"},
            {"_id": "sdfdsfdf4s4d5f6sdf6sdf5", "id": 2, "text": "P2", "start_date": "01/06/2023", "duration": 1},
            {"id": 3, "text": "P3", "start_date": "02/06/2023", "duration": 2, "_id": "sdfdsfdf4s4d5sdff6sdf6sdf5"},
          ],
          "links": [
            {"id": 1, "source": 1, "target": 2, "type": "1", "_id": "sdfdsfdf4s4d5fdsf6sdf6sdf5"},
            {"id": 2, "source": 2, "target": 3, "type": "0", "_id": "sdfdsfdf4s4d5f6sdf6sdf5"},
          ]
        }

        console.log("tasks", formattedTasks, links);
				gantt.clearAll()
        gantt.parse({ data: formattedTasks, links })
        // gantt.parse({data, links: links})
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
				console.log("fetch project data :", data)
       	setProject(data.project)
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchProject()
		// gantt.config.buttons_left = false;
  	// gantt.config.buttons_right = false;
		// gantt.config.drag_create = false;
		// gantt.config.drag_resize = false;
  }, [])

  const deleteProject = async () => {
    try {
			const res = await fetch('http://localhost:8080/project/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: projectId })
			})

			// const resData = await res.json()

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

export default GanttPage