export const createLink = async (link, projectId) => {
    try {
        const formattedLink = {
            ...link,
            project_id: projectId,
        }
        await fetch('http://localhost:8080/link/', {
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
        await fetch('http://localhost:8080/link/', {
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
        await fetch('http://localhost:8080/link/', {
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