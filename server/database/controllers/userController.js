const User = require("../models/User");
const { removeManyProjects } = require("./projectController");
const bcrypt = require("bcrypt");
const { createToken, validateUser } = require("../../middleware/auth");

const getUserById = async (context) => {
  try {
    
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let user = await User.findById(validatedUser.userId);

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

const editUser = async (args, context) => {
  try {
    let validatedUser = validateUser(context.user);
    if (validatedUser.statusCode !== 200) return validatedUser;

    let user = await User.findByIdAndUpdate(
      validatedUser.userId,
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

const removeUser = async (context) => {
  try {
    let validatedUser = validateUser(context.user);

    if (validatedUser.statusCode !== 200) return validatedUser;

    let user = await User.findById(validatedUser.userId);

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

    if (user && bcrypt.compareSync(password, user.password)) {
      var jwtResponse = await createToken(user);
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
  getUserById,
  createUser,
  editUser,
  removeUser,
  userlogin,
};