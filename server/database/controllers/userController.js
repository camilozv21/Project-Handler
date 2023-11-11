const User = require("../models/User");
const { removeManyProjects } = require("./projectController");
const bcrypt = require("bcrypt");
const { createToken } = require("../../middleware/auth");

const getUserById = async (args) => {
  try {
    let user = await User.findById(args.id);

    if (user) {
      return {
        user: user,
        statusCode: 200,
      };
    } else
      return {
        message: "usuario no encontrado",
        statusCode: 404,
      };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const getUsers = async () => {
  try {
    return {
      users: await User.find(),
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const createUser = async (args) => {
  try {
    let user = new User({
      name: args.name,
      lastname: args.lastname,
      email: args.email,
      password: await bcrypt.hash(args.password, 10),
      image: args.image,
    });

    return {
      user: await user.save(),
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      return {
        message: "El correo electrónico ya está registrado.",
        statusCode: 400,
      };
    }

    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const editUser = async (args) => {
  try {
    let user = await User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          lastname: args.lastname,
          image: args.image,
        },
      },
      { new: true }
    );

    if (user) {
      return {
        user: user,
        statusCode: 200,
      };
    } else {
      return {
        message: `No se encontro el usuario`,
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

const removeUser = async (args) => {
  try {
    let userId = args.id;
    let user = await User.findById(userId);

    if (!user) {
      return {
        message: `No se encontro el usuario`,
        statusCode: 400,
      };
    }

    await removeManyProjects(user.projectId);

    return {
      user: await User.findByIdAndDelete(userId),
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};

const changePassword = async (args) => {
  try {
    let user = await User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          password: await bcrypt.hash(args.password, 10),
        },
      },
      { new: true }
    );

    if (user) {
      return {
        user: user,
        statusCode: 200,
      };
    } else {
      return {
        message: `No se encontro el usuario`,
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

const userlogin = async (args) => {
  try {
    const { email, password } = args;

    var user = await User.findOne({ email: email });
    var jwtResponse = await createToken(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: 200,
        token: jwtResponse.token,
        exiresIn: jwtResponse.exp,
      };
    } else {
      return {
        message: `Correo o contraseña incorrectos`,
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  removeUser,
  userlogin,
};
