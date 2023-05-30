export const createTask = async (item, projectId) => {
    try {
        const task = {
            id: item.id,
            project_id: projectId,
            text: item.text,
            start_date: item.start_date,
            duration: item.duration,
            progress: item.progress
        }
        const res = await fetch('http://localhost:8080/task/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateTask = async (item) => {
    try {
        const task = {
            id: item.id,
            text: item.text,
            start_date: item.start_date,
            duration: item.duration,
            progress: item.progress
        }
        const res = await fetch('http://localhost:8080/task/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteTask = async (id) => {
    try {
        const res = await fetch('http://localhost:8080/task/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })

        const resData = await res.json()
    } catch (error) {
        throw new Error(error)
    }
}