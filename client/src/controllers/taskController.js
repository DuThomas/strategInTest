export const createTask = async (item, projectId) => {
    try {
        const task = {
            id: item.id,
            project_id: projectId,
            text: item.text,
            start_date: item.start_date,
            duration: item.duration,
            parent: item.parent,
            progress: item.progress
        }
        await fetch('http://localhost:8080/task/create', {
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
        await fetch('http://localhost:8080/task/update', {
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
        await fetch('http://localhost:8080/task/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    } catch (error) {
        throw new Error(error)
    }
}