import Task from "../models/Tasks.js";
import createError from "../utils/Error.js";

export const createTask = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, description, status } = req.body;
    const task = await new Task({
      userId: userId,
      title,
      description,
      status,
    });
    await task.save();
    res.status(201).send({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    return next(createError(error.status, error.message));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await Task.findByIdAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Task update Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deteteTask = async (req, res, next) => {
  try {
    const _id = req.params._id;
    await Task.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return next(createError(error.status, error.message));
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });

    res.status(200).send({
      success: true,
      message: "Task get successfully",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const admin = await Task.findOne({ userName: req.params.userName });
    if (!admin || !admin.isAdmin)
      return next(createError(401, "Unauthorized access denied"));

    const allUsersTasks = await Task.find();
    const data = allUsersTasks.filter(
      (user) => user.userName !== req.params.userName
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
