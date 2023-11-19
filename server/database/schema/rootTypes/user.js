const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
} = require("graphql");
const { UserType } = require("../types");
const {
  getUserById,
  createUser,
  editUser,
  removeUser,
  userlogin,
} = require("../../controllers/userController");

const user = {
  type: new GraphQLObjectType({
    name: "UserResult",
    fields: () => ({
      user: { type: UserType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  async resolve(_, args, context) {
    return await getUserById(context);
  },
};

const login = {
  type: new GraphQLObjectType({
    name: "LoginResult",
    fields: () => ({
      token: { type: GraphQLString },
      expiresIn: { type: GraphQLString },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve(_, args) {
    return await userlogin(args);
  },
};

const addUser = {
  type: new GraphQLObjectType({
    name: "AddUserResult",
    fields: () => ({
      user: { type: UserType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
  },
  async resolve(_, args, context) {
    return await createUser(args, context);
  },
};

const updateUser = {
  type: new GraphQLObjectType({
    name: "UpdateUserResult",
    fields: () => ({
      user: { type: UserType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(_, args, context) {
    return await editUser(args, context);
  },
};

const deleteUser = {
  type: new GraphQLObjectType({
    name: "DeleteUserResult",
    fields: () => ({
      user: { type: UserType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  async resolve(_, args, context) {
    return await removeUser(context);
  },
};


module.exports = {
  user,
  addUser,
  updateUser,
  deleteUser,
  login,
};
