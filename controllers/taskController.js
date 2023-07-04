import createError from "../utils/Error.js";
import Tasks from "../models/Tasks.js";

// create tasks controller
export const createTaskController = async (req, res, next) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title) {
      return next(createError(400, "Title is required"));
    }
    if (!description) {
      return next(createError(400, "Description is required"));
    }
    if (!dueDate) {
      return next(createError(400, "Due Date is required"));
    }
    if (!status) {
      return next(createError(400, "Status is required"));
    }

    const existingTask = await Tasks.findOne({ title: title });
    if (existingTask) {
      return next(createError(400, "This task already exists"));
    }

    console.log(req.user);

    const newTask = await new Tasks({
      userId: req.user,
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
    });
    await newTask.save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      task: newTask,
    });
  } catch (error) {
    return next(createError(500, "Error while creating task"));
  }
};

// update task controller
export const updateTaskController = async (req, res, next) => {
  try {
    const updateTask = await Tasks.findByIdAndUpdate(
      { _id: req.params.taskId },
      { ...req.body }
    );
    const task = await Tasks.findOne({ _id: updateTask._id });
    res.status(200).send({
      success: true,
      message: "updating task",
      task: task,
    });
  } catch (error) {
    return next(createError(500, "Error while updating single tasks"));
  }
};

// delete tasks controller
export const deleteTaskController = async (req, res, next) => {
  try {
    await Tasks.findByIdAndDelete({ _id: req.params.taskId });
    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return next(createError(500, "Error while deleting tasks"));
  }
};

// filter controller
export const filterTaskController = async (req, res, next) => {
  try {
    const { status } = req.query;
    const tasks = await Tasks.find({ userId: req.user._id });
    const filteredTasks = tasks.filter((task) => task.status === status);
    res.status(200).send({
      success: true,
      message: "filtered task successfully",
      task: filteredTasks,
    });
  } catch (error) {
    return next(createError(500, "Error while getting single tasks"));
  }
};

// filter controller
export const searchTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const tasks = await Tasks.find({ userId: req.user._id });
    const searchTasks = tasks.filter((task) =>
      title ? task.title === title : task.description === description
    );
    console.log(tasks);
    res.status(200).send({
      success: true,
      message: "search task successfully based on title or description",
      task: searchTasks,
    });
  } catch (error) {
    return next(createError(500, "Error while getting single tasks"));
  }
};

// get single tasks controller
export const getSingleTaskController = async (req, res, next) => {
  try {
    const getSingleTask = await Tasks.findById({ _id: req.params.taskId });
    res.status(200).send({
      success: true,
      message: "getting single task",
      task: getSingleTask,
    });
  } catch (error) {
    return next(createError(500, "Error while getting single tasks"));
  }
};

// get all tasks controller
export const getAllTaskController = async (req, res, next) => {
  try {
    const getTasks = await Tasks.find({ userId: req.user._id });
    res.status(200).send({
      success: true,
      message: "getting all tasks",
      tasks: getTasks,
    });
  } catch (error) {
    return next(createError(500, "Error while getting all tasks"));
  }
};
