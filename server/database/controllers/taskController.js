const Task = require("../models/Task");

const getTaskById = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let task = await Task.findById(args.id);

    if (task) {
      return {
        task: task,
        statusCode: 200,
      };
    } else
      return {
        message: "proyecto no encontrado",
        statusCode: 404,
      };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const createTask = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    const project = await Project.findById(args.projectId);

    if (!project) {
      return {
        message: `No se encontro el proyecto con el id: ${args.projectId}`,
        statusCode: 400,
      };
    }

    const user = await User.findById(validatedUser.userId);

    if (!user) {
      return {
        message: `No se encontro el usuario con el id: ${args.projectId}`,
        statusCode: 400,
      };
    }

    let task = new Task({
      name: args.name,
      image: args.image,
      userId: user._id,
    });

    const newTask = await task.save();
    project.tasks.push(newTask.id);
    await project.save();

    return {
      task: newTask,
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const editTask = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let task = await Task.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          project: args.project,
          status: args.status,
          description: args.description,
          deadLine: args.deadLine,
        },
      },
      { new: true }
    );

    if (task) {
      return {
        task: task,
        statusCode: 200,
      };
    } else {
      return {
        message: `El proyecto con el id ${args.id} no existe`,
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const removeTask = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let task = await Task.findById(args.id);

    if (!task) {
      return {
        message: `La tarea con el id ${args.id} no existe`,
        statusCode: 400,
      };
    }

    return {
      task: await Task.findByIdAndDelete(args.id),
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const removeManyTasks = async (projectIds) => {
  try {
    await Task.deleteMany({ projectId: { $in: projectIds } });
  } catch (error) {
    throw new Error({
      message: "Error al eliminar las tareas",
      error: error,
    });
  }
};

module.exports = { getTaskById, createTask, editTask, removeTask, removeManyTasks };
