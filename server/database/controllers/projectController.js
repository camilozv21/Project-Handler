const Project = require("../models/Project");
const User = require("../models/User");
const { removeManyTasks } = require("./taskController");
const { validateUser } = require("../../middleware/auth");

const getProjectById = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let project = await Project.findById(args.projectId);

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

const getProjects = async (context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let projects = await Project.find({ userId: validatedUser.userId });

    if (projects) {
      return {
        projects: projects,
        statusCode: 200,
      };
    } else
      return {
        message: "No se encontraron proyectos",
        statusCode: 404,
      };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const createProject = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    const user = await User.findById(validatedUser.userId);

    if (!user) {
      return {
        message: `No se encontro el usuario con el id: ${args.userId}`,
        statusCode: 400,
      };
    }

    let imageName = `project_${Date.now()}`;

    if (context.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ 
          folder: 'uploads', 
          public_id: imageName,
          overwrite: true,
        }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });

        const readableStream = new Readable();
        readableStream.push(context.file.buffer);
        readableStream.push(null);
        
        readableStream.pipe(stream);
      });


      console.log(uploadResult);

      if (!uploadResult.secure_url) {
        console.error(
          "Hubo un problema al subir la imagen a Cloudinary. " +
            uploadResult.error
        );
      }

      imageName = uploadResult.secure_url;
    }

    let project = new Project({
      name: args.name,
      image: imageName,
      userId: user._id,
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

const editProject = async (args, context) => {
  try {

    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;
    
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

const removeProject = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;
    
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
