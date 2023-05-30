export const createLink = async (link, projectId) => {
    try {
        const formattedLink = {
            ...link,
            project_id: projectId,
        }
        const res = await fetch('http://localhost:8080/link/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedLink)
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateLink = async (link) => {
    try {
        const res = await fetch('http://localhost:8080/link/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(link)
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteLink = async (id) => {
    try {
        const res = await fetch('http://localhost:8080/link/delete', {
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