import React, { useEffect, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment'

import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import "./gantt.css"

const GanttPage = () => {
  useEffect(() => {
    // Initialisation de la vue Gantt
    const ganttContainer = document.getElementById('gantt-container');
    gantt.init(ganttContainer);

    // Exemple de données de tâches
    // const tasks = [
    //   { id: "64746a37a86d39a08005d089", text: 'Tâche 11', start_date: '01-01-2023', duration: 2 },
    //   { id: "dfdf", text: 'Tâche 22', start_date: '03-01-2023', duration: 2 },
    //   { id: 3, text: 'Tâche 32', start_date: '04-01-2023', duration: 2 }
    //   // ... Ajoutez d'autres tâches ici
    // ];

    // Événement pour capturer les actions
    gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
      console.log('Tâche mise à jour:', item);
      
      const task = {
        _id: item._id,
        project_id: item.project_id,
        text: item.text,
        start_date: item.start_date,
        duration: item.duration
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

    gantt.attachEvent('onAfterTaskAdd', (id, item) => {
      console.log('Nouvelle tâche ajoutée:', item);
      const task = {
        project_id: 1,
        text: item.text,
        start_date: item.start_date,
        duration: item.duration
      }

      console.log(task);
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
          console.log(resData);
        } catch (error) {
          throw new Error(error)
        }
      }

      addTask()
    });

    gantt.attachEvent('onAfterTaskDelete', (id, item) => {
      console.log('Tâche supprimée:', item, item.start_date, item.text, item.duration);
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
          console.log(resData);
        } catch (error) {
          throw new Error(error)
        }
      }

      deleteTask(item._id)
    });

    const fetchTasks = async () => {
			try {
				const res = await fetch('http://localhost:8080/task/tasks', {
          headers: {
            'Content-Type': 'application/json'
          },
				})
				const data = await res.json()

        const formattedTasks = data.tasks.map(task => ({
          ...task,
          start_date: moment(task.start_date).format('DD-MM-YYYY'),
        }));

        gantt.parse({ data: formattedTasks });
			} catch (error) {
				throw new Error(error)
			}
		}
		fetchTasks()
  }, []);

  return (
    <div>
      <h1>Projet 0</h1>
      <div id="gantt-container" style={{ width: '100%', height: '500px' }} />;
    </div>
    )
};

export default GanttPage;