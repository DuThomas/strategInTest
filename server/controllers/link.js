import Link from "../models/link.js"

export const createLink = async (req, res) => {
	const { project_id, source, target, type } = req.body
	try {
		const newLink = new Link({
			project_id,
			source,
			target,
			type,
		})

		const savedLink = await newLink.save()
		return res.status(201).json({
			message: "Link created successfully",
			newLink: savedLink
		})

	} catch (error) {
		return res.status(400).json({
			error: error.message
		})
	}
}


export const getProjectLinks = async (req, res) => {
  try {
    const { projectId } = req.body
    const projectLinks = await Link.find({ project_id: projectId })

    return res.status(200).json({
      message: 'Success',
      projectLinks
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const updateLink = async (req, res) => {
  const { _id, source, target, type } = req.body
  
  try {
    const updatedLink = await Link.findOneAndUpdate(
      { _id },
      { source, target, type },
      { new: true } // updated link will be returned
    )
    if (!updatedLink) {
      return res.status(404).json({
        error: 'Link not found'
      })
    }

    return res.status(200).json({
      message: 'Link updated successfully',
      updatedLink
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const deleteLink = async (req, res) => {
  const { _id } = req.body
  try {
    const deletedLink = await Link.findOneAndDelete({ _id })

    if(!deletedLink){
      return res.status(404).json({
        error: 'Link not found',
      })
    }
    return res.status(200).json({
      message: 'Link deleted successfully',
      deletedLink,
    }) 
  } catch(error) {
    return res.status(400).json({
      error: error
    })
  }
}


export const deleteLinksByTaskId = async (taskId) => {
    try {
      const deletedTaskLinks = await Link.deleteMany({ $or: [{ sourceTask: taskId }, { targetTask: taskId }] })
    } catch (error) {
        throw new Error("Failed to delete linkks.");
    }
  };