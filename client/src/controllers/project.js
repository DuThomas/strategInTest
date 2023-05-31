export const deleteProject = async (_id) => {
    try {
        await fetch('http://localhost:8080/project/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })
        window.location = "http://localhost:3000/projects"
    } catch (error) {
        throw new Error(error)
    }
}