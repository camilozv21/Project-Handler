const Project = require("../models/Project");
const User = require("../models/User");
const { removeManyTasks } = require("./taskController");

const getProjectById = async (args) => {
  try {
    let project = await Project.findById(args.id);

    if (project) {
      return {
        project: project,
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

const getProjects = async (args) => {
  try {
    let projects = {};
    if (args.userId) {
      projects = await Project.find({ userId: args.userId });
    } else {
      projects = await Project.find({});
    }

    if (projects) {
      return {
        projects: projects,
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

const createProject = async (args) => {
  try {
    const user = await User.findById(args.userId);

    if (!user) {
      return {
        message: `No se encontro el usuario con el id: ${args.userId}`,
        statusCode: 400,
      };
    }

    let project = new Project({
      name: args.name,
      image: args.image,
      userId: args.userId,
    });

    const newProject = await project.save();
    user.projectId.push(newProject.id);
    await user.save();

    return {
      project: newProject,
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const editProject = async (args) => {
  try {
    let project = await Project.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          image: args.image,
        },
      },
      { new: true }
    );

    if (project) {
      return {
        project: project,
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

const removeProject = async (args) => {
  try {
    let project = await Project.findById(args.id);

    if (!project) {
      return {
        message: `El proyecto con el id ${args.id} no existe`,
        statusCode: 400,
      };
    }

    await removeManyTasks([args.id]);

    return {
      project: await Project.findByIdAndDelete(args.id),
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const removeManyProjects = async (ids) => {
  try {
    await removeManyTasks(ids);
    await Project.deleteMany({ _id: { $in: ids } });
  } catch (error) {
    throw new Error({
      message: "Error al eliminar las tareas",
      error: error,
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  editProject,
  removeProject,
  removeManyProjects,
};
