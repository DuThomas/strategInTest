import React, { useEffect, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import moment from 'moment'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import "./project.css"
import { Link, useParams } from 'react-router-dom'
import Protected from '../Protected'

const GanttPage = () => {
	const [project, setProject] = useState([])
	const { projectId } = useParams()

  useEffect(() => {
    // Initialisation de la vue Gantt
    const ganttContainer = document.getElementById('gantt-container')
    gantt.init(ganttContainer)

    // Événement pour capturer les actions

    gantt.attachEvent('onAfterTaskAdd', (id, item) => {
      console.log('Nouvelle tâche ajoutée:', item)
      const task = {
        project_id: projectId,
        text: item.text,
        start_date: item.start_date,
        duration: item.duration,
        progress: item.progress
      }

      console.log(task)
      const addTask = async () => {
        try {
          const res = await fetch('http://localhost:8080/task/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
          })
    
          const resData = await res.json()
          console.log(resData)
        } catch (error) {
          throw new Error(error)
        }
      }

      addTask()
    })

    gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
      console.log('Tâche mise à jour:', item)
      
      const task = {
        _id: item._id,
        project_id: item.project_id,
        text: item.text,
        start_date: item.start_date,
        duration: item.duration,
        progress: item.progress
      }

      const updateTask = async () => {
        try {
          const res = await fetch('http://localhost:8080/task/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
          })
          const resData = await res.json()
          console.log("resData:", resData)
        } catch (error) {
          throw new Error(error)
        }
      }

      updateTask()
    })

    gantt.attachEvent('onAfterTaskDelete', (id, item) => {
      console.log('Tâche supprimée:', item, item.start_date, item.text, item.duration)
      const deleteTask = async (_id) => {
        try {
          const res = await fetch('http://localhost:8080/task/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
          })
    
          const resData = await res.json()
          console.log(resData)
        } catch (error) {
          throw new Error(error)
        }
      }

      deleteTask(item._id)
    })

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      console.log('Nouveau lien créé :', link);
    })

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      console.log('Lien mis à jour :', link);
    })

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      console.log('Nouveau lien suprimé :', link);
    })

    const fetchProjectTasks = async () => {
			try {
				const res = await fetch('http://localhost:8080/task/projectTasks', {
					method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
					body: JSON.stringify({ projectId })
				})
				const data = await res.json()
				console.log("fetch data :", data)

        const formattedTasks = data.projectTasks.map(task => ({
          ...task,
          start_date: moment(task.start_date).format('DD-MM-YYYY'),
        }))

        const links = [{'source': '1685455698438', 'target': '1685455698439', 'type': '0', 'id': 1685455698443}]
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
		} catch (error) {
			throw new Error(error)
		}

    window.location = "http://localhost:3000/projects"
  }

  return (
    <Protected>
      <div className='project_view'>
        <h1>{project.title}</h1>
        <div id="gantt-container" style={{ width: '100%', height: '500px' }} />
        <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center' , gap: '10px'}}>
          <Link to={`/updateProject/${project._id}`} className="blue_btn">Renommer le projet</Link>
          <button className='red_btn' onClick={deleteProject}>Supprimer le projet</button>
        </div>
      </div>
    </Protected>
    )
}

export default GanttPage