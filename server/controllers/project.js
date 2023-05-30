import Project from "../models/project.js"
import { deleteTasksByProjectId } from "./task.js"


export const createProject = async (req, res) => {
	const { title } = req.body
	try {
		const newProject = new Project({ title })

		const savedProject = await newProject.save()
		return res.status(201).json({
			message: "Project created successfully",
			newProject: savedProject
		})

	} catch (error) {
		return res.status(400).json({
			error: error.message
		})
	}
}


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()

    return res.status(200).json({
      message: 'Success',
      projects
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export const getProject = async (req, res) => {
  try {
    const { _id } = req.body
    const project = await Project.findOne({ _id })

    return res.status(200).json({
      message: 'Success',
      project
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const updateProject = async (req, res) => {
  const { _id, title } = req.body
  
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id },
      { title },
      { new: true } // updated project will be returned
    )
    if (!updatedProject) {
      return res.status(404).json({
        error: 'Project not found'
      })
    }

    return res.status(200).json({
      message: 'Project updated successfully',
      updatedProject
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const deleteProject = async (req, res) => {
  const { _id } = req.body
  try {
    await deleteTasksByProjectId(_id)
    const deletedProject = await Project.findOneAndDelete({ _id })
    if(!deletedProject){
      return res.status(404).json({
        error: 'Project not found',
      })
    }
    return res.status(200).json({
      message: 'Project deleted successfully',
      deletedProject,
    }) 
  } catch(error) {
    return res.status(400).json({
      error: error
    })
  }
}