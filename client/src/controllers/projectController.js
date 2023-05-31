import { gantt } from "dhtmlx-gantt"
import moment from "moment"

export const fetchProjectTasks = async (projectId) => {
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

export const fetchProject = async (projectId) => {
    try {
        const res = await fetch('http://localhost:8080/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: projectId })
        })
        const data = await res.json()
        return data.project
    } catch (error) {
        throw new Error(error)
    }
}