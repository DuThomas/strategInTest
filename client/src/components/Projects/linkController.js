export const createLink = async (link, projectId) => {
    try {
        const formattedLink = {
            ...link,
            project_id: projectId,
        }
        console.log("format", formattedLink)
        const res = await fetch('http://localhost:8080/link/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedLink)
        })

        const resData = await res.json()
        console.log(resData)
    } catch (error) {
        throw new Error(error)
    }
}

export const updateLink = async (item) => {
    try {
        const link = {
            _id: item._id,
            source: item.source,
            target: item.target,
            type: item.type
        }
        const res = await fetch('http://localhost:8080/link/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(link)
        })
        const resData = await res.json()
        console.log("resData:", resData)
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteLink = async (_id) => {
    try {
        const res = await fetch('http://localhost:8080/link/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })

        const resData = await res.json()
    } catch (error) {
        throw new Error(error)
    }
}