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
  getUsers,
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
  args: { id: { type: GraphQLID } },
  async resolve(parent, args) {
    return await getUserById(args);
  },
};

const login = {
  type: new GraphQLObjectType({
    name: "LoginResult",
    fields: () => ({
      token: { type: GraphQLString },
      exiresIn: { type: GraphQLInt },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve(parent, args) {
    return await userlogin(args);
  },
};

const users = {
  type: new GraphQLObjectType({
    name: "UsersResult",
    fields: () => ({
      users: { type: new GraphQLList(UserType) },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  async resolve(parent, args) {
    return await getUsers();
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
  async resolve(parent, args) {
    return await createUser(args);
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
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, args) {
    return await editUser(args);
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
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args) {
    return await removeUser(args);
  },
};


module.exports = {
  user,
  users,
  addUser,
  updateUser,
  deleteUser,
  login,
};
