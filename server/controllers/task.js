import Task from "../models/task.js"
import { deleteLinksByTaskId } from "./link.js"

export const createTask = async (req, res) => {
	const { id, project_id, text, start_date, duration, progress } = req.body
	try {
		const newTask = new Task({
      id,
			project_id,
			text,
			start_date,
			duration,
      progress
		})

		const savedTask = await newTask.save()
		return res.status(201).json({
			message: "Task created successfully",
			newTask: savedTask
		})

	} catch (error) {
		return res.status(400).json({
			error: error.message
		})
	}
}


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()

    return res.status(200).json({
      message: 'Success',
      tasks
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.body
    const projectTasks = await Task.find({ project_id: projectId })

    return res.status(200).json({
      message: 'Success',
      projectTasks
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const updateTask = async (req, res) => {
  const { id, text, start_date, duration, progress } = req.body
  
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id },
      { text, start_date, duration, progress },
      { new: true } // updated task will be returned
    )
    if (!updatedTask) {
      return res.status(404).json({
        error: 'Task not found'
      })
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      updatedTask
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const deleteTask = async (req, res) => {
  const { id } = req.body
  try {
    const deletedTask = await Task.findOneAndDelete({ id })

    if(!deletedTask){
      return res.status(404).json({
        error: 'Task not found',
      })
    }
    return res.status(200).json({
      message: 'Task deleted successfully',
      deletedTask,
    }) 
  } catch(error) {
    return res.status(400).json({
      error: error
    })
  }
}


export const deleteTasksByProjectId = async (projectId) => {
  try {
    const tasksToDelete = await Task.find({project_id: projectId})
    await Task.deleteMany({ project_id: projectId })
    for (const task of tasksToDelete) {
      await deleteLinksByTaskId(task._id);
    }
  } catch (error) {
    throw new Error("Failed to delete tasks.");
  }
}

